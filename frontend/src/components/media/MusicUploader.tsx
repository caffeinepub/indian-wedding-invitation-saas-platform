import React, { useRef, useState } from 'react';
import { useInvitationForm } from '@/context/InvitationFormContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Music, Upload, X, Play, Pause } from 'lucide-react';

export default function MusicUploader() {
  const { formData, updateFormData } = useInvitationForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('audio/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        updateFormData({ musicUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleRemove = () => {
    updateFormData({ musicUrl: '', musicAutoPlay: false });
    setIsPlaying(false);
  };

  return (
    <div>
      {!formData.musicUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gold/40 rounded-xl p-8 text-center cursor-pointer hover:border-gold hover:bg-gold/5 transition-all duration-200"
        >
          <Music className="w-8 h-8 text-gold mx-auto mb-3" />
          <p className="font-elegant text-charcoal font-medium mb-1">Click to upload music</p>
          <p className="font-elegant text-charcoal-light text-sm">Supports MP3, WAV, M4A</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="bg-ivory-dark rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleTogglePlay}
              className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-charcoal hover:bg-gold-dark transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <div className="flex-1">
              <p className="font-elegant text-charcoal text-sm font-medium">Music uploaded</p>
              <p className="font-elegant text-charcoal-light text-xs">Ready to play</p>
            </div>
            <button
              onClick={handleRemove}
              className="w-8 h-8 rounded-full border border-crimson/30 text-crimson hover:bg-crimson/10 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="autoplay"
              checked={formData.musicAutoPlay}
              onCheckedChange={checked => updateFormData({ musicAutoPlay: checked })}
            />
            <Label htmlFor="autoplay" className="font-elegant text-sm text-charcoal cursor-pointer">
              Auto-play when invitation opens
            </Label>
          </div>

          <audio
            ref={audioRef}
            src={formData.musicUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
