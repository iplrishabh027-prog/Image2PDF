import React from 'react';
import { ShieldCheck, Zap, Globe } from 'lucide-react';

interface Props {
  onNavigate: (page: 'home' | 'privacy' | 'terms' | 'contact') => void;
}

const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Secure & Private</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Files are processed entirely in your browser. We never upload your sensitive images to any server. Your privacy is our priority.
            </p>
          </div>
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lightning Fast</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Powered by advanced client-side processing, conversions take seconds. No queues, no waiting, just instant results.
            </p>
          </div>
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Free Forever</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              No registration, no daily limits, and no watermarks. Professional quality PDF conversion tools available for everyone.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800 gap-4">
          <div className="text-slate-400 dark:text-slate-500 text-sm">
            Â© 2024 Image2PDF. All rights reserved. Built with â¤ï¸ for the web.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</button>
            <button onClick={() => onNavigate('contact')} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
