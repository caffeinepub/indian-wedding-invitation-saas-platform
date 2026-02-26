import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Music2, ChevronDown } from 'lucide-react';

interface MusicControllerProps {
  musicUrl: string;
  autoPlay?: boolean;
}

export default function MusicController({ musicUrl, autoPlay = false }: MusicControllerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Sync volume/mute to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Auto-play attempt on mount (desktop only; mobile will silently fail)
  useEffect(() => {
    if (!audioRef.current || !musicUrl || !autoPlay) return;
    audioRef.current.volume = volume;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // Autoplay blocked (mobile) — user must tap play
          setIsPlaying(false);
        });
    }
  }, [musicUrl, autoPlay]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      } else {
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(false);
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  if (!musicUrl) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      style={{ touchAction: 'manipulation' }}
    >
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        onEnded={handleAudioEnded}
        className="hidden"
        preload="auto"
      />

      {/* Expanded controls panel */}
      {isExpanded && (
        <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3 shadow-luxury animate-scale-in min-w-[180px]">
          <button
            onClick={toggleMute}
            className="text-gold hover:text-gold-dark transition-colors p-1 rounded-full min-w-[32px] min-h-[32px] flex items-center justify-center"
            style={{ touchAction: 'manipulation' }}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-gold cursor-pointer"
            style={{ touchAction: 'none' }}
            aria-label="Volume"
          />
          <button
            onClick={() => setIsExpanded(false)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full min-w-[28px] min-h-[28px] flex items-center justify-center"
            style={{ touchAction: 'manipulation' }}
            aria-label="Close controls"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main floating button row */}
      <div className="flex items-center gap-2">
        {/* Music note / expand button */}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-gold hover:text-gold-dark transition-all duration-200 shadow-md hover:shadow-luxury active:scale-95"
          style={{ touchAction: 'manipulation' }}
          aria-label="Toggle music controls"
        >
          <Music2 className="w-4 h-4" />
        </button>

        {/* Play / Pause button */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full btn-gold flex items-center justify-center shadow-gold-lg animate-glow active:scale-95 transition-transform duration-100"
          style={{ touchAction: 'manipulation', userSelect: 'none' }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>
      </div>

      {/* Mobile hint: show only before first interaction and not auto-playing */}
      {!hasInteracted && !isPlaying && (
        <div className="glass-card rounded-full px-3 py-1 text-xs font-inter text-gold-dark animate-pulse pointer-events-none">
          Tap ▶ for music
        </div>
      )}
    </div>
  );
}
