import React, { useState, useEffect } from 'react';
import ConfigPanel from './components/ConfigPanel';
import PreviewPanel from './components/PreviewPanel';
import { BrandConfig, ContentConfig, GeneratedTemplate, AppState, AppLanguage } from './types';
import { generateEmailTemplate } from './services/geminiService';
import { subscribeToNewsletter } from './services/marketingService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [template, setTemplate] = useState<GeneratedTemplate | null>(null);
  
  // Language State
  const [appLanguage, setAppLanguage] = useState<AppLanguage>('en');
  
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
    fontFamily: 'Arial, Helvetica, sans-serif'
  });

  const [content, setContent] = useState<ContentConfig>({
    language: 'en',
    campaignTopic: '',
    keyMessage: '',
    audience: '',
    ctaText: 'Get Started',
    ctaLink: '#',
    tone: 'professional',
    customVariables: ''
  });

  // Lifted state for Advanced panel to trigger resize observer
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Auto-resize logic for Iframe Embedding
  useEffect(() => {
    const sendHeight = () => {
      // Only send message if we are inside an iframe
      if (window.self !== window.top) {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage({ type: 'mailcraft-resize', height }, '*');
      }
    };

    // Observe DOM changes
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);
    
    // Also listen for window resizing
    window.addEventListener('resize', sendHeight);
    
    // Initial send
    sendHeight();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sendHeight);
    };
  }, [appState, template, isUnlocked, showAdvanced]); 

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
        // Send to Brevo/Marketing Platform
        await subscribeToNewsletter(email);
        
        // Unlock content regardless of subscription success (optional UX choice)
        // or strictly require success: if (success) { ... }
        setIsUnlocked(true);
    } catch (error) {
        console.error("Subscription error", error);
        // Fallback: unlock anyway so user isn't stuck?
        setIsUnlocked(true);
    } finally {
        setIsSubmittingEmail(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full min-h-[600px] flex-1 bg-slate-50 overflow-hidden">
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