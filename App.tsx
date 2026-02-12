
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, X, FileText, Download, LayoutGrid, Settings2, GripVertical, AlertCircle, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import { ImageFile, PDFSettings, PageSize, Orientation, Margin } from './types';
import { generatePDF } from './services/pdfService';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdUnit: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense failed to load:', e);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 overflow-hidden">
      <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 overflow-hidden">
        <p className="text-[10px] text-slate-400 dark:text-slate-600 mb-2 uppercase text-center font-bold tracking-widest">Advertisement</p>
        <ins className="adsbygoogle"
             style={{ display: 'block', textAlign: 'center' }}
             data-ad-layout="in-article"
             data-ad-format="fluid"
             data-ad-client="ca-pub-2870288856744483"
             data-ad-slot="6668252915"></ins>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms' | 'contact'>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<PDFSettings>({
    pageSize: PageSize.A4,
    orientation: Orientation.PORTRAIT,
    margin: Margin.SMALL,
    filename: 'converted_images.pdf'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleFileSelection = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageFile[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        preview: URL.createObjectURL(file)
      }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
    setImages(newImages);
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    try {
      const blob = await generatePDF(images, settings);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = settings.filename.toLowerCase().endsWith('.pdf') ? settings.filename : `${settings.filename}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF Generation failed', error);
      alert('Conversion failed. Please try again with smaller or different images.');
    } finally {
      setIsProcessing(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelection(e.dataTransfer.files);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'privacy':
        return <PrivacyPolicy onBack={() => setCurrentPage('home')} />;
      case 'terms':
        return <TermsOfService onBack={() => setCurrentPage('home')} />;
      case 'contact':
        return <ContactUs onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="bg-blue-600 dark:bg-blue-700 text-white py-16 px-4 text-center transition-colors">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                  Convert Your Images to <span className="bg-white text-blue-600 px-3 rounded-md dark:bg-slate-900 dark:text-blue-400">PDF</span> Instantly
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                  The fastest way to combine images into a high-quality PDF. 
                  Safe, private, and works right in your browser.
                </p>
              </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
                {images.length === 0 ? (
                  /* Dropzone Placeholder */
                  <div 
                    className={`p-12 md:p-24 transition-all duration-300 ${isDragging ? 'bg-blue-50 dark:bg-slate-800 border-4 border-dashed border-blue-400' : 'bg-white dark:bg-slate-900'}`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center mb-8 animate-bounce">
                        <Upload className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Select your images
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md text-balance">
                        Drag and drop your JPG, PNG, or WEBP files here, or click to browse from your device.
                      </p>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center gap-3 transform hover:-translate-y-1 active:scale-95"
                      >
                        <Upload className="w-6 h-6" />
                        <span>Upload Images</span>
                      </button>
                      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400 dark:text-slate-500 text-sm font-medium">
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div> No Account Required</span>
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div> Safe & Secure</span>
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div> Multi-file Support</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Conversion Interface */
                  <div className="flex flex-col lg:flex-row min-h-[600px]">
                    {/* Main Content Area */}
                    <div className="flex-grow p-6 md:p-8 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-800 transition-colors">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <LayoutGrid className="w-6 h-6 text-slate-400" />
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Added Images ({images.length})</h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-4 py-2 rounded-lg transition-all"
                          >
                            + Add More
                          </button>
                          <button 
                            onClick={clearAll}
                            className="text-sm font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 px-4 py-2 rounded-lg transition-all"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {images.map((img, idx) => (
                          <div 
                            key={img.id} 
                            className="group relative bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700"
                          >
                            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 relative mb-2">
                              <img 
                                src={img.preview} 
                                alt={img.name} 
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button 
                                  disabled={idx === 0}
                                  onClick={() => moveImage(idx, 'up')}
                                  title="Move Up"
                                  className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <ArrowRight className="w-4 h-4 rotate-180" />
                                </button>
                                <button 
                                  disabled={idx === images.length - 1}
                                  onClick={() => moveImage(idx, 'down')}
                                  title="Move Down"
                                  className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                              <button 
                                onClick={() => removeImage(img.id)}
                                title="Remove Image"
                                className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm font-bold">
                                Page {idx + 1}
                              </div>
                            </div>
                            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate px-1">
                              {img.name}
                            </p>
                          </div>
                        ))}
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="aspect-[3/4] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-50 dark:hover:bg-slate-800/80 transition-all gap-2"
                        >
                          <Upload className="w-6 h-6" />
                          <span className="text-sm font-bold">Add Images</span>
                        </button>
                      </div>
                    </div>

                    {/* Settings Sidebar */}
                    <div className="w-full lg:w-96 p-8 bg-white dark:bg-slate-900 flex flex-col gap-8 transition-colors">
                      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <Settings2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="font-bold text-slate-900 dark:text-white">PDF Settings</h3>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">Page Size</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: PageSize.A4, label: 'A4' },
                              { id: PageSize.LETTER, label: 'Letter' },
                              { id: PageSize.AUTO, label: 'Auto' }
                            ].map((size) => (
                              <button
                                key={size.id}
                                onClick={() => setSettings({ ...settings, pageSize: size.id })}
                                className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${settings.pageSize === size.id ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400 shadow-sm' : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
                              >
                                {size.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">Orientation</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: Orientation.PORTRAIT, label: 'Portrait' },
                              { id: Orientation.LANDSCAPE, label: 'Landscape' }
                            ].map((orient) => (
                              <button
                                key={orient.id}
                                onClick={() => setSettings({ ...settings, orientation: orient.id })}
                                className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${settings.orientation === orient.id ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400 shadow-sm' : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
                              >
                                {orient.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">Margins</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: Margin.NONE, label: 'None' },
                              { id: Margin.SMALL, label: 'Small' },
                              { id: Margin.LARGE, label: 'Large' }
                            ].map((margin) => (
                              <button
                                key={margin.id}
                                onClick={() => setSettings({ ...settings, margin: margin.id })}
                                className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${settings.margin === margin.id ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400 shadow-sm' : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
                              >
                                {margin.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">Filename</label>
                          <input 
                            type="text" 
                            value={settings.filename}
                            onChange={(e) => setSettings({ ...settings, filename: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            placeholder="my_pdf"
                          />
                        </div>
                      </div>

                      <div className="mt-auto pt-8">
                        <button 
                          onClick={handleConvert}
                          disabled={isProcessing}
                          className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
                              <span>Convert to PDF</span>
                            </>
                          )}
                        </button>
                        <div className="mt-4 flex items-center gap-2 text-slate-400 dark:text-slate-500 justify-center">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-[11px] font-medium">All processing happens locally in your browser.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ad Unit placed after the converter tool */}
              <AdUnit />

              {/* SEO Content Placeholder */}
              <div className="mt-20 max-w-4xl mx-auto space-y-16">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">How to Convert Images to PDF?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">1</div>
                      <h4 className="font-bold dark:text-slate-200">Upload</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Select your images (JPG, PNG, WEBP) from your device or drag them into the box.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">2</div>
                      <h4 className="font-bold dark:text-slate-200">Customize</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Rearrange images using the arrows, choose page size, orientation and margins.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">3</div>
                      <h4 className="font-bold dark:text-slate-200">Download</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Click "Convert to PDF" to generate and download your professional PDF file instantly.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-12 border border-slate-200 dark:border-slate-800 transition-colors">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why choose Image2PDF?</h2>
                    <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold">✓</div>
                        <span><strong>100% Client-Side:</strong> Your data never leaves your computer. No privacy risks.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold">✓</div>
                        <span><strong>Ultra Fast:</strong> No server upload/download delays. Conversions are local and instant.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold">✓</div>
                        <span><strong>Professional Quality:</strong> High-resolution output with customizable page layouts.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Privacy First Guarantee</h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Security Certificate</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 italic leading-relaxed">
                      "We believe that online tools should be private. By processing everything in your browser, we eliminate the need for server-side storage and account requirements."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
  <>
    {/* SEO Hidden Content for Google */}
    <section style={{ display: "none" }}>
      <h1>Image to PDF Converter Online Free</h1>

      <p>
        Image2PDF is a free online tool to convert images to PDF.
        Convert JPG, PNG, WEBP images into high quality PDF files instantly.
      </p>

      <p>
        No signup required. 100% client side image to PDF converter.
        Fast, secure and works on all devices.
      </p>

      <ul>
        <li>Convert JPG to PDF online</li>
        <li>Convert PNG to PDF free</li>
        <li>Image to PDF converter without upload</li>
        <li>Online PDF creator tool</li>
      </ul>
    </section>

    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Header onNavigate={setCurrentPage} theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onNavigate={setCurrentPage} />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileSelection(e.target.files)}
      />
    </div>
  </>
);

export default App;
