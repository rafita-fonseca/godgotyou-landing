import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { locale } = useTranslation();

  // Etiquetas según el idioma
  const labels: Record<string, { play: string; pause: string }> = {
    es: { play: 'Música de Quietud', pause: 'Pausar Sonido' },
    en: { play: 'Stillness Music', pause: 'Pause Sound' },
    pt: { play: 'Música de Paz', pause: 'Pausar Som' },
    fr: { play: 'Musique de Sérénité', pause: 'Pause' },
  };

  const currentLabel = labels[locale] || labels.es;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35; // Nivel suave y reverente
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Autoplay bloqueado por el navegador:', err);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/peace.mp3" loop preload="metadata" />

      <button
        type="button"
        onClick={togglePlay}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg cursor-pointer ${
          isPlaying
            ? 'bg-[#2D4523] border-[#D4B373]/40 text-white shadow-[#2D4523]/20 ring-2 ring-[#D4B373]/30 scale-102'
            : 'bg-white/80 border-[#EAE5DC] text-[#4A5568] hover:text-[#1A1A1A] hover:bg-white hover:border-[#D4B373]/50 hover:shadow-xl'
        }`}
        title={isPlaying ? currentLabel.pause : currentLabel.play}
      >
        <span className="relative flex h-2 w-2">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4B373] opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isPlaying ? 'bg-[#D4B373]' : 'bg-[#64748B]'
            }`}
          ></span>
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#D4B373] animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#8C6D4F]" />
        )}

        <span className="text-xs font-serif-display font-medium tracking-wide">
          {isPlaying ? currentLabel.pause : currentLabel.play}
        </span>

        {isPlaying && (
          <Sparkles className="w-3 h-3 text-[#D4B373] opacity-80" />
        )}
      </button>
    </div>
  );
};