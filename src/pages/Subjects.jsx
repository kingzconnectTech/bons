import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, ArrowRight, BookOpen, Sparkles, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useTest } from '../context/TestContext';
import { AVAILABLE_SUBJECTS } from '../data/subjects';

const Subjects = () => {
  const { setSelectedSubjects } = useTest();
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleSubject = (subject) => {
    if (selected.find(s => s.id === subject.id)) {
      setSelected(selected.filter(s => s.id !== subject.id));
    } else {
      if (selected.length < 4) {
        setSelected([...selected, subject]);
      }
    }
  };

  const handleStartTest = () => {
    if (selected.length === 4) {
      setSelectedSubjects(selected);
      navigate('/test');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-50 text-brand-deep rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-slate-100 mx-auto md:mx-0">
              <div className="flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-brand-mint" />
              </div>
              <span>Personalize Your Experience</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Select Your Subjects
            </h1>
            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              Choose exactly <span className="text-brand-deep font-black underline underline-offset-4 decoration-2">4 subjects</span> to generate your personalized practice test.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-white p-2 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm mx-auto md:mx-0">
            <div className="flex -space-x-2 sm:-space-x-3 overflow-hidden p-1">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-4 border-white flex items-center justify-center font-black text-[10px] sm:text-xs transition-all duration-500 ${selected[i] ? 'bg-brand-black text-brand-mint translate-y-0' : 'bg-slate-200 text-slate-500'}`}
                >
                  {selected[i] ? selected[i].name.charAt(0) : i + 1}
                </div>
              ))}
            </div>
            <div className="pr-3 sm:pr-4">
              <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</p>
              <p className="text-xs sm:text-sm font-black text-slate-900">{selected.length}/4 Selected</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {AVAILABLE_SUBJECTS.map((subject, index) => {
            const isSelected = selected.find(s => s.id === subject.id);
            const isDisabled = !isSelected && selected.length >= 4;
            
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => !isDisabled && toggleSubject(subject)}
                className={`
                  group relative cursor-pointer rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 border-2 transition-all duration-300
                  ${isSelected 
                    ? 'border-brand-mint bg-slate-50 shadow-xl shadow-slate-100 -translate-y-1 sm:-translate-y-2' 
                    : isDisabled 
                      ? 'border-slate-100 bg-slate-50 opacity-40 cursor-not-allowed' 
                      : 'border-white bg-white hover:border-brand-mint/30 shadow-premium hover:shadow-premium-hover hover:-translate-y-1'
                  }
                `}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-transform group-hover:scale-110 duration-300 ${isSelected ? 'bg-brand-black text-brand-mint' : 'bg-slate-50 text-slate-400'}`}>
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                
                <h3 className={`text-lg sm:text-xl font-black tracking-tight mb-1 sm:mb-2 ${isSelected ? 'text-brand-black' : 'text-slate-900'}`}>
                  {subject.name}
                </h3>
                <p className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-brand-deep' : 'text-slate-500'}`}>
                  {isSelected ? 'Ready to go!' : 'Available for practice'}
                </p>
                
                <AnimatePresence>
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 45 }}
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-brand-black rounded-lg sm:rounded-xl p-1 sm:p-1.5 shadow-lg shadow-slate-200"
                    >
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-brand-mint" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Action Bar */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div 
              initial={{ y: 100, x: '-50%', opacity: 0 }}
              animate={{ y: 0, x: '-50%', opacity: 1 }}
              exit={{ y: 100, x: '-50%', opacity: 0 }}
              className="fixed bottom-6 sm:bottom-10 left-1/2 w-[calc(100%-2rem)] sm:w-full max-w-2xl z-50"
            >
              <div className="glass-effect rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/40 p-4 sm:p-5 flex flex-col xs:flex-row items-center justify-between gap-4 sm:gap-6 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-brand-black"></div>
                
                <div className="flex items-center space-x-3 sm:space-x-5 pl-2">
                  <div className="relative shrink-0">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100 sm:hidden" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 hidden sm:block" />
                      
                      {/* Mobile path */}
                      <circle 
                        cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 20} 
                        strokeDashoffset={2 * Math.PI * 20 * (1 - selected.length / 4)} 
                        strokeLinecap="round"
                        className="text-brand-mint transition-all duration-700 ease-out sm:hidden" 
                      />
                      {/* Tablet/Desktop path */}
                      <circle 
                        cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 28} 
                        strokeDashoffset={2 * Math.PI * 28 * (1 - selected.length / 4)} 
                        strokeLinecap="round"
                        className="text-brand-mint transition-all duration-700 ease-out hidden sm:block" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-brand-black text-sm sm:text-base">
                      {selected.length}
                    </div>
                  </div>
                  <div>
                    <p className="text-brand-black font-black text-base sm:text-lg leading-none mb-1 uppercase tracking-tight">
                      {selected.length === 4 ? "Ready!" : "Selection"}
                    </p>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                      {selected.length === 4 ? "Full House" : `${4 - selected.length} more left`}
                    </p>
                  </div>
                </div>
                
                <button
                  disabled={selected.length !== 4}
                  onClick={handleStartTest}
                  className={`
                    w-full xs:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all duration-300
                    ${selected.length === 4 
                      ? 'bg-[#000000] text-white hover:bg-brand-mint shadow-xl shadow-brand-mint/20 group' 
                      : 'bg-[#222222] text-[#666666] cursor-not-allowed opacity-50'}
                  `}
                >
                  <span className="uppercase tracking-wider">Begin Exam</span>
                  <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${selected.length === 4 ? 'group-hover:translate-x-1' : ''}`} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Spacing for floating bar */}
      <div className="h-24 sm:h-32"></div>
    </div>
  );
};

export default Subjects;
