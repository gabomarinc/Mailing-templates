import React from 'react';
import { TemplateId, TemplateOption, AppLanguage } from '../types';
import { translations } from '../i18n';
import { CheckCircle } from 'lucide-react';

interface TemplateSelectorProps {
  onSelect: (id: TemplateId) => void;
  appLanguage: AppLanguage;
  setAppLanguage: (lang: AppLanguage) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect, appLanguage, setAppLanguage }) => {
  const t = translations[appLanguage];

  const templates: TemplateOption[] = [
    { id: 'modern', nameKey: 'modern', descriptionKey: 'modern' },
    { id: 'corporate', nameKey: 'corporate', descriptionKey: 'corporate' },
    { id: 'newsletter', nameKey: 'newsletter', descriptionKey: 'newsletter' },
    { id: 'promo', nameKey: 'promo', descriptionKey: 'promo' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header with Lang Switcher */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div className="text-left">
           <img 
              src="https://konsul.digital/wp-content/uploads/2025/07/Logo-original-e1751717849441.png" 
              alt="Konsul" 
              className="h-12 w-auto object-contain mb-4"
            />
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t.selectTemplateTitle}</h1>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl">{t.selectTemplateDesc}</p>
        </div>
        
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
            <button onClick={() => setAppLanguage('en')} className={`px-3 py-1.5 rounded text-sm font-bold transition-all ${appLanguage === 'en' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>🇺🇸 EN</button>
            <button onClick={() => setAppLanguage('es')} className={`px-3 py-1.5 rounded text-sm font-bold transition-all ${appLanguage === 'es' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>🇪🇸 ES</button>
            <button onClick={() => setAppLanguage('pt')} className={`px-3 py-1.5 rounded text-sm font-bold transition-all ${appLanguage === 'pt' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>🇧🇷 PT</button>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#27bea5] transition-all duration-300 text-left overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
          >
            {/* CSS Preview Representation */}
            <div className="bg-slate-100/50 p-6 h-56 flex items-center justify-center border-b border-slate-100 group-hover:bg-[#f0fdfa]/30 transition-colors relative overflow-hidden">
               
               {/* Background Pattern */}
               <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

               {/* Modern Preview */}
               {template.id === 'modern' && (
                 <div className="w-32 h-44 bg-slate-50 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col overflow-hidden transform group-hover:scale-110 transition-transform duration-500 border border-slate-200/60">
                    <div className="bg-[#f5f7fb] p-2 flex-1 flex flex-col items-center pt-3">
                        <div className="w-24 bg-white rounded-lg shadow-sm overflow-hidden mb-2">
                             <div className="h-10 bg-gradient-to-br from-[#27bea5] to-[#017b46]"></div>
                             <div className="p-2 space-y-1.5">
                                 <div className="h-1.5 w-12 bg-slate-100 rounded-full mx-auto"></div>
                                 <div className="h-6 bg-slate-50 rounded border border-slate-100"></div>
                             </div>
                        </div>
                        <div className="w-24 bg-white rounded-lg shadow-sm p-2 space-y-1">
                             <div className="h-1 w-full bg-slate-100 rounded"></div>
                             <div className="h-1 w-2/3 bg-slate-100 rounded"></div>
                        </div>
                    </div>
                 </div>
               )}

               {/* Corporate Preview */}
               {template.id === 'corporate' && (
                 <div className="w-32 h-44 bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col transform group-hover:scale-110 transition-transform duration-500">
                    <div className="h-8 bg-[#0f172a] w-full flex items-center px-2">
                        <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
                    </div>
                    <div className="p-3 space-y-3 flex-1 bg-white">
                         <div className="flex gap-2">
                             <div className="flex-1 space-y-1">
                                <div className="h-1.5 w-12 bg-slate-200 rounded-sm"></div>
                                <div className="h-1 w-full bg-slate-100 rounded-sm"></div>
                                <div className="h-1 w-full bg-slate-100 rounded-sm"></div>
                             </div>
                         </div>
                         <div className="h-px w-full bg-slate-100"></div>
                         <div className="grid grid-cols-2 gap-2">
                             <div className="h-12 bg-slate-50 border border-slate-100 rounded-sm"></div>
                             <div className="h-12 bg-slate-50 border border-slate-100 rounded-sm"></div>
                         </div>
                         <div className="mt-auto h-5 w-full bg-[#27bea5] rounded-sm flex items-center justify-center">
                             <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                         </div>
                    </div>
                 </div>
               )}

               {/* Newsletter Preview */}
               {template.id === 'newsletter' && (
                 <div className="w-32 h-44 bg-[#fdfbf7] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center pt-4 px-3 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="h-8 w-8 rounded-full border border-slate-200 bg-white mb-3 flex items-center justify-center">
                        <div className="w-4 h-4 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="h-px w-full bg-slate-200 mb-3"></div>
                    <div className="w-full space-y-2 text-center">
                        <div className="h-2 w-3/4 bg-slate-800 mx-auto mb-1"></div>
                        <div className="h-1 w-full bg-slate-300"></div>
                        <div className="h-1 w-full bg-slate-300"></div>
                        <div className="h-1 w-5/6 bg-slate-300 mx-auto"></div>
                    </div>
                    <div className="mt-3 w-full h-12 bg-slate-200 rounded-sm"></div>
                 </div>
               )}

               {/* Promo Preview */}
               {template.id === 'promo' && (
                 <div className="w-32 h-44 bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col transform group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                    <div className="h-20 bg-gradient-to-tr from-yellow-300 to-orange-400 flex items-center justify-center relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full -mr-4 -mt-4"></div>
                         <div className="text-[8px] font-black text-white tracking-widest uppercase">SALE</div>
                    </div>
                    <div className="p-3 flex flex-col items-center text-center">
                        <div className="h-2 w-16 bg-slate-900 mb-1"></div>
                        <div className="h-1 w-20 bg-slate-300 mb-3"></div>
                        <div className="h-6 w-full bg-red-500 rounded text-[4px] text-white flex items-center justify-center font-bold shadow-sm">
                            SHOP NOW
                        </div>
                    </div>
                 </div>
               )}

            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#27bea5] transition-colors">
                {t.templates[template.nameKey as keyof typeof t.templates].name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {t.templates[template.descriptionKey as keyof typeof t.templates].desc}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-[#27bea5] transition-colors">Select Style</span>
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#27bea5] transition-colors">
                    <CheckCircle className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
                 </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;