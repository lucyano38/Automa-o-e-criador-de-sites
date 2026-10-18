import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutOwnerSection } from './components/AboutOwnerSection';
import { FocoCompletoDashboard } from './components/FocoCompletoDashboard';
import { ServicesSection } from './components/ServicesSection';
import { ServicePricingBlocks } from './components/ServicePricingBlocks';
import { AutomationBuilder } from './components/AutomationBuilder';
import { AutoVideoEditor } from './components/AutoVideoEditor';
import { PortfolioSection } from './components/PortfolioSection';
import { InsightsSection } from './components/InsightsSection';
import { RoiCalculator } from './components/RoiCalculator';
import { AiDiagnostic } from './components/AiDiagnostic';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TechStack } from './components/TechStack';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { ActiveProspectingRadar } from './components/ActiveProspectingRadar';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('solucoes');
  const WHATSAPP_NUMBER = '5511994411307'; // Configured WhatsApp number for Luciano Tavares Silva (11) 99441-1307

  const handleOpenWhatsAppWithMessage = (customMessage?: string) => {
    const text = customMessage
      ? encodeURIComponent(customMessage)
      : encodeURIComponent('Olá Luciano! Vi seu site e gostaria de conversar sobre um projeto de website, automação ou Instagram.');
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const navTabs = [
    { id: 'solucoes', label: '⚡ Soluções & Serviços', sub: 'Websites, Automação & Instagram' },
    { id: 'painel', label: '📊 Painel Foco em Dados', sub: 'Dashboard de Indicadores & Funil' },
    { id: 'sobre', label: '♿ Sobre Luciano (Titular)', sub: 'História, Superação & Portais' },
    { id: 'insights', label: '💡 Insights & IA', sub: 'Artigos Práticos & Diagnóstico' },
  ];

  return (
    <div className="min-h-screen bg-[#121414] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-300">
      
      {/* Header Navbar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenWhatsApp={() => handleOpenWhatsAppWithMessage()} 
      />

      {/* Main Content Area */}
      <main className="pt-20">
        
        {/* Tab Views Container with Motion AnimatePresence */}
        <AnimatePresence mode="wait">
          {/* Tab 1: Soluções & Serviços (Clean, Direct & High-converting) */}
          {activeTab === 'solucoes' && (
            <motion.div
              key="solucoes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="space-y-4"
            >
              <Hero 
                onOpenWhatsApp={() => handleOpenWhatsAppWithMessage()} 
                setActiveTab={setActiveTab}
              />
              <ActiveProspectingRadar onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <AutoVideoEditor onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <ServicePricingBlocks onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <ServicesSection onOpenWhatsApp={() => handleOpenWhatsAppWithMessage()} />
              <AutomationBuilder onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <PortfolioSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <RoiCalculator onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <TestimonialsSection />
              <TechStack />
              <FaqSection />
              <ContactSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
            </motion.div>
          )}

          {/* Tab: Prospecção Ativa B2B por CNAE & Raio */}
          {activeTab === 'prospeccao' && (
            <motion.div
              key="prospeccao"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="pt-4 space-y-8"
            >
              <ActiveProspectingRadar onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <ContactSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
            </motion.div>
          )}

          {/* Tab 2: Painel Foco em Dados (Full Flagship Dashboard) */}
          {activeTab === 'painel' && (
            <motion.div
              key="painel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="pt-4"
            >
              <FocoCompletoDashboard onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <ContactSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
            </motion.div>
          )}

          {/* Tab 3: Sobre o Titular - Luciano Tavares Silva (Dedicated Tab Page) */}
          {activeTab === 'sobre' && (
            <motion.div
              key="sobre"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="pt-4"
            >
              <AboutOwnerSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
              <ContactSection onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />
            </motion.div>
          )}

          {/* Tab 4: Insights & Diagnóstico IA */}
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

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button & Drawer */}
      <FloatingWhatsApp onOpenWhatsAppWithMessage={handleOpenWhatsAppWithMessage} />

      {/* Floating Back to Top Button */}
      <BackToTop />

    </div>
  );
}


