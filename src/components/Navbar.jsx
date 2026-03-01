import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, BookOpen, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="bg-brand-black w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl sm:rounded-2xl shadow-lg shadow-brand-mint/10 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-brand-mint" />
              </div>
              <div className="ml-2 sm:ml-3 flex flex-col justify-center">
                <span className="text-sm sm:text-xl font-black text-brand-black tracking-tight block leading-none uppercase">CBT Master</span>
                <span className="text-[8px] sm:text-[10px] font-bold text-brand-mint uppercase tracking-widest mt-0.5 sm:mt-1">Excellence Hub</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden xs:flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-slate-50 border border-slate-100 max-w-[100px] sm:max-w-none">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-mint/10 flex items-center justify-center shrink-0">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-brand-deep" />
              </div>
              <span className="text-[10px] sm:text-sm font-black text-slate-700 truncate">
                {user?.email?.split('@')[0]}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 sm:space-x-2 bg-[#000000] text-[#FFFFFF] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold text-[10px] sm:text-sm transition-all hover:bg-brand-mint group shadow-sm active:scale-95 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform text-[#FFFFFF]" />
              <span className="text-[#FFFFFF]">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
