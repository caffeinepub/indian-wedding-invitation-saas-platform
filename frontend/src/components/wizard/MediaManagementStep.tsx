import React from 'react';
import { Image, Music } from 'lucide-react';
import PhotoGalleryUpload from '@/components/media/PhotoGalleryUpload';
import MusicUploader from '@/components/media/MusicUploader';

export default function MediaManagementStep() {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-gold-dark mb-2">
          Media & Gallery
        </h2>
        <p className="font-inter text-muted-foreground">
          Add photos and music to make your invitation come alive
        </p>
      </div>

      {/* Photo Gallery */}
      <div className="luxury-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
            <Image className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="font-cinzel text-lg font-bold text-foreground">Photo Gallery</h3>
            <p className="font-inter text-xs text-muted-foreground">Upload your favorite couple photos</p>
          </div>
        </div>
        <PhotoGalleryUpload />
      </div>

      {/* Background Music */}
      <div className="luxury-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
            <Music className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="font-cinzel text-lg font-bold text-foreground">Background Music</h3>
            <p className="font-inter text-xs text-muted-foreground">Add a song to play on your invitation</p>
          </div>
        </div>
        <MusicUploader />
      </div>
    </div>
  );
}
