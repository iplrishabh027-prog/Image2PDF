
import React from 'react';
import { ArrowLeft, Gavel } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const TermsOfService: React.FC<Props> = ({ onBack }) => {
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
            <Gavel className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-8">
          <p className="text-sm text-slate-400 dark:text-slate-500">Last Updated: May 2024</p>
          
          <p>Welcome to Image2PDF.</p>

          <p>By accessing or using this website, you agree to comply with and be bound by the following Terms of Service. If you do not agree with these terms, please do not use the website.</p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">USE OF THE SERVICE</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Image2PDF provides a free online tool that allows users to convert images into PDF files.</li>
              <li>The service is provided for personal and lawful use only.</li>
              <li>You agree not to misuse the service or use it for any illegal or unauthorized purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">USER CONTENT</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Users may upload images solely for the purpose of converting them into PDF files.</li>
              <li>You confirm that you own the rights to the images you upload or have permission to use them.</li>
              <li>You are solely responsible for the content of the files you upload.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">NO FILE STORAGE</h2>
            <p>Uploaded images and generated PDF files are processed temporarily in your browser's local memory. All files are automatically deleted/cleared once the conversion process is completed or the session ends. We do not store, share, or review user files on any server.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">DISCLAIMER OF WARRANTIES</h2>
            <p>The service is provided on an "as is" and "as available" basis. We do not guarantee that the service will always be error-free, secure, or uninterrupted. We make no warranties regarding the accuracy or reliability of the converted files.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">LIMITATION OF LIABILITY</h2>
            <p>Image2PDF shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the service. Use of the website is entirely at your own risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">SERVICE AVAILABILITY</h2>
            <p>We reserve the right to modify, suspend, or discontinue the service at any time without prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">CHANGES TO THESE TERMS</h2>
            <p>We may update these Terms of Service from time to time. Any changes will be posted on this page, and continued use of the website means you accept the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">GOVERNING LAW</h2>
            <p>These Terms of Service shall be governed by and interpreted in accordance with the laws of your jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">CONTACT US</h2>
            <p>If you have any questions about these Terms of Service, please contact us at: <a href="mailto:lavelup222@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">lavelup222@gmail.com</a></p>
          </section>

          <p className="pt-8 text-sm italic border-t border-slate-100 dark:border-slate-800">By using this website, you agree to these Terms of Service.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;