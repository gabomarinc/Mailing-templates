import React from 'react';
import { BrandConfig, ContentConfig, AppState, AppLanguage } from '../types';
import { Type, Palette, Send, RefreshCw, Settings, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { translations } from '../i18n';

interface ConfigPanelProps {
  brand: BrandConfig;
  setBrand: React.Dispatch<React.SetStateAction<BrandConfig>>;
  content: ContentConfig;
  setContent: React.Dispatch<React.SetStateAction<ContentConfig>>;
  onGenerate: () => void;
  appState: AppState;
  appLanguage: AppLanguage;
  setAppLanguage: (lang: AppLanguage) => void;
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
  onBackToTemplates: () => void; // New prop
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  brand,
  setBrand,
  content,
  setContent,
  onGenerate,
  appState,
  appLanguage,
  setAppLanguage,
  showAdvanced,
  setShowAdvanced,
  onBackToTemplates
}) => {
  const isLoading = appState === AppState.GENERATING;
  const t = translations[appLanguage];

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBrand((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full lg:w-1/3 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToTemplates}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            title={t.changeTemplate}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="mb-0">
                <img 
                src="https://konsul.digital/wp-content/uploads/2025/07/Logo-original-e1751717849441.png" 
                alt="Konsul" 
                className="h-8 w-auto object-contain"
                />
            </div>
          </div>
        </div>
        
        {/* Language Switcher */}
        <div className="flex bg-slate-100 rounded-lg p-1">
            <button 
                onClick={() => setAppLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${appLanguage === 'en' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >🇺🇸</button>
            <button 
                onClick={() => setAppLanguage('es')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${appLanguage === 'es' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >🇪🇸</button>
            <button 
                onClick={() => setAppLanguage('pt')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${appLanguage === 'pt' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >🇧🇷</button>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-8">
        {/* Brand Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-semibold pb-2 border-b border-slate-100">
            <Palette className="w-4 h-4" />
            <h2>{t.brandIdentity}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.brandName}</label>
              <input
                type="text"
                name="brandName"
                value={brand.brandName}
                onChange={handleBrandChange}
                placeholder="e.g. Acme Corp"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.logoUrl}</label>
              <input
                type="url"
                name="logoUrl"
                value={brand.logoUrl}
                onChange={handleBrandChange}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
              />
            </div>

             <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.websiteUrl}</label>
              <input
                type="url"
                name="websiteUrl"
                value={brand.websiteUrl}
                onChange={handleBrandChange}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.fontFamily}</label>
              <select
                name="fontFamily"
                value={brand.fontFamily}
                onChange={handleBrandChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
              >
                <option value="Arial, Helvetica, sans-serif">Arial (Sans-Serif)</option>
                <option value="Verdana, Geneva, sans-serif">Verdana (Sans-Serif)</option>
                <option value="'Trebuchet MS', Helvetica, sans-serif">Trebuchet MS (Sans-Serif)</option>
                <option value="'Times New Roman', Times, serif">Times New Roman (Serif)</option>
                <option value="Georgia, serif">Georgia (Serif)</option>
                <option value="'Courier New', Courier, monospace">Courier New (Monospace)</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.primary}</label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        name="primaryColor"
                        value={brand.primaryColor}
                        onChange={handleBrandChange}
                        className="h-9 w-9 p-0.5 rounded border border-slate-200 cursor-pointer bg-white shrink-0"
                    />
                    <input
                        type="text"
                        name="primaryColor"
                        value={brand.primaryColor}
                        onChange={handleBrandChange}
                        className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
                        maxLength={7}
                    />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.secondary}</label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        name="secondaryColor"
                        value={brand.secondaryColor}
                        onChange={handleBrandChange}
                        className="h-9 w-9 p-0.5 rounded border border-slate-200 cursor-pointer bg-white shrink-0"
                    />
                    <input
                        type="text"
                        name="secondaryColor"
                        value={brand.secondaryColor}
                        onChange={handleBrandChange}
                        className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
                        maxLength={7}
                    />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.background}</label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        name="backgroundColor"
                        value={brand.backgroundColor}
                        onChange={handleBrandChange}
                        className="h-9 w-9 p-0.5 rounded border border-slate-200 cursor-pointer bg-white shrink-0"
                    />
                    <input
                        type="text"
                        name="backgroundColor"
                        value={brand.backgroundColor}
                        onChange={handleBrandChange}
                        className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
                        maxLength={7}
                    />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-semibold pb-2 border-b border-slate-100">
            <Type className="w-4 h-4" />
            <h2>{t.campaignContent}</h2>
          </div>

          <div className="space-y-4">
            {/* Template Language Selector */}
            <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.templateLanguage}</label>
                <div className="relative">
                    <select
                        name="language"
                        value={content.language}
                        onChange={handleContentChange}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5] appearance-none"
                    >
                        <option value="en">🇺🇸 English</option>
                        <option value="es">🇪🇸 Español</option>
                        <option value="pt">🇧🇷 Português</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
            </div>

             <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.campaignTopic}</label>
              <input
                type="text"
                name="campaignTopic"
                value={content.campaignTopic}
                onChange={handleContentChange}
                placeholder={t.topicPlaceholder}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
              />
            </div>

             <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.tone}</label>
              <select
                name="tone"
                value={content.tone}
                onChange={handleContentChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
              >
                <option value="professional">{t.tones.professional}</option>
                <option value="friendly">{t.tones.friendly}</option>
                <option value="urgent">{t.tones.urgent}</option>
                <option value="minimalist">{t.tones.minimalist}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.keyMessage}</label>
              <textarea
                name="keyMessage"
                value={content.keyMessage}
                onChange={handleContentChange}
                rows={3}
                placeholder={t.messagePlaceholder}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
               <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.ctaText}</label>
                <input
                    type="text"
                    name="ctaText"
                    value={content.ctaText}
                    onChange={handleContentChange}
                    placeholder="e.g. Shop Now"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
                />
               </div>
               <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.ctaLink}</label>
                <input
                    type="text"
                    name="ctaLink"
                    value={content.ctaLink}
                    onChange={handleContentChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5]"
                />
               </div>
            </div>
          </div>
        </section>

        {/* Advanced Section */}
        <section className="space-y-4 border-t border-slate-100 pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left text-slate-800 font-semibold pb-2 hover:bg-slate-50 rounded px-1 -ml-1 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <h2>{t.advanced}</h2>
            </div>
            {showAdvanced ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {showAdvanced && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
               <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">{t.customVariables}</label>
                <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                  {t.customVariablesDesc}
                </p>
                <input
                    type="text"
                    name="customVariables"
                    value={content.customVariables || ''}
                    onChange={handleContentChange}
                    placeholder={t.variablePlaceholder}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#27bea5] font-mono text-xs"
                />
               </div>
            </div>
          )}
        </section>
      </div>

      {/* Action Bar */}
      <div className="p-6 bg-slate-50 border-t border-slate-200 sticky bottom-0">
        <button
          onClick={onGenerate}
          disabled={isLoading || !content.campaignTopic}
          className={`
            w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium shadow-lg transition-all
            ${isLoading 
                ? 'bg-[#27bea5]/70 cursor-not-allowed' 
                : 'bg-[#27bea5] hover:bg-[#20a08b] hover:shadow-xl active:transform active:scale-[0.98]'
            }
          `}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              {t.crafting}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {t.generate}
            </>
          )}
        </button>
        {!content.campaignTopic && (
            <p className="text-xs text-center text-red-400 mt-2">{t.missingTopic}</p>
        )}
      </div>
    </div>
  );
};

export default ConfigPanel;