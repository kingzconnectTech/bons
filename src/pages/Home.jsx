import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Play, ClipboardList, Timer, Award, CheckCircle, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <ClipboardList className="w-8 h-8 text-brand-mint" />,
      title: "Choose Subjects",
      description: "Pick 4 subjects to create a custom practice test tailored to your curriculum."
    },
    {
      icon: <Timer className="w-8 h-8 text-brand-deep" />,
      title: "Real-time Test",
      description: "Engage in a timed simulation that replicates the actual exam environment."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-brand-mint" />,
      title: "Smart Review",
      description: "Identify gaps with our detailed correction system for every question."
    },
    {
      icon: <Award className="w-8 h-8 text-brand-deep" />,
      title: "Score Analysis",
      description: "Track your growth with comprehensive performance analytics and subject breakdown."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand-mint/10 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 sm:-mr-48 sm:-mt-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand-deep/10 rounded-full blur-3xl opacity-50 -ml-32 -mb-32 sm:-ml-48 sm:-mb-48"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center text-center lg:text-left">
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-50 text-brand-deep rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-6 border border-slate-100 mx-auto lg:mx-0">
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-mint" />
                  </div>
                  <span>The Future of CBT Practice</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 sm:mb-8 uppercase tracking-tighter">
                  Unlock Your <br />
                  <span className="text-brand-black bg-clip-text bg-gradient-to-r from-[#000000] via-[#169976] to-[#1DCD9F] text-transparent">
                    Full Potential
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-slate-700 mb-8 sm:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                  Experience the most advanced Computer Based Testing platform. 
                  Master your subjects with randomized questions and deep analytics.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start">
                  <button
                    onClick={() => navigate('/subjects')}
                    className="btn-primary px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg group flex items-center justify-center"
                  >
                    <span>Start Practice</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mt-8 lg:mt-0"
              >
                <div className="relative z-10 premium-card p-2 sm:p-4 bg-white/40 backdrop-blur-sm overflow-hidden border border-slate-100 shadow-premium">
                  <img 
                    src="https://images.unsplash.com/photo-1454165205744-3b78555e5572?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="CBT Platform"
                    className="rounded-xl sm:rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
                {/* Decorative floating elements - smaller on mobile */}
                <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-20 h-20 sm:w-32 sm:h-32 bg-brand-mint/10 rounded-2xl sm:rounded-3xl -rotate-12 -z-10 shadow-xl border border-brand-mint/20"></div>
                <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-24 h-24 sm:w-40 sm:h-40 bg-brand-black/5 rounded-[1.5rem] sm:rounded-[2rem] rotate-12 -z-10 shadow-xl border border-slate-200"></div>
              </Motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-xs sm:text-sm font-black text-brand-mint uppercase tracking-[0.3em] mb-4">Core Benefits</h2>
              <h3 className="text-3xl sm:text-4xl font-black text-brand-black uppercase tracking-tight">Built for Academic Excellence</h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {steps.map((step, index) => (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="premium-card p-6 sm:p-8 group hover:border-brand-mint/30 shadow-sm hover:shadow-premium transition-all duration-300"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-mint/10 transition-all duration-300 overflow-hidden">
                    <div className="flex items-center justify-center w-full h-full">
                      {React.cloneElement(step.icon, { className: "w-6 h-6 sm:w-8 sm:h-8 shrink-0" })}
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-brand-black mb-3 tracking-tight uppercase">{step.title}</h4>
                  <p className="text-slate-700 font-bold leading-relaxed text-sm">{step.description}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="premium-gradient rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-mint/20">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 sm:w-80 sm:h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 sm:w-80 sm:h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 sm:mb-8 leading-tight uppercase tracking-tighter">Ready to ace your <br className="hidden sm:block" /> next exam?</h2>
              <p className="text-lg sm:text-xl text-white/80 mb-10 sm:mb-12 max-w-2xl mx-auto font-medium">
                Join thousands of students who are already using CBT Master to prepare for their exams.
              </p>
              <button
                onClick={() => navigate('/subjects')}
                className="bg-[#000000] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl shadow-xl hover:bg-brand-mint transition-all duration-300 transform active:scale-95 inline-flex items-center group"
              >
                <span>Get Started Now</span>
                <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-brand-black p-2 rounded-xl">
              <BookOpen className="w-5 h-5 text-brand-mint" />
            </div>
            <span className="ml-2 text-lg font-black text-slate-900 tracking-tight">CBT Master</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} CBT Master. Empowering students globally.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
