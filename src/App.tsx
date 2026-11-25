import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutOwnerSection } from './components/AboutOwnerSection';
import { ServicePricingBlocks } from './components/ServicePricingBlocks';
import { PortfolioSection } from './components/PortfolioSection';
import { ShowcaseExamplesSection } from './components/ShowcaseExamplesSection';
import { MockupShowcase } from './components/MockupShowcase';
import { InsightsSection } from './components/InsightsSection';
import { RoiCalculator } from './components/RoiCalculator';
import { AiDiagnostic } from './components/AiDiagnostic';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TechStack } from './components/TechStack';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { IntegratedSiteChatbot } from './components/IntegratedSiteChatbot';
import { BackToTop } from './components/BackToTop';
import { AuthModal } from './components/AuthModal';
import { LoginPage } from './components/LoginPage';
import { PrivateNavbar } from './components/PrivateNavbar';
import { ExecutionDashboard } from './components/ExecutionDashboard';
import { ProspectingScreen } from './components/ProspectingScreen';
import { CrmPipelineScreen } from './components/CrmPipelineScreen';
import { AiContentGeneratorScreen } from './components/AiContentGeneratorScreen';
import { SpreadsheetDataAnalysisScreen } from './components/SpreadsheetDataAnalysisScreen';
import { AiSiteBuilderScreen } from './components/AiSiteBuilderScreen';
import { ProductivityShowcaseScreen } from './components/ProductivityShowcaseScreen';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { VideoEditorPro } from './components/VideoEditorPro';
import { CreatorStudio } from './components/CreatorStudio';
import { useFirebase } from './contexts/FirebaseContext';

export default function App() {
  const { isOwner, user } = useFirebase();
  
  // Client Route State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  
  const [redirectReason, setRedirectReason] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('solucoes');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [checkoutSuccessSession, setCheckoutSuccessSession] = useState<{ sessionId: string; serviceId?: string } | null>(null);
  const [checkoutCancelledNotice, setCheckoutCancelledNotice] = useState<boolean>(false);

  const WHATSAPP_NUMBER = '5511994411307'; // Luciano Tavares Silva (11) 99441-1307

  // Handle Stripe Checkout Redirect Query Params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkoutStatus = urlParams.get('checkout_status') || urlParams.get('checkout');
    const sessionId = urlParams.get('session_id');
    const service = urlParams.get('service');

    if (checkoutStatus === 'success' && sessionId) {
      setCheckoutSuccessSession({ sessionId, serviceId: service || undefined });
      window.history.replaceState({}, '', window.location.pathname);
    } else if (checkoutStatus === 'cancelled' || checkoutStatus === 'cancel') {
      setCheckoutCancelledNotice(true);
      window.history.replaceState({}, '', window.location.pathname);
      const timer = setTimeout(() => setCheckoutCancelledNotice(false), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Sync client router with browser History API (popstate and pushState)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWhatsAppWithMessage = (customMessage?: string) => {
    const text = customMessage
      ? encodeURIComponent(customMessage)
      : encodeURIComponent('Olá Luciano! Vi seu site no Foco em Dados e gostaria de conversar sobre prospecção e soluções digitais.');
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Route Authentication Guard (Middleware)
  const isPrivateRoute = ['/dashboard', '/prospecting', '/crm', '/content', '/data-analysis', '/site-builder', '/vitrine', '/produtividade'].includes(currentPath);

  useEffect(() => {
    if (isPrivateRoute && !isOwner) {
      setRedirectReason('O acesso a esta área é restrito aos membros autorizados do ecossistema Foco em Dados. Faça login para continuar.');
      navigate('/login');
    }
  }, [currentPath, isOwner, isPrivateRoute]);

  // View: Login Page (/login)
  if (currentPath === '/login') {
    return (
      <LoginPage 
        onSuccessRedirect={() => {
          setRedirectReason(null);
          navigate('/dashboard');
        }} 
        onGoHome={() => navigate('/')} 
        redirectReason={redirectReason} 
      />
    );
  }

  // View: Editor Pro (aba aditiva, acessivel a qualquer usuario autenticado)
  if (currentPath === '/editor-pro') {
    if (!user) {
      return (
        <LoginPage
          onSuccessRedirect={() => navigate('/editor-pro')}
          onGoHome={() => navigate('/')}
          redirectReason="Entre com sua conta Google para acessar o Editor Pro."
          hideDirectOwnerLogin
        />
      );
    }
    return (
      <div className="min-h-screen bg-[#0d0f10] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
        <PrivateNavbar currentPath={currentPath} onNavigate={navigate} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <CreatorStudio />
        </main>
      </div>
    );
  }

  // View: Private Ecosystem (when authenticated as owner)
  if (isPrivateRoute && isOwner) {
    return (
      <div className="min-h-screen bg-[#0d0f10] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
        <PrivateNavbar currentPath={currentPath} onNavigate={navigate} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {currentPath === '/dashboard' && (
            <ExecutionDashboard 
              onNavigateToCrm={() => navigate('/crm')}
              onNavigateToProspecting={() => navigate('/prospecting')}
              onNavigateToSiteBuilder={() => navigate('/site-builder')}
              onNavigateToVitrine={() => navigate('/vitrine')}
              onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage}
            />
          )}

          {currentPath === '/site-builder' && (
            <AiSiteBuilderScreen 
              onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage}
            />
          )}

          {(currentPath === '/vitrine' || currentPath === '/produtividade') && (
            <ProductivityShowcaseScreen 
              onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage}
            />
          )}

          {currentPath === '/prospecting' && (
            <ProspectingScreen 
              onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage}
              onNavigateToCrm={() => navigate('/crm')}
            />
          )}

          {currentPath === '/crm' && (
            <CrmPipelineScreen />
          )}

          {currentPath === '/content' && (
            <AiContentGeneratorScreen />
          )}

          {currentPath === '/data-analysis' && (
            <SpreadsheetDataAnalysisScreen />
          )}
        </main>
      </div>
    );
  }

  // View: Public Visitor Landing Page (focoemdados.com.br)
  return (
    <div className="min-h-screen bg-[#0d0f10] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      
      {/* Header Navbar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenWhatsApp={() => handleOpenWhatsAppWithMessage()} 
        onNavigate={navigate}
        isOwner={isOwner}
      />

      {/* Main Content Area */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {/* Main Landing View (Soluções & Presença Digital) */}
          {activeTab === 'solucoes' && (
            <motion.div
              key="solucoes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="space-y-4"
            >
              {/* Hero Showcase with Headline and Actions */}
              <Hero 
                onOpenWhatsApp={() => handleOpenWhatsAppWithMessage()} 
                setActiveTab={setActiveTab}
                onStartNow={() => navigate(isOwner ? '/dashboard' : '/login')}
                onLogin={() => navigate(isOwner ? '/dashboard' : '/login')}
              />

              {/* High-Converting Services & Transparent Pricing Blocks */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <ServicePricingBlocks onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              </motion.div>

              {/* Portfolio & Case Studies Showcase */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <PortfolioSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              </motion.div>

              {/* Showcase Examples for Prospect Clients */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <ShowcaseExamplesSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              </motion.div>

              {/* Concrete Professional Mockup Showcase */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <MockupShowcase onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              </motion.div>

              {/* Story & Biography of the Owner (Luciano Tavares Silva) */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <AboutOwnerSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              </motion.div>

              {/* Interactive ROI Calculator */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <RoiCalculator onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              </motion.div>

              {/* Client Testimonials */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <TestimonialsSection />
              </motion.div>

              {/* Modern Tech Stack */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <TechStack />
              </motion.div>

              {/* Frequently Asked Questions */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <FaqSection />
              </motion.div>

              {/* Direct Contact Form & WhatsApp CTA */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <ContactSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              </motion.div>
            </motion.div>
          )}

          {/* Tab: Sobre o Titular Luciano Tavares Silva */}
          {activeTab === 'sobre' && (
            <motion.div
              key="sobre"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="pt-4 space-y-8"
            >
              <AboutOwnerSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <ContactSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
            </motion.div>
          )}

          {/* Tab: Insights & Diagnóstico IA */}
          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="pt-4 space-y-8"
            >
              <InsightsSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <AiDiagnostic onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <ContactSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Adapted 4-Column Footer with Legal Disclaimer Box */}
      <Footer 
        onNavigate={navigate}
        onOpenAuthModal={() => {
          if (isOwner) {
            navigate('/dashboard');
          } else {
            navigate('/login');
          }
        }} 
        isOwner={isOwner} 
      />

      {/* Integrated AI Assistant Chatbot capable of answering any question about the site */}
      <IntegratedSiteChatbot 
        onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} 
        onNavigateToPlans={() => {
          const el = document.getElementById('servicos-precos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Optional Quick Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => navigate('/dashboard')}
      />

      {/* Stripe Checkout Verified Purchase Modal */}
      {checkoutSuccessSession && (
        <CheckoutSuccessModal
          sessionId={checkoutSuccessSession.sessionId}
          serviceId={checkoutSuccessSession.serviceId}
          onClose={() => setCheckoutSuccessSession(null)}
          onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage}
        />
      )}

      {/* Stripe Cancelled Toast Notification */}
      {checkoutCancelledNotice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-900 border border-white/20 text-slate-200 text-xs font-mono shadow-2xl flex items-center gap-3 animate-fade-in">
          <span>O checkout Stripe foi cancelado. Seus dados estão seguros e você pode retomar a qualquer momento.</span>
          <button 
            onClick={() => setCheckoutCancelledNotice(false)} 
            className="text-cyan-400 font-bold hover:underline cursor-pointer"
          >
            OK
          </button>
        </div>
      )}

    </div>
  );
}
