
import React from 'react';
import { FileText, Github, Sun, Moon } from 'lucide-react';

interface Props {
  onNavigate: (page: 'home' | 'privacy' | 'terms' | 'contact') => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<Props> = ({ onNavigate, theme, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Image<span className="text-blue-600">2PDF</span></span>
        </button>
        
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => onNavigate('home')} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Converter</button>
          <button onClick={() => onNavigate('privacy')} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</button>
          <button onClick={() => onNavigate('terms')} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</button>
          <button onClick={() => onNavigate('contact')} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</button>
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-all">
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
