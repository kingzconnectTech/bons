import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Award, 
  RefreshCcw, 
  Home, 
  CheckCircle, 
  XCircle, 
  BarChart,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useTest } from '../context/TestContext';
import Navbar from '../components/Navbar';

const Results = () => {
  const { testResults, selectedSubjects } = useTest();
  const navigate = useNavigate();

  useEffect(() => {
    if (!testResults) {
      navigate('/');
    }
  }, [testResults, navigate]);

  if (!testResults) return null;

  const { score, totalQuestions, maxTotalScore, incorrectAnswers, attempted, subjectStats, failedQuestions } = testResults;

  const sortedStats = [...subjectStats].sort((a, b) => b.score - a.score);
  const bestSubject = sortedStats[0];
  const poorSubject = sortedStats[sortedStats.length - 1];

  const percentage = Math.round((score / maxTotalScore) * 100);

  const getMessage = () => {
    if (percentage >= 70) return "Exceptional!";
    if (percentage >= 50) return "Well Done!";
    return "Keep Pushing!";
  };

  const getScoreColor = () => {
    if (percentage >= 70) return "text-brand-mint";
    if (percentage >= 50) return "text-brand-deep";
    return "text-brand-black";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl sm:rounded-[3rem] shadow-premium border border-slate-100 overflow-hidden"
        >
          {/* Top Hero Banner */}
          <div className={`py-12 sm:py-16 text-center text-white relative overflow-hidden ${percentage >= 50 ? 'bg-[#169976]' : 'bg-[#000000]'}`}>
            <div className="absolute inset-0 premium-gradient opacity-90"></div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 sm:w-80 sm:h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 sm:w-80 sm:h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="relative z-10 px-4 flex flex-col items-center justify-center"
            >
              <div className="inline-flex items-center justify-center p-4 sm:p-5 bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] border border-white/20 mb-6 sm:mb-8 shadow-2xl">
                <Award className="w-12 h-12 sm:w-16 sm:h-16 text-white shrink-0" />
              </div>
              <h1 className="text-4xl sm:text-7xl font-black mb-3 tracking-tighter italic uppercase drop-shadow-lg">{getMessage()}</h1>
              <div className="flex items-center justify-center space-x-2 text-white/90 font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-sm">
                <div className="flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-mint" />
                </div>
                <span className="drop-shadow-sm">Performance Analysis Complete</span>
                <div className="flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-mint" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="p-6 sm:p-16">
            {/* High Impact Score Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <div className="lg:col-span-2 bg-slate-50/50 rounded-2xl sm:rounded-[2.5rem] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between border border-slate-100 shadow-sm">
                <div className="text-center sm:text-left mb-6 sm:mb-0">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3 sm:mb-4">Total Proficiency</p>
                  <div className={`text-6xl sm:text-8xl font-black tracking-tighter ${getScoreColor()}`}>
                    {percentage}<span className="text-3xl sm:text-4xl text-slate-400 font-black">%</span>
                  </div>
                </div>
                <div className="h-px sm:h-24 w-full sm:w-px bg-slate-200 my-6 sm:my-0 sm:mx-10"></div>
                <div className="text-center sm:text-right">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3 sm:mb-4">Final Points</p>
                  <div className="text-4xl sm:text-5xl font-black text-brand-black tracking-tight">
                    {score}<span className="text-xl sm:text-2xl text-slate-500 ml-1">/ {maxTotalScore}</span>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl sm:rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center justify-center border-2 shadow-sm ${percentage >= 50 ? 'bg-brand-mint/5 border-brand-mint/20' : 'bg-slate-100 border-slate-200'}`}>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 sm:mb-6 text-center">Outcome</p>
                <div className={`text-3xl sm:text-4xl font-black tracking-widest italic ${percentage >= 50 ? 'text-brand-mint' : 'text-brand-black'}`}>
                  {percentage >= 50 ? 'PASSED' : 'RETRY'}
                </div>
                <div className={`mt-4 sm:mt-6 w-10 sm:w-12 h-1.5 rounded-full ${percentage >= 50 ? 'bg-brand-mint/30' : 'bg-slate-400'}`}></div>
              </div>
            </div>

            {/* Subject Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-white border border-slate-100 flex items-center group transition-all shadow-sm hover:shadow-premium"
              >
                <div className="bg-brand-mint/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm group-hover:scale-110 transition-transform shrink-0">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-brand-mint" />
                </div>
                <div className="ml-4 sm:ml-6 min-w-0 flex-grow">
                  <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Peak Subject</p>
                  <h4 className="text-lg sm:text-2xl font-black text-brand-black tracking-tight truncate">{bestSubject?.name}</h4>
                  <div className="flex items-center mt-2 w-full">
                    <div className="h-1.5 sm:h-2 flex-grow bg-slate-100 rounded-full overflow-hidden mr-3">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${bestSubject?.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-brand-mint"
                      ></motion.div>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-brand-mint shrink-0">{bestSubject?.score} pts</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-white border border-slate-100 flex items-center group transition-all shadow-sm hover:shadow-premium"
              >
                <div className="bg-brand-black p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm group-hover:scale-110 transition-transform shrink-0 flex items-center justify-center">
                  <TrendingDown className="w-8 h-8 sm:w-10 sm:h-10 text-brand-mint" />
                </div>
                <div className="ml-4 sm:ml-6 min-w-0 flex-grow">
                  <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Growth Area</p>
                  <h4 className="text-lg sm:text-2xl font-black text-brand-black tracking-tight truncate">{poorSubject?.name}</h4>
                  <div className="flex items-center mt-2 w-full">
                    <div className="h-1.5 sm:h-2 flex-grow bg-slate-100 rounded-full overflow-hidden mr-3">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${poorSubject?.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-brand-black"
                      ></motion.div>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-brand-black shrink-0">{poorSubject?.score} pts</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Corrections Review */}
            {failedQuestions.length > 0 && (
              <div className="mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 px-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-brand-black rounded-xl">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-brand-black tracking-tight">Review Corrections</h3>
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100 w-fit">{failedQuestions.length} Items</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
                  {failedQuestions.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-white border border-slate-100 group hover:border-brand-mint/30 transition-colors shadow-sm"
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-[8px] sm:text-[10px] font-black text-brand-mint uppercase tracking-widest bg-brand-mint/5 px-3 py-1.5 rounded-lg sm:rounded-xl border border-brand-mint/10">{item.subjectName}</span>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-brand-black mb-6 leading-relaxed">{item.question}</p>
                      
                      {item.image && (
                        <div className="mb-6 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 max-w-sm">
                          <img 
                            src={item.image} 
                            alt="Question Illustration" 
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Selection</p>
                          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs sm:text-sm flex items-center">
                            <XCircle className="w-4 h-4 mr-2 shrink-0 text-slate-400" />
                            <span className="truncate">{item.userAnswer}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Correct Answer</p>
                          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-brand-mint/5 border border-brand-mint/20 text-brand-deep font-black text-xs sm:text-sm flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
                            <span className="truncate">{item.correctAnswer}</span>
                          </div>
                        </div>
                      </div>

                      {item.explanation && (
                        <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100">
                          <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Explanatory Rationale</p>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium italic">
                            {item.explanation}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-8 sm:pt-12 border-t border-slate-100">
              <button
                onClick={() => navigate('/subjects')}
                className="bg-[#000000] text-[#FFFFFF] flex-grow py-4 sm:py-5 text-base sm:text-lg group order-1 sm:order-2 flex items-center justify-center rounded-2xl hover:bg-brand-mint transition-all active:scale-95 font-black uppercase tracking-wider shadow-xl shadow-brand-mint/10"
              >
                <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                <span>New Session</span>
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="bg-slate-100 text-brand-black flex-grow py-4 sm:py-5 text-base sm:text-lg order-2 sm:order-1 flex items-center justify-center rounded-2xl hover:bg-slate-200 transition-all active:scale-95 font-black uppercase tracking-wider"
              >
                <Home className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                <span>Return Hub</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-8 sm:py-12 text-center px-4">
        <p className="text-slate-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase">Performance Hub v2.0 • Excellence Hub</p>
      </footer>
    </div>
  );
};

export default Results;
