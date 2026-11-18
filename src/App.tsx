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
  HelpCircle,
  Shield,
  Users,
  Compass
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

const FREEDOM_LANDING_COPY = {
  es: {
    tabLabel: 'Pacto de Libertad',
    badgeNew: 'GRATIS',
    title: 'Pacto de Libertad para Batallas Ocultas',
    subtitle: 'Pureza, lealtad del corazón y respaldo anónimo 1 a 1 sin vigilancia invasiva.',
    desc: 'Un santuario silencioso y discreto para las luchas de las que nadie habla en voz alta: pornografía, tentación de infidelidad emocional o digital, ruido compulsivo, insomnio e ira en casa. Sin correos ni software espía; solo herramientas bíblicas prácticas para cortar el impulso.',
    f1Title: '5 Rutas de Batalla Real:',
    f1Desc: 'Pureza Visual, Lealtad del Corazón (infidelidad), Ruido Digital, Calma Nocturna y Mansedumbre.',
    f2Title: 'Protocolo de Acción Inmediata:',
    f2Desc: '3 pasos silenciosos y prácticos para frenar la ola química en el momento exacto de la tentación.',
    f3Title: 'Aliado 1 a 1 sin Espionaje:',
    f3Desc: 'Vincula a un amigo o mentor con un código temporal de 24h para pedir oración en silencio.',
    cardHeader: 'PACTO DE LIBERTAD · 02:14 AM',
    cardAlias: 'Alias Anónimo: Faro-418 · 93% Consistencia',
    cardQuote: '«Sobre toda cosa guardada, guarda tu corazón. Deja el teléfono fuera de la habitación 10 minutos y envía un aviso silencioso de oración sin dar explicaciones.»',
    cardBtn: 'Pedir oración silenciosa a mi aliado',
  },
  en: {
    tabLabel: 'Freedom Pact',
    badgeNew: 'FREE',
    title: 'Freedom Pact for Hidden Battles',
    subtitle: 'Purity, heart loyalty, and anonymous 1-on-1 backing without invasive spying.',
    desc: 'A quiet, discreet sanctuary built for the battles few dare to speak aloud: pornography, emotional or digital infidelity temptation, digital noise, midnight anxiety, and anger at home. No emails or screen-spying agents—just practical biblical steps to break the urge.',
    f1Title: '5 Real Battle Paths:',
    f1Desc: 'Visual Purity, Heart Loyalty (infidelity), Digital Noise, Night Calm, and Meekness Before Anger.',
    f2Title: 'Immediate Action Protocol:',
    f2Desc: '3 quiet, practical steps to ride out the dopamine wave the moment temptation strikes.',
    f3Title: '1-on-1 Ally Without Spying:',
    f3Desc: 'Link a trusted friend or mentor via a 24h invite code to send silent prayer requests.',
    cardHeader: 'FREEDOM PACT · 02:14 AM',
    cardAlias: 'Anonymous Alias: Beacon-418 · 93% Consistency',
    cardQuote: '“Above all else, guard your heart. Set your phone outside the bedroom for 10 minutes and send a silent prayer notice—no awkward explanations needed.”',
    cardBtn: 'Send silent prayer notice to ally',
  },
  pt: {
    tabLabel: 'Pacto de Liberdade',
    badgeNew: 'GRÁTIS',
    title: 'Pacto de Liberdade para Batalhas Ocultas',
    subtitle: 'Pureza, lealdade do coração e apoio anônimo 1 a 1 sem vigilância invasiva.',
    desc: 'Um santuário silencioso e discreto para lutas íntimas de que quase ninguém fala: pornografia, tentação de infidelidade emocional ou digital, ruído digital, insônia e raiva em casa. Sem e-mail nem captura de tela.',
    f1Title: '5 Trilhas de Batalha Real:',
    f1Desc: 'Pureza Visual, Lealdade do Coração (infidelidade), Ruído Digital, Calma Noturna e Mansidão.',
    f2Title: 'Protocolo de Ação Imediata:',
    f2Desc: '3 passos silenciosos e práticos para cortar o impulso no momento exato da tentação.',
    f3Title: 'Aliado 1 a 1 sem Espionagem:',
    f3Desc: 'Vincule um amigo ou mentor com código temporário de 24h para pedir oração em silêncio.',
    cardHeader: 'PACTO DE LIBERDADE · 02:14 AM',
    cardAlias: 'Apelido Anônimo: Farol-418 · 93% Consistência',
    cardQuote: '«Sobre tudo o que se deve guardar, guarda o teu coração. Deixe o celular fora do quarto por 10 minutos e envie um aviso silencioso de oração.»',
    cardBtn: 'Pedir oração silenciosa ao aliado',
  },
  fr: {
    tabLabel: 'Pacte de Liberté',
    badgeNew: 'GRATUIT',
    title: 'Pacte de Liberté pour les Combats Cachés',
    subtitle: 'Pureté, loyauté du cœur et soutien anonyme 1 à 1 sans surveillance intrusive.',
    desc: 'Un sanctuaire silencieux et discret pour les batailles intérieures dont on ose rarement parler : pornographie, tentation d’infidélité émotionnelle ou numérique, bruit numérique, insomnie et colère. Zéro espionnage d’écran.',
    f1Title: '5 Parcours de Combat Réel :',
    f1Desc: 'Pureté Visuelle, Loyauté du Cœur (infidélité), Bruit Numérique, Calme Nocturne et Douceur.',
    f2Title: 'Protocole d’Action Immédiate :',
    f2Desc: '3 gestes silencieux et concrets pour briser l’impulsion dès qu’elle surgit.',
    f3Title: 'Allié 1 à 1 sans Espionnage :',
    f3Desc: 'Reliez un ami ou mentor via un code de 24h pour demander la prière en silence.',
    cardHeader: 'PACTE DE LIBERTÉ · 02:14 AM',
    cardAlias: 'Alias Anonyme : Phare-418 · 93% Constance',
    cardQuote: '« Garde ton cœur plus que toute autre chose. Pose ton téléphone hors de la chambre pendant 10 minutes et envoie un signal silencieux de prière. »',
    cardBtn: 'Demander la prière en silence',
  },
};

const EXTRA_FREEDOM_FAQS: Record<'es' | 'en' | 'pt' | 'fr', FaqItem[]> = {
  es: [
    {
      q: '¿Qué es «Pacto de Libertad» y qué batallas ocultas aborda?',
      verse: '1 Corintios 10:13 · Proverbios 4:23 — «Sobre toda cosa guardada, guarda tu corazón»',
      a: 'Es un espacio discreto, silencioso y libre de culpa diseñado para las luchas íntimas que rara vez se hablan en voz alta: Pureza Visual y Sexual (pornografía), Lealtad e Integridad del Corazón (frenar chats secretos, vínculos emocionales ocultos o tentación de infidelidad), Ruido Digital, Calma Nocturna e Insomnio, y Mansedumbre antes de la Ira. Incluye un protocolo de acción inmediata de 3 pasos, rutas guiadas de 7 días y registro de consistencia sin culpa.',
    },
    {
      q: '¿Cómo funciona el Aliado de Pacto (1 a 1) sin vigilancia invasiva?',
      verse: 'Gálatas 6:2 · Eclesiastés 4:9-10 — «Mejores son dos que uno... porque si cayeren, el uno levantará a su compañero»',
      a: 'A diferencia de aplicaciones costosas que toman capturas de tu pantalla o instalan agentes espía, God Got You parte de la gracia y la confianza: vinculas a un amigo o mentor mediante un alias anónimo y un código temporal de 24 horas. Nadie lee tus notas ni ve tu pantalla; solo puedes enviar un aviso silencioso de oración cuando atraviesas un momento difícil y desvincular el pacto en un toque.',
    },
  ],
  en: [
    {
      q: 'What is «Freedom Pact» and which hidden battles does it address?',
      verse: '1 Corinthians 10:13 · Proverbs 4:23 — “Above all else, guard your heart”',
      a: 'It is a discreet, quiet, shame-free sanctuary built for the hidden struggles rarely discussed aloud: Visual & Sexual Purity (pornography), Heart Loyalty & Marriage Integrity (stopping secret chats, hidden emotional bonds, or infidelity temptation), Digital Noise, Night Calm, and Meekness Before Anger. It includes a 3-step immediate action protocol, 7-day guided paths, and shame-free consistency tracking.',
    },
    {
      q: 'How does the 1-on-1 Pact Ally work without invasive surveillance?',
      verse: 'Galatians 6:2 · Ecclesiastes 4:9-10 — “Two are better than one... if either falls, one can help the other up”',
      a: 'Unlike costly apps that take screenshots of your phone or install monitoring agents, God Got You is rooted in trust and grace: you link a trusted friend or mentor using anonymous aliases and a 24-hour invite code. Nobody reads your private notes or spies on your screen—you simply send a silent prayer notice when facing a tough moment and can unlink anytime.',
    },
  ],
  pt: [
    {
      q: 'O que é o «Pacto de Liberdade» e quais batalhas ocultas ele aborda?',
      verse: '1 Coríntios 10:13 · Provérbios 4:23 — «Sobre tudo o que se deve guardar, guarda o teu coração»',
      a: 'É um espaço discreto, silencioso e livre de culpa criado para lutas íntimas raramente faladas em voz alta: Pureza Visual e Sexual (pornografia), Lealdade e Integridade do Coração (frear conversas secretas, vínculos emocionais ocultos ou tentação de infidelidade), Ruído Digital, Calma Noturna e Mansidão antes da Ira. Inclui protocolo de ação imediata em 3 passos, trilhas de 7 dias e consistência sem culpa.',
    },
    {
      q: 'Como funciona o Aliado de Pacto (1 a 1) sem vigilância invasiva?',
      verse: 'Gálatas 6:2 · Eclesiastes 4:9-10 — «Melhor é serem dois do que um... se um cair, o outro levanta o seu companheiro»',
      a: 'Diferente de aplicativos caros que tiram capturas da sua tela, o God Got You parte da confiança e da graça: você vincula um amigo ou mentor usando apelidos anônimos e um código temporário de 24h. Ninguém lê suas notas nem espiona seu celular; você apenas envia um aviso silencioso de oração quando precisa de cobertura.',
    },
  ],
  fr: [
    {
      q: 'Qu’est-ce que le « Pacte de Liberté » et quels combats cachés aborde-t-il ?',
      verse: '1 Corinthiens 10:13 · Proverbes 4:23 — « Garde ton cœur plus que toute autre chose »',
      a: 'C’est un espace discret, silencieux et sans culpabilité conçu pour les batailles intérieures dont on ose rarement parler : Pureté Visuelle et Sexuelle (pornographie), Loyauté et Intégrité du Cœur (freiner les discussions secrètes, liens émotionnels cachés ou tentations d’infidélité), Bruit Numérique, Calme Nocturne et Douceur avant la Colère. Il comprend un protocole d’action immédiate en 3 étapes et des parcours de 7 jours.',
    },
    {
      q: 'Comment fonctionne l’Allié de Pacte (1 à 1) sans surveillance intrusive ?',
      verse: 'Galates 6:2 · Ecclésiaste 4:9-10 — « Deux valent mieux qu’un... car s’ils tombent, l’un relève son compagnon »',
      a: 'Contrairement aux applications coûteuses qui font des captures d’écran de votre téléphone, God Got You repose sur la confiance et la grâce : vous reliez un ami ou mentor via des alias anonymes et un code de 24h. Personne ne lit vos notes ni n’espionne votre écran : vous envoyez simplement une demande silencieuse de prière en cas de combat.',
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'alma' | 'libertad' | 'intercesion' | 'pacto'>('alma');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [legalModalOpen, setLegalModalOpen] = useState<boolean>(false);
  const [legalInitialTab, setLegalInitialTab] = useState<'privacy' | 'terms' | 'refunds'>('privacy');
  
  const { t, locale, tKey } = useTranslation();

  const safeLocale = (locale === 'en' || locale === 'pt' || locale === 'fr') ? locale : 'es';
  const targetAppUrl = `https://godgotyou.app?lang=${safeLocale}`;
  const freedomCopy = FREEDOM_LANDING_COPY[safeLocale];

  const openLegal = (tab: 'privacy' | 'terms' | 'refunds') => {
    setLegalInitialTab(tab);
    setLegalModalOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const baseFaqList: FaqItem[] = (t?.faq?.items as FaqItem[]) || [];
  const faqList: FaqItem[] = [
    ...EXTRA_FREEDOM_FAQS[safeLocale],
    ...baseFaqList,
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#D4B373]/30 selection:text-[#2D4523] flex flex-col justify-between relative font-sans">
      
      {/* Componente de SEO dinámico */}
      <SeoHead />

      {/* 1. NAVEGACIÓN SUPERIOR */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <img 
              src="/logo.png" 
              alt="GodGotYou Sello" 
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-xs transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span className="font-serif-display text-lg sm:text-2xl font-bold tracking-tight text-[#1A1A1A] leading-none">
                God Got You
              </span>
              <span className="hidden sm:block text-[11px] font-sans font-semibold tracking-wider text-[#5E7153] mt-0.5">
                {tKey('nav.tagline')}
              </span>
            </div>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            <a 
              href={targetAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-2xl bg-[#2D4523] hover:bg-[#23371B] text-white text-xs sm:text-sm font-serif-display font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-98 cursor-pointer"
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

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-[#1A1A1A] leading-[1.16] tracking-tight max-w-4xl mx-auto">
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
              href="#pilares"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-[#F5F2EB] border border-[#E2DDD5] text-[#2C3E50] text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              <span>{tKey('hero.secondaryCta')}</span>
              <ChevronRight className="w-4 h-4 text-[#5E7153]" />
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4 sm:gap-6 text-xs text-[#64748B] flex-wrap">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#5E7153]" />
              <span>{tKey('hero.privacyProof')}</span>
            </div>
            <span className="hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5E7153]" />
              <span>{tKey('hero.availabilityProof')}</span>
            </div>
          </div>
        </div>

        {/* Mockup Editorial de la App */}
        <div className="max-w-4xl mx-auto mt-12 sm:mt-16 relative">
          <div className="rounded-3xl p-3 sm:p-5 bg-white border border-[#EAE5DC] shadow-[0_20px_60px_rgba(0,0,0,0.07)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_25px_70px_rgba(45,69,35,0.12)]">
            <div className="rounded-2xl p-6 sm:p-10 border border-[#E8E1D5] bg-[#FAF9F6] text-left space-y-6 relative">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE5DC] pb-4">
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

          <div className="p-7 sm:p-12 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left relative overflow-hidden">
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

      {/* 3. LOS 4 CAMINOS DE GRACIA Y LIBERTAD */}
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

          {/* Selector de 4 Pestañas */}
          <div className="flex items-center justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] shadow-inner gap-1.5 flex-wrap justify-center">
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
                onClick={() => setActiveTab('libertad')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-serif-display transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'libertad'
                    ? 'bg-[#2D4523] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A1A1A]'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-[#D4B373]" />
                <span>{freedomCopy.tabLabel}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-[#5E7153]/20 text-[#2D4523]">
                  {freedomCopy.badgeNew}
                </span>
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
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-[#D4B373]/30 text-[#8C6D28]">
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
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{tKey('paths.alma.f1Title')}</strong> {tKey('paths.alma.f1Desc')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{tKey('paths.alma.f2Title')}</strong> {tKey('paths.alma.f2Desc')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
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

            {/* 2. PACTO DE LIBERTAD (5 BATALLAS OCULTAS + PROTOCOLO SILENCIOSO) */}
            {activeTab === 'libertad' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#2D4523] text-[#D4B373] flex items-center justify-center shrink-0 shadow-xs">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A]">
                        {freedomCopy.title}
                      </h3>
                      <span className="text-xs text-[#5E7153] font-semibold">
                        {freedomCopy.subtitle}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {freedomCopy.desc}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#2C3E50]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{freedomCopy.f1Title}</strong> {freedomCopy.f1Desc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{freedomCopy.f2Title}</strong> {freedomCopy.f2Desc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{freedomCopy.f3Title}</strong> {freedomCopy.f3Desc}</span>
                    </li>
                  </ul>
                </div>

                {/* Tarjeta Vista Previa Modo Nocturno Discreto */}
                <div className="rounded-3xl p-6 bg-[#121619] border-2 border-[#D4B373]/40 text-[#F0EBE1] shadow-2xl max-w-sm mx-auto space-y-5 text-left">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#D4B373]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4B373]">
                        {freedomCopy.cardHeader}
                      </span>
                    </div>
                    <Lock className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-[#D4B373] block">
                      {freedomCopy.cardAlias}
                    </span>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="w-[93%] h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>

                  <p className="font-serif-bible italic text-xs sm:text-sm text-[#E3DDD3] leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                    {freedomCopy.cardQuote}
                  </p>

                  <a
                    href={targetAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#D4B373] text-[#0E1113] font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{freedomCopy.cardBtn}</span>
                  </a>
                </div>
              </div>
            )}

            {/* 3. INTERCEDER POR ALGUIEN */}
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

            {/* 4. PACTO DE PAZ (PRO) */}
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
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{tKey('paths.covenant.f1Title')}</strong> {tKey('paths.covenant.f1Desc')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{tKey('paths.covenant.f2Title')}</strong> {tKey('paths.covenant.f2Desc')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            <div className="rounded-2xl overflow-hidden border border-[#E8E1D5] bg-white shadow-xs group hover:shadow-md transition-all">
              <div className="aspect-[9/13] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]" style={{ backgroundImage: "url('/story-bg-free-light.png')" }} />
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
              <div className="aspect-[9/13] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]" style={{ backgroundImage: "url('/story-bg-pergamino.png')" }} />
              <div className="p-3 text-center">
                <span className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                  {tKey('gallery.parchmentTitle')}
                </span>
                <span className="text-[10px] text-[#8C6D28] font-bold">Refugio PRO</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#2D4523]/30 bg-white shadow-xs group hover:shadow-md transition-all ring-1 ring-[#2D4523]/30">
              <div className="aspect-[9/13] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]" style={{ backgroundImage: "url('/story-bg-olivo.png')" }} />
              <div className="p-3 text-center">
                <span className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                  {tKey('gallery.oliveTitle')}
                </span>
                <span className="text-[10px] text-[#8C6D28] font-bold">Refugio PRO</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-black/40 bg-white shadow-xs group hover:shadow-md transition-all ring-1 ring-[#D4B373]/40">
              <div className="aspect-[9/13] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]" style={{ backgroundImage: "url('/story-bg-oro-ceniza.png')" }} />
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

      {/* 4. DEFENSA INSTITUCIONAL Y DOCTRINAL (FAQS) */}
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