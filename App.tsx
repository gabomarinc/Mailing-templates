
import React, { useState, useEffect } from 'react';
import ConfigPanel from './components/ConfigPanel';
import PreviewPanel from './components/PreviewPanel';
import TemplateSelector from './components/TemplateSelector';
import { BrandConfig, ContentConfig, GeneratedTemplate, AppState, AppLanguage, TemplateId } from './types';
import { generateEmailTemplate } from './services/geminiService';
import { subscribeToNewsletter } from './services/marketingService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [template, setTemplate] = useState<GeneratedTemplate | null>(null);
  
  // Language State
  const [appLanguage, setAppLanguage] = useState<AppLanguage>('en');
  
  // Selection State
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId | null>(null);

  // Lead Capture State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  const [brand, setBrand] = useState<BrandConfig>({
    brandName: '',
    logoUrl: '',
    primaryColor: '#27bea5', 
    secondaryColor: '#017b46', 
    backgroundColor: '#f5f7fb', 
    websiteUrl: '',
    privacyPolicyUrl: '', // Initialized empty
    fontFamily: 'Arial, Helvetica, sans-serif'
  });

  const [content, setContent] = useState<ContentConfig>({
    language: 'en',
    templateId: 'modern', // default
    campaignTopic: '',
    keyMessage: '',
    audience: '',
    ctaText: 'Get Started',
    ctaLink: '#',
    tone: 'professional',
    customVariables: '',
    generateImage: false, // Default false
    imagePrompt: ''
  });

  // Lifted state for Advanced panel to trigger resize observer
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Auto-resize logic for Iframe Embedding
  useEffect(() => {
    const sendHeight = () => {
      // Only send message if we are inside an iframe
      if (window.self !== window.top) {
        const height = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
        );
        window.parent.postMessage({ type: 'mailcraft-resize', height }, '*');
      }
    };

    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);
    window.addEventListener('resize', sendHeight);
    setTimeout(sendHeight, 100);
    sendHeight();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sendHeight);
    };
  }, [appState, template, isUnlocked, showAdvanced, selectedTemplateId]); 

  const handleTemplateSelect = (id: TemplateId) => {
    setSelectedTemplateId(id);
    setContent(prev => ({ ...prev, templateId: id }));
  };

  const handleBackToTemplates = () => {
    setSelectedTemplateId(null);
    setTemplate(null);
    setAppState(AppState.IDLE);
  };

  const handleGenerate = async () => {
    if (!content.campaignTopic) return;

    setAppState(AppState.GENERATING);
    try {
      const result = await generateEmailTemplate(brand, content);
      setTemplate(result);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      setAppState(AppState.ERROR);
      console.error(error);
    }
  };

  const handleUnlock = async (email: string) => {
    setIsSubmittingEmail(true);
    try {
        await subscribeToNewsletter(email);
        setIsUnlocked(true);
    } catch (error) {
        console.error("Subscription error", error);
        setIsUnlocked(true);
    } finally {
        setIsSubmittingEmail(false);
    }
  };

  // If no template is selected, show the selector
  if (!selectedTemplateId) {
    return (
      <div className="w-full min-h-screen bg-slate-50 font-sans wrapper-satoshi">
        <TemplateSelector 
            onSelect={handleTemplateSelect} 
            appLanguage={appLanguage}
            setAppLanguage={setAppLanguage}
        />
      </div>
    );
  }

  // Otherwise show the editor
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-slate-50">
       <div className="font-sans w-full flex flex-col lg:flex-row flex-1">
          <div className="wrapper-satoshi w-full flex flex-col lg:flex-row flex-1">
            <ConfigPanel
                brand={brand}
                setBrand={setBrand}
                content={content}
                setContent={setContent}
                onGenerate={handleGenerate}
                appState={appState}
                appLanguage={appLanguage}
                setAppLanguage={setAppLanguage}
                showAdvanced={showAdvanced}
                setShowAdvanced={setShowAdvanced}
                onBackToTemplates={handleBackToTemplates}
            />
            <PreviewPanel
                template={template}
                appState={appState}
                isUnlocked={isUnlocked}
                isSubmitting={isSubmittingEmail}
                onUnlock={handleUnlock}
                appLanguage={appLanguage}
            />
          </div>
      </div>
    </div>
  );
};

export default App;
