import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  ShieldCheck, 
  Moon, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown,
  ExternalLink,
  Music2,
  Mail,
  Award,
  Scroll,
  Crown,
  Share2,
  Send,
  HelpCircle
} from 'lucide-react';
import { useTranslation } from './context/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { AudioPlayer } from './components/AudioPlayer';
import { LegalModal } from './components/LegalModal';
import { SeoHead } from './components/SeoHead';

interface FaqItem {
  q: string;
  verse: string;
  a: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'alma' | 'intercesion' | 'pacto'>('alma');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [legalModalOpen, setLegalModalOpen] = useState<boolean>(false);
  const [legalInitialTab, setLegalInitialTab] = useState<'privacy' | 'terms' | 'refunds'>('privacy');
  
  const { t, locale, tKey } = useTranslation();

  const targetAppUrl = `https://godgotyou.app?lang=${locale}`;

  const openLegal = (tab: 'privacy' | 'terms' | 'refunds') => {
    setLegalInitialTab(tab);
    setLegalModalOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqList: FaqItem[] = (t?.faq?.items as FaqItem[]) || [];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#D4B373]/30 selection:text-[#2D4523] flex flex-col justify-between relative font-sans">
      
      {/* Componente de SEO dinámico */}
      <SeoHead />

      {/* 1. NAVEGACIÓN SUPERIOR */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE5DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="GodGotYou Sello" 
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-xs transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span className="font-serif-display text-lg sm:text-2xl font-bold tracking-tight text-[#1A1A1A] leading-none">
                God Got You
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider text-[#5E7153] mt-0.5">
                {tKey('nav.tagline')}
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <a 
              href={targetAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-[#2D4523] hover:bg-[#23371B] text-white text-xs sm:text-sm font-serif-display font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span>{tKey('nav.cta')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4B373]" />
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO PRINCIPAL */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D4B373]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#ECD9C6] text-[#8C6D4F] text-xs font-bold font-serif-display uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D4F]" />
            <span>{tKey('hero.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-[#1A1A1A] leading-[1.18] tracking-tight max-w-4xl mx-auto">
            {tKey('hero.title')}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#4A5568] max-w-2xl mx-auto font-serif-bible italic leading-relaxed">
            {tKey('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a 
              href={targetAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#2D4523] hover:bg-[#1F3018] text-white text-sm sm:text-base font-serif-display font-bold tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>{tKey('hero.primaryCta')}</span>
              <ArrowRight className="w-4 h-4 text-[#D4B373]" />
            </a>

            <a 
              href="#manifiesto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-[#F5F2EB] border border-[#E2DDD5] text-[#2C3E50] text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              <span>{tKey('hero.secondaryCta')}</span>
              <ChevronRight className="w-4 h-4 text-[#5E7153]" />
            </a>
          </div>

          <div className="pt-6 flex items-center justify-center gap-6 text-xs text-[#64748B] flex-wrap">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#5E7153]" />
              <span>{tKey('hero.privacyProof')}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5E7153]" />
              <span>{tKey('hero.availabilityProof')}</span>
            </div>
          </div>
        </div>

        {/* Mockup de la App */}
        <div className="max-w-4xl mx-auto mt-12 sm:mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-3xl p-3 sm:p-5 bg-white border border-[#EAE5DC] shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_25px_70px_rgba(45,69,35,0.12)]">
            <div className="rounded-2xl p-6 sm:p-10 border border-[#E8E1D5] bg-[#FAF9F6] text-left space-y-6 relative">
              <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
                <div className="flex items-center gap-3">
                  <img src="/medallion-master.png" alt="Sello" className="w-10 h-10 object-contain drop-shadow-xs" />
                  <div>
                    <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#1A1A1A]">
                      {tKey('mockup.title')}
                    </h3>
                    <p className="text-[11px] text-[#5E7153] font-sans font-semibold tracking-wider uppercase">
                      {tKey('mockup.verseRef')}
                    </p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D4F] font-bold border border-[#ECD9C6]">
                  {tKey('mockup.badge')}
                </span>
              </div>

              <p className="font-serif-bible italic text-lg sm:text-xl text-[#1A1A1A] leading-relaxed">
                "{tKey('mockup.verseText')}"
              </p>

              <div className="p-4 rounded-xl bg-white border border-[#E8E1D5] text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                <strong className="text-[#2D4523] font-serif-display font-bold block mb-1">
                  {tKey('mockup.heartWordTitle')}
                </strong>
                {tKey('mockup.heartWordDesc')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 MANIFIESTO */}
      <section id="manifiesto" className="py-14 sm:py-20 bg-[#FAF0E6]/50 border-t border-[#EAE5DC] px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ECD9C6] text-[#8C6D4F] text-[11px] font-bold font-serif-display uppercase tracking-widest">
            <Scroll className="w-3.5 h-3.5" />
            <span>{tKey('manifesto.badge')}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif-display font-bold text-[#1A1A1A] leading-snug">
            {tKey('manifesto.title')}<br className="hidden sm:inline" />
            {' '}{tKey('manifesto.titleEnd')}
          </h2>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4B373]/10 rounded-bl-full pointer-events-none" />

            <p className="font-serif-bible text-base sm:text-lg text-[#334155] leading-relaxed">
              <img 
                src="/assets/drop-caps/cap-E.png" 
                alt="E" 
                className="float-left w-14 h-14 sm:w-16 sm:h-16 object-contain mr-3.5 mb-1 select-none pointer-events-none drop-shadow-xs" 
              />
              {tKey('manifesto.textAfterDropCap')}
            </p>

            <div className="mt-6 pt-6 border-t border-[#EAE5DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#64748B]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5E7153]" />
                <span>{tKey('manifesto.freeNote')}</span>
              </div>
              <span className="font-serif-bible italic text-[#8C6D4F]">
                {tKey('manifesto.verseScripture')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOS 3 CAMINOS DE GRACIA */}
      <section id="pilares" className="py-16 sm:py-24 bg-white border-y border-[#EAE5DC] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5E7153] font-serif-display">
              {tKey('paths.badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-display font-bold text-[#1A1A1A]">
              {tKey('paths.title')}
            </h2>
            <p className="text-sm text-[#64748B] font-serif-bible italic">
              {tKey('paths.subtitle')}
            </p>
          </div>

          {/* Selector de Pestañas */}
          <div className="flex items-center justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] shadow-inner gap-1 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => setActiveTab('alma')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-serif-display transition-all cursor-pointer ${
                  activeTab === 'alma'
                    ? 'bg-[#2D4523] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A1A1A]'
                }`}
              >
                {tKey('paths.tab1')}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('intercesion')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-serif-display transition-all cursor-pointer ${
                  activeTab === 'intercesion'
                    ? 'bg-[#2D4523] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A1A1A]'
                }`}
              >
                {tKey('paths.tab2')}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pacto')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-serif-display transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'pacto'
                    ? 'bg-[#2D4523] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A1A1A]'
                }`}
              >
                <span>{tKey('paths.tab3')}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#D4B373]/30 text-[#8C6D28]">
                  PRO
                </span>
              </button>
            </div>
          </div>

          {/* Tarjetas interactivas */}
          <div className="rounded-3xl p-6 sm:p-10 border border-[#E8E1D5] bg-[#FAF9F6] shadow-sm transition-all duration-300">
            
            {/* 1. PARA MI ALMA */}
            {activeTab === 'alma' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <img src="/assets/drop-caps/cap-L.png" alt="L" className="w-12 h-12 object-contain" />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A]">
                        {tKey('paths.alma.title')}
                      </h3>
                      <span className="text-xs text-[#5E7153] font-semibold">
                        {tKey('paths.alma.subtitle')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {tKey('paths.alma.desc')}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#2C3E50]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span><strong>{tKey('paths.alma.f1Title')}</strong> {tKey('paths.alma.f1Desc')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span><strong>{tKey('paths.alma.f2Title')}</strong> {tKey('paths.alma.f2Desc')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span><strong>{tKey('paths.alma.f3Title')}</strong> {tKey('paths.alma.f3Desc')}</span>
                    </li>
                  </ul>
                </div>

                {/* Lienzo Lino Esencial */}
                <div 
                  className="relative rounded-2xl overflow-hidden border border-[#E2DDD5] shadow-lg max-w-xs mx-auto aspect-[9/16] flex flex-col justify-center px-7 py-16 bg-cover bg-center" 
                  style={{ backgroundImage: "url('/story-bg-free-light.png')" }}
                >
                  <div className="my-auto text-center space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#8C6D4F] font-serif-display block font-bold">
                      ✦ {tKey('canvas.lightBadge')} ✦
                    </span>
                    <p className="font-serif-bible italic text-xs sm:text-sm text-[#2C3E50] leading-relaxed">
                      "{tKey('canvas.lightVerse')}"
                    </p>
                    <span className="text-[11px] font-sans text-[#5E7153] font-semibold block">
                      — {tKey('canvas.lightRef')} —
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. INTERCEDER POR ALGUIEN */}
            {activeTab === 'intercesion' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <img src="/assets/drop-caps/cap-P.png" alt="P" className="w-12 h-12 object-contain" />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A]">
                        {tKey('paths.intercession.title')}
                      </h3>
                      <span className="text-xs text-[#5E7153] font-semibold">
                        {tKey('paths.intercession.subtitle')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {tKey('paths.intercession.desc')}
                  </p>
                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] flex items-start gap-3">
                      <Send className="w-4 h-4 text-[#2D4523] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                          {tKey('paths.intercession.c1Title')}
                        </strong>
                        <p className="text-[11px] text-[#64748B] leading-relaxed">
                          {tKey('paths.intercession.c1Desc')}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] flex items-start gap-3">
                      <Share2 className="w-4 h-4 text-[#D4B373] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                          {tKey('paths.intercession.c2Title')}
                        </strong>
                        <p className="text-[11px] text-[#64748B] leading-relaxed">
                          {tKey('paths.intercession.c2Desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lienzo Oro y Ceniza */}
                <div 
                  className="relative rounded-2xl overflow-hidden border border-[#D4B373]/60 shadow-xl max-w-xs mx-auto aspect-[9/16] flex flex-col justify-center px-7 py-16 bg-cover bg-center text-white" 
                  style={{ backgroundImage: "url('/story-bg-oro-ceniza.png')" }}
                >
                  <div className="my-auto text-center space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4B373] font-serif-display block font-bold">
                      ✦ {tKey('canvas.goldBadge')} ✦
                    </span>
                    <p className="font-serif-bible italic text-xs sm:text-sm text-[#F1F5F9] leading-relaxed">
                      "{tKey('canvas.goldVerse')}"
                    </p>
                    <span className="text-[11px] font-sans text-[#D4B373] font-semibold block">
                      — {tKey('canvas.goldRef')} —
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ESPACIO COMPARTIDO */}
            {activeTab === 'pacto' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <img src="/assets/drop-caps/cap-A.png" alt="A" className="w-12 h-12 object-contain" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A]">
                          {tKey('paths.covenant.title')}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold bg-[#D4B373]/20 text-[#8C6D28] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          <Crown className="w-3 h-3 text-[#D4B373]" /> PRO
                        </span>
                      </div>
                      <span className="text-xs text-[#5E7153] font-semibold">
                        {tKey('paths.covenant.subtitle')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {tKey('paths.covenant.desc')}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#2C3E50]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span><strong>{tKey('paths.covenant.f1Title')}</strong> {tKey('paths.covenant.f1Desc')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span><strong>{tKey('paths.covenant.f2Title')}</strong> {tKey('paths.covenant.f2Desc')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span><strong>{tKey('paths.covenant.f3Title')}</strong> {tKey('paths.covenant.f3Desc')}</span>
                    </li>
                  </ul>
                </div>

                {/* Lienzo Olivo */}
                <div 
                  className="relative rounded-2xl overflow-hidden border border-[#D4B373] shadow-2xl max-w-xs mx-auto aspect-[9/16] flex flex-col justify-center px-7 py-16 bg-cover bg-center text-white" 
                  style={{ backgroundImage: "url('/story-bg-olivo.png')" }}
                >
                  <div className="my-auto text-center space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4B373] font-serif-display block font-bold">
                      ✦ {tKey('canvas.oliveBadge')} ✦
                    </span>
                    <p className="font-serif-bible italic text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
                      "{tKey('canvas.oliveVerse')}"
                    </p>
                    <span className="text-[11px] font-sans text-[#D4B373] font-semibold block">
                      — {tKey('canvas.oliveRef')} —
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3.5 MATICES LITÚRGICOS PARA COMPARTIR */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C6D4F] font-serif-display">
              {tKey('gallery.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1A1A1A]">
              {tKey('gallery.title')}
            </h2>
            <p className="text-sm text-[#64748B] font-serif-bible italic">
              {tKey('gallery.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden border border-[#E8E1D5] bg-white shadow-xs group hover:shadow-md transition-all">
              <div className="aspect-[9/14] bg-cover bg-center" style={{ backgroundImage: "url('/story-bg-free-light.png')" }} />
              <div className="p-3 text-center">
                <span className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                  {tKey('gallery.linenTitle')}
                </span>
                <span className="text-[10px] text-[#5E7153] font-semibold">
                  {tKey('gallery.linenTag')}
                </span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#ECD9C6] bg-white shadow-xs group hover:shadow-md transition-all ring-1 ring-[#D4B373]/30">
              <div className="aspect-[9/14] bg-cover bg-center" style={{ backgroundImage: "url('/story-bg-pergamino.png')" }} />
              <div className="p-3 text-center">
                <span className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                  {tKey('gallery.parchmentTitle')}
                </span>
                <span className="text-[10px] text-[#8C6D28] font-bold">Refugio PRO</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#2D4523]/30 bg-white shadow-xs group hover:shadow-md transition-all ring-1 ring-[#2D4523]/30">
              <div className="aspect-[9/14] bg-cover bg-center" style={{ backgroundImage: "url('/story-bg-olivo.png')" }} />
              <div className="p-3 text-center">
                <span className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                  {tKey('gallery.oliveTitle')}
                </span>
                <span className="text-[10px] text-[#8C6D28] font-bold">Refugio PRO</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-black/40 bg-white shadow-xs group hover:shadow-md transition-all ring-1 ring-[#D4B373]/40">
              <div className="aspect-[9/14] bg-cover bg-center" style={{ backgroundImage: "url('/story-bg-oro-ceniza.png')" }} />
              <div className="p-3 text-center">
                <span className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                  {tKey('gallery.goldTitle')}
                </span>
                <span className="text-[10px] text-[#8C6D28] font-bold">Refugio PRO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEFENSE INSTITUCIONAL Y DOCTRINAL (12 FAQS) */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 bg-white border-t border-[#EAE5DC]">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D4F] text-[11px] font-bold font-serif-display uppercase tracking-widest border border-[#ECD9C6]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{tKey('faq.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1A1A1A]">
              {tKey('faq.title')}
            </h2>
            <p className="text-sm text-[#64748B] font-serif-bible italic">
              {tKey('faq.subtitle')}
            </p>
          </div>

          <div className="space-y-3">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-[#EAE5DC] bg-[#FAF9F6] overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/60 transition"
                  >
                    <span className="font-serif-display font-bold text-sm sm:text-base text-[#1A1A1A]">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#5E7153] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 space-y-3 text-xs sm:text-sm text-[#4A5568] border-t border-[#EAE5DC]/60 animate-in fade-in duration-200">
                      <div className="p-3 rounded-xl bg-white border border-[#E8E1D5] text-[#2D4523] font-serif-bible italic text-xs">
                        <strong>{tKey('faq.foundationLabel')}</strong> {faq.verse}
                      </div>
                      <p className="leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. CARACTERÍSTICAS DISTINTIVAS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF8F5] border-t border-[#EAE5DC]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1A1A1A]">
              {tKey('features.title')}
            </h2>
            <p className="text-sm text-[#64748B] font-serif-bible italic">
              {tKey('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left space-y-3 hover:border-[#D4B373]/50 transition-all">
              <div className="p-2.5 rounded-xl bg-[#FAF0E6] text-[#8C6D4F] w-fit">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display font-bold text-lg text-[#1A1A1A]">
                {tKey('features.f1Title')}
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                {tKey('features.f1Desc')}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left space-y-3 hover:border-[#5E7153]/50 transition-all">
              <div className="p-2.5 rounded-xl bg-[#5E7153]/15 text-[#2D4523] w-fit">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display font-bold text-lg text-[#1A1A1A]">
                {tKey('features.f2Title')}
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                {tKey('features.f2Desc')}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left space-y-3 hover:border-[#5E7153]/50 transition-all">
              <div className="p-2.5 rounded-xl bg-[#5E7153]/15 text-[#2D4523] w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display font-bold text-lg text-[#1A1A1A]">
                {tKey('features.f3Title')}
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                {tKey('features.f3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LLAMADO FINAL */}
      <section className="py-16 sm:py-20 bg-[#2D4523] text-white px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <img src="/logo.png" alt="GodGotYou" className="w-14 h-14 object-contain mx-auto brightness-110 drop-shadow-md" />
          
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#F8F9FA] max-w-xl mx-auto leading-tight">
            {tKey('finalCta.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#DCE6D9] font-serif-bible italic max-w-lg mx-auto">
            {tKey('finalCta.subtitle')}
          </p>

          <div className="pt-2">
            <a 
              href={targetAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#D4B373] hover:bg-[#C5A361] text-[#0E1113] text-sm font-serif-display font-bold tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <span>{tKey('finalCta.button')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. PIE DE PÁGINA */}
      <footer className="bg-white border-t border-[#EAE5DC] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-serif-display font-bold text-base text-[#1A1A1A]">God Got You</span>
              <span className="text-[11px] text-[#64748B]">· godgotyou.app</span>
            </div>
            <p className="text-xs text-[#718096] font-serif-bible italic">
              {tKey('footer.verse')}
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-[#64748B] flex-wrap">
            <button 
              type="button" 
              onClick={() => openLegal('privacy')}
              className="hover:text-[#2D4523] underline underline-offset-4 cursor-pointer"
            >
              {tKey('footer.privacy')}
            </button>
            <button 
              type="button" 
              onClick={() => openLegal('terms')}
              className="hover:text-[#2D4523] underline underline-offset-4 cursor-pointer"
            >
              {tKey('footer.terms')}
            </button>
            <button 
              type="button" 
              onClick={() => openLegal('refunds')}
              className="hover:text-[#2D4523] underline underline-offset-4 cursor-pointer"
            >
              {tKey('footer.refunds')}
            </button>
          </div>

          <div className="flex items-center justify-center gap-3">
            <a 
              href="mailto:contacto@godgotyou.app"
              className="p-2.5 rounded-xl border border-[#EAE5DC] text-[#4A5568] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] transition"
              title="Contacto"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com/godgotyou.app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[#EAE5DC] text-[#C13584] hover:bg-[#FAF8F5] transition flex items-center justify-center"
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a 
              href="https://tiktok.com/@godgotyou.app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[#EAE5DC] text-[#1A1A1A] hover:bg-[#FAF8F5] transition"
              title="TikTok"
            >
              <Music2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* 8. MODAL LEGAL OFICIAL PADDLE */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        language={locale}
        initialTab={legalInitialTab}
      />

      {/* 9. REPRODUCTOR CONTEMPLATIVO FLOTANTE */}
      <AudioPlayer />

    </div>
  );
}