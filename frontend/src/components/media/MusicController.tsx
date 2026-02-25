import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicControllerProps {
  musicUrl: string;
  autoPlay?: boolean;
}

export default function MusicController({ musicUrl, autoPlay = false }: MusicControllerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (!audioRef.current || !musicUrl) return;
    audioRef.current.volume = volume;
    if (autoPlay) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [musicUrl, autoPlay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  if (!musicUrl) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* Volume control - shown on hover */}
      <div className="glass-card rounded-full px-3 py-2 flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300 group-hover:opacity-100">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-gold hover:text-gold-dark transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            setIsMuted(false);
          }}
          className="w-16 accent-gold"
        />
      </div>

      {/* Play/Pause button */}
      <button
        onClick={togglePlay}
        className="w-14 h-14 rounded-full btn-gold flex items-center justify-center shadow-gold-lg animate-glow"
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </button>
    </div>
  );
}
