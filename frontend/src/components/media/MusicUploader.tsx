import React, { useRef, useState } from 'react';
import { Music, Upload, Play, Pause, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useInvitationForm } from '@/context/InvitationFormContext';

export default function MusicUploader() {
  const { formData, updateFormData } = useInvitationForm();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateFormData({ musicUrl: ev.target?.result as string });
      setIsPlaying(false);
    };
    reader.readAsDataURL(file);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleRemove = () => {
    updateFormData({ musicUrl: '', musicAutoPlay: false });
    setIsPlaying(false);
  };

  return (
    <div className="space-y-5">
      {!formData.musicUrl ? (
        <div
          className="drag-zone p-8 text-center cursor-pointer"
          onClick={() => document.getElementById('music-input')?.click()}
        >
          <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
            <Music className="w-7 h-7 text-gold" />
          </div>
          <p className="font-inter font-medium text-foreground">
            Upload background music
          </p>
          <p className="text-sm text-muted-foreground mt-1">MP3, WAV, M4A supported</p>
          <Upload className="w-5 h-5 text-gold/60 mx-auto mt-3" />
        </div>
      ) : (
        <div className="luxury-card p-5 space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full btn-gold flex items-center justify-center flex-shrink-0"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-cinzel text-sm font-bold text-foreground">Background Music</p>
              <p className="font-inter text-xs text-muted-foreground">Ready to play</p>
            </div>
            <button
              onClick={handleRemove}
              className="w-8 h-8 rounded-full bg-crimson/10 text-crimson flex items-center justify-center hover:bg-crimson/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <audio
            ref={audioRef}
            src={formData.musicUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          {/* Auto-play toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div>
              <Label className="font-cinzel text-sm font-semibold tracking-wide">Auto-play on open</Label>
              <p className="font-inter text-xs text-muted-foreground mt-0.5">
                Music starts automatically when guests open the invitation
              </p>
            </div>
            <Switch
              checked={formData.musicAutoPlay}
              onCheckedChange={(checked) => updateFormData({ musicAutoPlay: checked })}
            />
          </div>
        </div>
      )}

      <input
        id="music-input"
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
}
