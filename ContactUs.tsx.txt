
import React from 'react';
import { ArrowLeft, Mail, MessageSquare, Bug, Lightbulb } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const ContactUs: React.FC<Props> = ({ onBack }) => {
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
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact Us</h1>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-8">
          <p className="text-lg">We’re here to help you.</p>
          
          <p>If you have any questions, feedback, or suggestions related to our Image to PDF Converter, feel free to contact us. We are always happy to improve our service and assist our users.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">General Questions</h4>
                <p className="text-sm">Questions about using the Image to PDF tool</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <Bug className="w-5 h-5 text-rose-500 dark:text-rose-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Issue Reports</h4>
                <p className="text-sm">Reporting issues or bugs in the conversion process</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Suggestions</h4>
                <p className="text-sm">Suggestions for new features or improvements</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <Mail className="w-5 h-5 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">General Inquiries</h4>
                <p className="text-sm">Anything else you want to talk to us about</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-blue-600 dark:bg-blue-700 rounded-3xl text-white text-center">
            <h3 className="text-xl font-bold mb-2">Send us an Email</h3>
            <a 
              href="mailto:lavelup222@gmail.com" 
              className="text-2xl md:text-3xl font-bold hover:underline break-all"
            >
              lavelup222@gmail.com
            </a>
            <p className="mt-4 text-blue-100 text-sm opacity-80">
              We usually respond within 24–48 hours.
            </p>
          </div>

          <p className="pt-8 text-center text-slate-400 dark:text-slate-500">
            Thank you for using Image2PDF.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;