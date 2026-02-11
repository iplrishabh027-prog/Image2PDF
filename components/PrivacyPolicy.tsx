import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mb-8 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Converter
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-6">
          <p className="text-sm text-slate-400 dark:text-slate-500">Last Updated: May 2024</p>
          
          <p>Your privacy is very important to us. This Privacy Policy explains how we handle information when you use our Image to PDF Converter website.</p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">INFORMATION WE DO NOT COLLECT</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>We do not require users to sign up or log in.</li>
              <li>We do not collect personal information such as name, email address, or phone number.</li>
              <li>We do not permanently store uploaded images or converted PDF files.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">FILE UPLOAD AND PROCESSING</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All images uploaded by users are used only for converting them into PDF files.</li>
              <li>Files are processed temporarily in your browser's memory and are automatically cleared after the conversion is completed or the tab is closed.</li>
              <li>We do not view, access, share, or save your uploaded files.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">COOKIES</h2>
            <p>We may use basic cookies to improve website performance. Cookies do not store any personal or sensitive information and we do not use them for tracking or profiling.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">DATA SECURITY</h2>
            <p>We use standard security measures to protect your data during the conversion process. However, no method of data transmission over the internet is completely secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">CONTACT US</h2>
            <p>If you have any questions about this Privacy Policy, you can contact us at: <a href="mailto:lavelup222@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">lavelup222@gmail.com</a></p>
          </section>

          <p className="pt-8 text-sm italic">By using our website, you agree to this Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
