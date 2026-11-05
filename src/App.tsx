import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  HeartHandshake, 
  ShieldCheck, 
  Users2, 
  BookOpen, 
  Moon, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  Music2,
  Mail,
  Award
} from 'lucide-react';
import { useTranslation } from './context/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

export default function App() {
  const [activeTab, setActiveTab] = useState<'alma' | 'intercesion' | 'pacto'>('alma');
  const { t } = useTranslation();

  const APP_URL = "https://godgotyou.app";

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#D4B373]/30 selection:text-[#2D4523] flex flex-col justify-between">
      
      {/* 1. NAVEGACIÓN SUPERIOR */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-[#EAE5DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="GodGotYou Sello" 
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-xs transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif-display text-lg sm:text-2xl font-bold tracking-tight text-[#1A1A1A] leading-none">
                God Got You
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest uppercase text-[#5E7153] mt-0.5">
                {t.nav?.badge || "Santuario de Verdad Bíblica"}
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <a 
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-[#2D4523] hover:bg-[#23371B] text-white text-xs sm:text-sm font-serif-display font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span>{t.nav?.cta || "Abrir App"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4B373]" />
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO PRINCIPAL */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#ECD9C6] text-[#8C6D4F] text-xs font-bold font-serif-display uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D4F]" />
            <span>{t.hero?.badge || "2 Corintios 10:5 · Lleva Cautivo el Pensamiento"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-[#1A1A1A] leading-[1.15] tracking-tight max-w-4xl mx-auto">
            {t.hero?.title || "Paz bíblica viva para tu mente en medio de la incertidumbre"}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#4A5568] max-w-2xl mx-auto font-serif-bible italic leading-relaxed">
            {t.hero?.subtitle || "No es un devocional estático ni un catálogo de lectura rígido. Es un ancla contemplativa donde desahogas lo que hoy oprime tu corazón y recibes promesas bíblicas precisas para restaurar tu paz."}
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a 
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#2D4523] hover:bg-[#1F3018] text-white text-sm sm:text-base font-serif-display font-bold tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>{t.hero?.cta_primary || "Entrar al Santuario"}</span>
              <ArrowRight className="w-4 h-4 text-[#D4B373]" />
            </a>

            <a 
              href="#pilares"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-[#F5F2EB] border border-[#E2DDD5] text-[#2C3E50] text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              <span>{t.hero?.cta_secondary || "Conoce cómo funciona"}</span>
              <ChevronRight className="w-4 h-4 text-[#5E7153]" />
            </a>
          </div>

          {/* Sello y Privacidad */}
          <div className="pt-6 flex items-center justify-center gap-6 text-xs text-[#64748B] flex-wrap">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#5E7153]" />
              <span>Privacidad absoluta: Nada se guarda en la nube</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5E7153]" />
              <span>Gratuito en web y móvil (PWA)</span>
            </div>
          </div>
        </div>

        {/* Mockup de la App */}
        <div className="max-w-4xl mx-auto mt-12 sm:mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-3xl p-3 sm:p-5 bg-white border border-[#EAE5DC] shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative overflow-hidden">
            <div className="rounded-2xl p-6 sm:p-10 border border-[#E8E1D5] bg-[#FAF9F6] text-left space-y-6 relative">
              <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
                <div className="flex items-center gap-3">
                  <img src="/medallion-master.png" alt="Sello" className="w-10 h-10 object-contain drop-shadow-xs" />
                  <div>
                    <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#1A1A1A]">La Promesa Viva</h3>
                    <p className="text-[11px] text-[#5E7153] font-sans font-semibold tracking-wider uppercase">Salmos 91:1-2 · RVR1960</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D4F] font-bold border border-[#ECD9C6]">
                  Paz Interior
                </span>
              </div>

              <p className="font-serif-bible italic text-lg sm:text-xl text-[#1A1A1A] leading-relaxed">
                "El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo de Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré."
              </p>

              <div className="p-4 rounded-xl bg-white border border-[#E8E1D5] text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                <strong className="text-[#2D4523] font-serif-display font-bold block mb-1">Palabra al Corazón:</strong>
                Cuando sientas que las circunstancias te sobrepasan, recuerda que tu refugio no depende de la fuerza humana. Descansa tu mente hoy sabiendo que Su fidelidad te cubre como un escudo.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOS 3 PILARES */}
      <section id="pilares" className="py-16 sm:py-24 bg-white border-y border-[#EAE5DC] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5E7153] font-serif-display">
              Un Instrumento Integral
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-display font-bold text-[#1A1A1A]">
              Tres formas de encontrar auxilio en la Palabra
            </h2>
            <p className="text-sm text-[#64748B] font-serif-bible italic">
              Diseñado tanto para la intimidad personal como para interceder por quienes amas y sanar divisiones en el hogar.
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
                1. Para tu Alma
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
                2. Intercesión
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
                <span>3. Pacto de Paz</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#D4B373]/30 text-[#8C6D28]">
                  PRO
                </span>
              </button>
            </div>
          </div>

          {/* Tarjeta interactiva */}
          <div className="rounded-3xl p-6 sm:p-10 border border-[#E8E1D5] bg-[#FAF9F6] shadow-sm">
            {activeTab === 'alma' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-left">
                  <div className="inline-flex p-3 rounded-2xl bg-[#5E7153]/15 text-[#2D4523]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A]">
                    Desahogo íntimo y renovación inmediata
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    Vacía en un espacio seguro lo que hoy te pesa: temor financiero, culpabilidad, incertidumbre laboral o cansancio del alma.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#2C3E50]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span>Promesas bíblicas canónicas seleccionadas para tu sentir exacto.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span>Palabra pastoral al corazón con letra capitular de pergamino.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span>Oración guiada para soltar la carga antes de dormir.</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl p-6 bg-white border border-[#E2DDD5] shadow-inner text-left font-serif-bible italic text-sm space-y-3">
                  <span className="text-[11px] font-sans font-bold text-[#8C6D4F] uppercase tracking-wider block">
                    Ejemplo de desahogo:
                  </span>
                  <p className="text-[#1A1A1A]">
                    "Siento un nudo en el pecho por una discusión y me cuesta soltar el dolor y perdonar..."
                  </p>
                  <div className="pt-3 border-t border-[#EAE5DC] text-xs font-sans text-[#5E7153] font-semibold">
                    → Respuesta con Colosenses 3:13 y oración de liberación interior.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'intercesion' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-left">
                  <div className="inline-flex p-3 rounded-2xl bg-[#5E7153]/15 text-[#2D4523]">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A]">
                    Ponte en la brecha por quienes amas
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    Basado en Gálatas 6:2 («Sobrellevad los unos las cargas de los otros»), te permite clamar por un familiar o amigo que atraviesa una tormenta.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#2C3E50]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span>Carta pastoral personalizada redactada con el nombre de esa persona.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span>Promesa y bendición listas para copiar y enviar por WhatsApp.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span>Exportación a tarjetas litúrgicas 9:16 para redes sociales.</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl p-6 bg-white border border-[#E2DDD5] shadow-inner text-left font-serif-bible italic text-sm space-y-3">
                  <span className="text-[11px] font-sans font-bold text-[#8C6D4F] uppercase tracking-wider block">
                    Ejemplo de intercesión:
                  </span>
                  <p className="text-[#1A1A1A]">
                    "Por mi hermano David, que está pasando por una crisis laboral y se siente desanimado..."
                  </p>
                  <div className="pt-3 border-t border-[#EAE5DC] text-xs font-sans text-[#5E7153] font-semibold">
                    → Carta de ánimo fraternal y promesa en Jeremías 29:11.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pacto' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-left">
                  <div className="inline-flex p-3 rounded-2xl bg-[#5E7153]/15 text-[#2D4523]">
                    <Users2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A]">
                    Pacto de Paz: Reconciliación en un solo teléfono
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    Inspirado en Mateo 5:9 y Mateo 18:19. En lugar de discutir por mensajes de texto, dos personas en conflicto comparten un solo dispositivo para escucharse y sanar.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#2C3E50]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span>Paso ordenado del teléfono sin interrupciones ni juicio de culpas.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span>Palabra pastoral individual para cada uno examinada a la luz bíblica.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0" />
                      <span>Acuerdo mutuo de paz y oración de reconciliación para leer juntos.</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl p-6 bg-white border border-[#E2DDD5] shadow-inner text-left font-serif-bible italic text-sm space-y-3">
                  <span className="text-[11px] font-sans font-bold text-[#8C6D4F] uppercase tracking-wider block">
                    Pacto sellado:
                  </span>
                  <p className="text-[#1A1A1A]">
                    "Reconocemos delante de Dios que nuestro vínculo vale más que cualquier desacuerdo terrenal. Decidimos perdonarnos y abrazar Su paz..."
                  </p>
                  <div className="pt-3 border-t border-[#EAE5DC] text-xs font-sans text-[#5E7153] font-semibold">
                    → Acuerdo litúrgico para matrimonios, padres e hijos o amigos.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. CARACTERÍSTICAS DISTINTIVAS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1A1A1A]">
              Diseñado con rigor doctrinal y sensibilidad estética
            </h2>
            <p className="text-sm text-[#64748B] font-serif-bible italic">
              Cada rincón de la aplicación cuida tu mirada, tu mente y tu privacidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left space-y-3">
              <div className="p-2.5 rounded-xl bg-[#FAF0E6] text-[#8C6D4F] w-fit">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display font-bold text-lg text-[#1A1A1A]">
                Piedras de Memoria (Eben-ezer)
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Consagra promesas como testimonios de victoria. Se entrelazan en tu «Sendero de Fidelidad» para recordar cómo Dios te sostuvo cuando vuelva la duda.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left space-y-3">
              <div className="p-2.5 rounded-xl bg-[#5E7153]/15 text-[#2D4523] w-fit">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display font-bold text-lg text-[#1A1A1A]">
                Modo Vigilia Nocturno
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Entre las 9:00 PM y las 5:30 AM la interfaz atenúa sus contrastes en tono obsidiana y prioriza versículos de reposo y sueño reparador.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left space-y-3">
              <div className="p-2.5 rounded-xl bg-[#5E7153]/15 text-[#2D4523] w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display font-bold text-lg text-[#1A1A1A]">
                Privacidad Inquebrantable
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Tus confesiones no se almacenan en bases de datos externas ni se comparten con terceros. Todo vive exclusivamente en la memoria local de tu dispositivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LLAMADO FINAL */}
      <section className="py-16 sm:py-20 bg-[#2D4523] text-white px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <img src="/logo.png" alt="GodGotYou" className="w-14 h-14 object-contain mx-auto brightness-110 drop-shadow-md" />
          
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#F8F9FA] max-w-xl mx-auto leading-tight">
            Descansa tu corazón en la verdad que no cambia
          </h2>

          <p className="text-sm sm:text-base text-[#DCE6D9] font-serif-bible italic max-w-lg mx-auto">
            Disponible de forma inmediata en tu navegador web, iPhone o Android sin descargas obligatorias de tiendas.
          </p>

          <div className="pt-2">
            <a 
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#D4B373] hover:bg-[#C5A361] text-[#0E1113] text-sm font-serif-display font-bold tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <span>{t.hero?.cta_primary ? `Abrir God Got You` : "Abrir God Got You Ahora"}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. PIE DE PÁGINA */}
      <footer className="bg-white border-t border-[#EAE5DC] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-serif-display font-bold text-base text-[#1A1A1A]">God Got You</span>
              <span className="text-[11px] text-[#64748B]">· godgotyou.app</span>
            </div>
            <p className="text-xs text-[#718096] font-serif-bible italic">
              «Lámpara es a mis pies tu palabra, y lumbrera a mi camino.» — Salmos 119:105
            </p>
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
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
    </div>
  );
}