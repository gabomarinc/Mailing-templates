
import React, { useState } from 'react';
import { GeneratedTemplate, AppState, AppLanguage } from '../types';
import { Code, Eye, Check, Download, Smartphone, Monitor, FileText, Lock, Mail, X, Loader2 } from 'lucide-react';
import { translations } from '../i18n';

interface PreviewPanelProps {
  template: GeneratedTemplate | null;
  appState: AppState;
  isUnlocked: boolean;
  isSubmitting: boolean;
  onUnlock: (email: string) => void;
  appLanguage: AppLanguage;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ template, appState, isUnlocked, isSubmitting, onUnlock, appLanguage }) => {
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'text'>('preview');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const t = translations[appLanguage];
  
  // Modal State
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(emailInput)) {
      // Call parent handler
      onUnlock(emailInput);
      // We do NOT close the modal immediately here, we wait for the parent to set isUnlocked or finish submitting.
      // However, typically successful unlock will re-render this component with isUnlocked=true
    } else {
      setEmailError(t.invalidEmail);
    }
  };

  // Close modal effect if unlocked changes
  React.useEffect(() => {
    if (isUnlocked) {
        setShowUnlockModal(false);
    }
  }, [isUnlocked]);

  const handleActionRequest = (action: () => void) => {
    if (isUnlocked) {
      action();
    } else {
      setShowUnlockModal(true);
    }
  };

  const handleCopy = () => {
    if (!template) return;
    const contentToCopy = viewMode === 'text' ? template.plainText : template.html;
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
      if (template?.html) {
          const blob = new Blob([template.html], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `email-template-${Date.now()}.html`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
      }
  };

  // Render Empty State
  if (appState === AppState.IDLE) {
    return (
      <div className="flex-1 bg-slate-100 flex flex-col items-center justify-center p-8 text-center h-full">
        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Eye className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.readyToCraft}</h2>
        <p className="text-slate-500 max-w-md">
          {t.readyDesc}
        </p>
      </div>
    );
  }

  // Render Loading State
  if (appState === AppState.GENERATING) {
     return (
      <div className="flex-1 bg-slate-100 flex flex-col items-center justify-center p-8 text-center h-full">
        <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#27bea5] rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.generating}</h2>
        <p className="text-slate-500 max-w-md">
          {t.generatingDesc}
        </p>
      </div>
    );
  }

  // Render Error State
  if (appState === AppState.ERROR || !template) {
      return (
      <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-8 text-center h-full">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <div className="text-red-500 text-3xl">!</div>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">{t.errorTitle}</h2>
        <p className="text-slate-500">{t.errorDesc}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-100 flex flex-col h-full relative">
      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'preview' ? 'bg-white text-[#27bea5] shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            {t.preview}
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'code' ? 'bg-white text-[#27bea5] shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Code className="w-4 h-4" />
            {t.htmlCode}
          </button>
          <button
            onClick={() => setViewMode('text')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'text' ? 'bg-white text-[#27bea5] shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            {t.plainText}
          </button>
        </div>

        {viewMode === 'preview' && (
             <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <button
                    onClick={() => setDeviceMode('desktop')}
                    className={`p-1.5 rounded-md transition-all ${
                    deviceMode === 'desktop' ? 'bg-white text-[#27bea5] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                    title={t.desktop}
                >
                    <Monitor className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setDeviceMode('mobile')}
                    className={`p-1.5 rounded-md transition-all ${
                    deviceMode === 'mobile' ? 'bg-white text-[#27bea5] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                    title={t.mobile}
                >
                    <Smartphone className="w-4 h-4" />
                </button>
             </div>
        )}

        <div className="flex items-center gap-2">
            <button
                onClick={() => handleActionRequest(handleCopy)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : (isUnlocked ? props => <props.icon /> : <Lock className="w-4 h-4" />)}
                {copied ? t.copied : t.copy}
            </button>
            <button
                onClick={() => handleActionRequest(handleDownload)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#27bea5] text-white rounded-md text-sm font-medium hover:bg-[#20a08b] transition-all shadow-sm"
            >
                 {isUnlocked ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                {t.export}
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative flex items-center justify-center bg-slate-200/50 p-4">
        {viewMode === 'preview' && (
          <div className={`bg-white shadow-xl transition-all duration-300 overflow-hidden ${
              deviceMode === 'mobile' ? 'w-[375px] h-[667px] rounded-xl border-[8px] border-slate-800' : 'w-full h-full rounded-lg'
          }`}>
             <iframe
                srcDoc={template.html}
                title="Email Preview"
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-popups"
            />
          </div>
        )}

        {viewMode === 'code' && (
          <div className="w-full h-full bg-[#1e1e1e] rounded-lg shadow-inner overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 bg-[#252526] text-slate-400 text-xs border-b border-[#333]">
                  <span>index.html</span>
                  <span>{template.html.length} characters</span>
              </div>
            <pre className={`flex-1 p-4 overflow-auto text-xs font-mono text-slate-300 leading-relaxed custom-scrollbar whitespace-pre-wrap break-all ${!isUnlocked ? 'blur-sm select-none' : ''}`}>
              {template.html}
            </pre>
             {!isUnlocked && (
                 <div className="absolute inset-0 flex items-center justify-center z-10">
                     <button 
                        onClick={() => setShowUnlockModal(true)}
                        className="bg-[#27bea5] text-white px-6 py-3 rounded-lg font-bold shadow-xl hover:bg-[#20a08b] transition-transform transform hover:scale-105 flex items-center gap-2"
                     >
                         <Lock className="w-5 h-5" />
                         {t.unlock}
                     </button>
                 </div>
             )}
          </div>
        )}

        {viewMode === 'text' && (
          <div className="w-full h-full bg-white rounded-lg shadow-inner overflow-hidden flex flex-col border border-slate-200">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-50 text-slate-500 text-xs border-b border-slate-200">
                  <span>Plain Text Version</span>
                  <span>{template.plainText.length} characters</span>
              </div>
            <pre className={`flex-1 p-8 overflow-auto text-sm font-mono text-slate-700 leading-relaxed custom-scrollbar whitespace-pre-wrap ${!isUnlocked ? 'blur-sm select-none' : ''}`}>
              {template.plainText}
            </pre>
             {!isUnlocked && (
                 <div className="absolute inset-0 flex items-center justify-center z-10">
                     <button 
                        onClick={() => setShowUnlockModal(true)}
                        className="bg-[#27bea5] text-white px-6 py-3 rounded-lg font-bold shadow-xl hover:bg-[#20a08b] transition-transform transform hover:scale-105 flex items-center gap-2"
                     >
                         <Lock className="w-5 h-5" />
                         {t.unlock}
                     </button>
                 </div>
             )}
          </div>
        )}
      </div>
      
      {/* Meta info bar */}
      {template && (
        <div className="bg-white border-t border-slate-200 px-6 py-2 text-xs text-slate-500 flex gap-6 shrink-0">
            <p><span className="font-semibold text-slate-700">{t.subject}</span> {template.subjectLine}</p>
            <p><span className="font-semibold text-slate-700">{t.preheader}</span> {template.previewText}</p>
        </div>
      )}

      {/* Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
            <button 
                onClick={() => setShowUnlockModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 bg-[#e0f5f0] text-[#27bea5] rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{t.unlockTitle}</h3>
                <p className="text-slate-500 mt-2 text-sm">
                    {t.unlockDesc}
                </p>
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 uppercase mb-1 text-left">{t.emailLabel}</label>
                    <input 
                        type="email" 
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5] focus:bg-white transition-all"
                        autoFocus
                        disabled={isSubmitting}
                    />
                    {emailError && <p className="text-red-500 text-xs mt-1 text-left">{emailError}</p>}
                </div>
                
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#27bea5] text-white py-3 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#20a08b]'}`}
                >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-4 h-4" />}
                    {isSubmitting ? "Subscribing..." : t.getMyCode}
                </button>
            </form>
            
            <p className="text-xs text-slate-400 mt-6 text-center">
                {t.privacy}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;
