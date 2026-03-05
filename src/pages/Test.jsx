import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Send, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  LayoutGrid
} from 'lucide-react';
import { useTest } from '../context/TestContext';
import { QUESTIONS } from '../data/questions';

const Test = () => {
  const { selectedSubjects, setTestResults } = useTest();
  const navigate = useNavigate();

  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { subjectId: { questionId: selectedOptionIndex } }
  const [timeLeft, setTimeLeft] = useState(9000); // 2 hours 30 minutes in seconds (150 minutes * 60)
  const [shuffledQuestions, setShuffledQuestions] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  // If no subjects selected, redirect to subjects page
  useEffect(() => {
    if (selectedSubjects.length === 0) {
      navigate('/subjects');
    }
  }, [selectedSubjects, navigate]);

  // Shuffle questions on mount
  useEffect(() => {
    if (selectedSubjects.length > 0 && !isInitialized) {
      const shuffled = {};
      selectedSubjects.forEach(subject => {
        const questions = [...(QUESTIONS[subject.id] || [])];
        for (let i = questions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        shuffled[subject.id] = questions;
      });
      setShuffledQuestions(shuffled);
      setIsInitialized(true);
    }
  }, [selectedSubjects, isInitialized]);

  const currentSubject = selectedSubjects[activeSubjectIndex];
  const subjectQuestions = currentSubject ? shuffledQuestions[currentSubject.id] || [] : [];
  const currentQuestion = subjectQuestions[activeQuestionIndex];

  // Timer logic
  useEffect(() => {
    const checkTimer = () => {
      if (timeLeft <= 0) {
        handleSubmit(true); // Auto-submit when time runs out
        return;
      }
    };
    
    checkTimer(); // Check immediately on mount
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // Empty dependency array - only run once on mount

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours.toString()}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentSubject.id]: {
        ...(prev[currentSubject.id] || {}),
        [currentQuestion.id]: optionIndex
      }
    }));
  };

  const handleNext = () => {
    if (activeQuestionIndex < subjectQuestions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    } else if (activeSubjectIndex < selectedSubjects.length - 1) {
      setActiveSubjectIndex(prev => prev + 1);
      setActiveQuestionIndex(0);
    }
  };

  const handlePrev = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(prev => prev - 1);
    } else if (activeSubjectIndex > 0) {
      setActiveSubjectIndex(prev => prev - 1);
      const prevSubjectQuestions = shuffledQuestions[selectedSubjects[activeSubjectIndex - 1].id] || [];
      setActiveQuestionIndex(prevSubjectQuestions.length - 1);
    }
  };

  const handleSubmit = useCallback((isAutoSubmit = false) => {
    if (!isAutoSubmit) {
      const skippedBySubject = [];
      selectedSubjects.forEach(subject => {
        const questions = shuffledQuestions[subject.id] || [];
        const answeredCount = Object.keys(userAnswers[subject.id] || {}).length;
        if (answeredCount < questions.length) {
          skippedBySubject.push({ name: subject.name, count: questions.length - answeredCount });
        }
      });

      if (skippedBySubject.length > 0) {
        const message = skippedBySubject.map(s => `${s.name}: ${s.count} skipped`).join('\n');
        if (!window.confirm(`Incomplete test:\n\n${message}\n\nSubmit anyway?`)) return;
      } else {
        if (!window.confirm("Ready to submit your test?")) return;
      }
    }

    let score = 0, totalQuestions = 0, incorrectAnswers = 0, attempted = 0;
    const subjectStats = [], failedQuestions = [];

    selectedSubjects.forEach(subject => {
      const questions = shuffledQuestions[subject.id] || [];
      totalQuestions += questions.length;
      let subjectScore = 0;
      
      questions.forEach(q => {
        const userAnswer = userAnswers[subject.id]?.[q.id];
        if (userAnswer !== undefined) {
          attempted++;
          if (userAnswer === q.correctAnswer) {
            subjectScore++; score++;
          } else {
            incorrectAnswers++;
            failedQuestions.push({ 
              subjectName: subject.name, 
              question: q.question, 
              image: q.image,
              userAnswer: q.options[userAnswer], 
              correctAnswer: q.options[q.correctAnswer] 
            });
          }
        } else {
          incorrectAnswers++;
          failedQuestions.push({ 
            subjectName: subject.name, 
            question: q.question, 
            image: q.image,
            userAnswer: "Not Attempted", 
            correctAnswer: q.options[q.correctAnswer] 
          });
        }
      });

      subjectStats.push({ id: subject.id, name: subject.name, score: subjectScore, total: questions.length, percentage: Math.round((subjectScore / questions.length) * 100) });
    });

    if (isAutoSubmit) {
      alert("Time's up! Your test is being submitted automatically.");
    }
    
    setTestResults({ score, totalQuestions, incorrectAnswers, attempted, percentage: Math.round((score / totalQuestions) * 100), subjectStats, failedQuestions });
    navigate('/results');
  }, [selectedSubjects, userAnswers, setTestResults, navigate, shuffledQuestions]);

  if (!isInitialized || !currentSubject) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-16 h-16 border-4 border-brand-mint/20 border-t-brand-mint rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Test Header */}
      <header className="glass-effect border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-20 items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="bg-brand-black w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-2xl shadow-lg shadow-brand-mint/10 shrink-0">
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-brand-mint" />
              </div>
              <div className="hidden xs:flex flex-col justify-center">
                <h2 className="text-[10px] sm:text-lg font-black text-brand-black leading-none uppercase tracking-tight">Live Practice</h2>
                <p className="text-[6px] sm:text-[10px] font-bold text-brand-mint uppercase tracking-widest mt-0.5 sm:mt-1">CBT Simulation</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-8">
              <div className={`flex items-center space-x-1.5 sm:space-x-3 px-2.5 sm:px-5 py-1 sm:py-2.5 rounded-lg sm:rounded-2xl font-black text-xs sm:text-xl border-2 transition-all ${timeLeft < 300 ? 'border-red-500 text-red-600 bg-red-50 animate-pulse' : timeLeft < 600 ? 'border-orange-400 text-orange-600 bg-orange-50' : 'border-slate-100 text-brand-black bg-white shadow-sm'}`}>
                <Clock className="w-3 h-3 sm:w-5 sm:h-5 text-brand-deep" />
                <span className="tabular-nums tracking-tighter">{formatTime(timeLeft)}</span>
              </div>
              
              <button
                onClick={() => handleSubmit()}
                className="bg-[#000000] hover:bg-brand-mint text-white px-3 sm:px-8 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl font-black text-[10px] sm:text-sm transition-all shadow-xl shadow-brand-mint/10 flex items-center space-x-1.5 sm:space-x-2 shrink-0 group active:scale-95"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span className="hidden xs:inline uppercase tracking-wider">Finish Exam</span>
                <span className="xs:hidden">Finish</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col lg:flex-row gap-6 sm:gap-10">
        {/* Mobile Subject Switcher */}
        <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4 flex space-x-3 no-scrollbar">
          {selectedSubjects.map((subject, index) => {
            const isSelected = activeSubjectIndex === index;
            return (
              <button
                key={subject.id}
                onClick={() => { setActiveSubjectIndex(index); setActiveQuestionIndex(0); }}
                className={`whitespace-nowrap px-4 py-2 rounded-xl font-black text-xs border-2 transition-all uppercase tracking-wider ${isSelected ? 'bg-brand-black border-brand-black text-brand-mint shadow-lg shadow-brand-mint/10' : 'bg-white border-slate-100 text-slate-500'}`}
              >
                {subject.name}
              </button>
            );
          })}
        </div>

        {/* Sidebar - Hidden on Mobile, shown on Tablet/Desktop */}
        <aside className="hidden lg:block lg:w-72 flex-shrink-0">
          <div className="premium-card p-6 sticky top-28 bg-white shadow-premium border border-slate-100 rounded-3xl">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-1">Exam Progress</h3>
            <div className="space-y-3">
              {selectedSubjects.map((subject, index) => {
                const isSelected = activeSubjectIndex === index;
                const answered = Object.keys(userAnswers[subject.id] || {}).length;
                const total = shuffledQuestions[subject.id]?.length || 0;
                
                return (
                  <button
                    key={subject.id}
                    onClick={() => { setActiveSubjectIndex(index); setActiveQuestionIndex(0); }}
                    className={`w-full text-left p-4 rounded-2xl transition-all border-2 flex items-center justify-between group ${isSelected ? 'bg-brand-black border-brand-black text-brand-mint shadow-xl shadow-brand-mint/10' : 'bg-white border-slate-50 hover:border-brand-mint/30 text-slate-600 shadow-sm'}`}
                  >
                    <div className="min-w-0">
                      <p className={`text-sm font-black truncate uppercase tracking-tight ${isSelected ? 'text-brand-mint' : 'text-brand-black'}`}>{subject.name}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isSelected ? 'text-white/60' : 'text-slate-400'}`}>
                        {answered}/{total} Answered
                      </p>
                    </div>
                    {isSelected && <div className="w-2 h-2 bg-brand-mint rounded-full shadow-[0_0_8px_rgba(29,205,159,0.8)]"></div>}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">
                <span>Overall Completion</span>
                <span className="text-brand-deep">
                  {Math.round((Object.keys(userAnswers).reduce((acc, subj) => acc + Object.keys(userAnswers[subj]).length, 0) / selectedSubjects.reduce((acc, s) => acc + (shuffledQuestions[s.id]?.length || 0), 0)) * 100)}%
                </span>
              </div>
              <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(Object.keys(userAnswers).reduce((acc, subj) => acc + Object.keys(userAnswers[subj]).length, 0) / selectedSubjects.reduce((acc, s) => acc + (shuffledQuestions[s.id]?.length || 0), 0)) * 100}%` }}
                  className="h-full bg-brand-mint rounded-full shadow-sm"
                ></motion.div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <main className="flex-grow flex flex-col min-w-0">
          <div className="premium-card p-6 sm:p-12 flex-grow flex flex-col min-h-[450px] sm:min-h-[500px] bg-white shadow-premium border border-slate-100 rounded-[2rem] sm:rounded-[3rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSubjectIndex}-${activeQuestionIndex}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-4">
                  <div>
                    <span className="px-3 sm:px-4 py-1.5 bg-brand-mint/5 text-brand-deep rounded-lg text-[10px] sm:text-xs font-black border border-brand-mint/10 uppercase tracking-widest">
                      Question {activeQuestionIndex + 1} of {subjectQuestions.length}
                    </span>
                    <h4 className="text-[10px] sm:text-sm font-bold text-slate-400 mt-2 ml-1 uppercase tracking-widest">{currentSubject.name}</h4>
                  </div>
                  <div className="flex gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
                    {subjectQuestions.map((_, i) => (
                      <div key={i} className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 shrink-0 ${i === activeQuestionIndex ? 'bg-brand-mint w-6 sm:w-8' : userAnswers[currentSubject.id]?.[subjectQuestions[i].id] !== undefined ? 'bg-brand-deep w-2 sm:w-3' : 'bg-slate-100 w-2 sm:w-3'}`}></div>
                    ))}
                  </div>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-brand-black mb-8 sm:mb-12 leading-[1.4] tracking-tight">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.image && (
                  <div className="mb-8 sm:mb-12 rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-slate-50">
                    <img 
                      src={currentQuestion.image} 
                      alt="Question Illustration" 
                      className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain mx-auto"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-8 sm:mb-12">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = userAnswers[currentSubject.id]?.[currentQuestion.id] === index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`group w-full text-left p-4 sm:p-6 rounded-2xl sm:rounded-[1.5rem] border-2 transition-all flex items-center ${isSelected ? 'border-[#000000] bg-[#000000] text-[#FFFFFF] shadow-xl shadow-brand-mint/10' : 'border-slate-100 bg-white hover:border-brand-mint/30 hover:bg-slate-50 shadow-sm'}`}
                      >
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-base sm:text-lg mr-4 sm:mr-5 transition-all shrink-0 ${isSelected ? 'bg-brand-mint text-[#000000] rotate-6' : 'bg-slate-100 text-slate-400 group-hover:bg-brand-mint/10 group-hover:text-brand-mint'}`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className={`font-bold text-base sm:text-lg ${isSelected ? 'text-[#FFFFFF]' : 'text-slate-600'}`}>{option}</span>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto shrink-0">
                            <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-brand-mint" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-auto pt-6 sm:pt-8 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={handlePrev}
                    disabled={activeSubjectIndex === 0 && activeQuestionIndex === 0}
                    className="flex items-center space-x-2 bg-brand-black text-white hover:bg-brand-mint font-black text-xs sm:text-sm disabled:opacity-30 px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl uppercase tracking-wider transition-all active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={activeSubjectIndex === selectedSubjects.length - 1 && activeQuestionIndex === subjectQuestions.length - 1}
                    className="btn-primary px-6 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-base uppercase tracking-wider"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Jump Grid */}
          <div className="mt-6 sm:mt-8 premium-card p-5 sm:p-6 bg-white shadow-premium border border-slate-100 rounded-3xl">
            <div className="flex items-center space-x-2 mb-4 px-1">
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
              <h4 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Quick Jump</h4>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {subjectQuestions.map((q, i) => (
                <button
                    key={q.id}
                    onClick={() => setActiveQuestionIndex(i)}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm transition-all border-2 flex items-center justify-center shadow-sm ${activeQuestionIndex === i ? 'bg-brand-black border-brand-black text-brand-mint shadow-lg shadow-brand-mint/10 -translate-y-1' : userAnswers[currentSubject.id]?.[q.id] !== undefined ? 'bg-brand-mint/10 border-brand-mint/20 text-brand-deep' : 'bg-white border-slate-100 text-slate-400 hover:border-brand-mint/30 hover:text-brand-mint'}`}
                  >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Test;
