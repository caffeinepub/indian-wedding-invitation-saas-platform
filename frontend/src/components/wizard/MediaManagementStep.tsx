import React from 'react';
import PhotoGalleryUpload from '../media/PhotoGalleryUpload';
import MusicUploader from '../media/MusicUploader';
import { ChevronRight, ChevronLeft, Camera, Music } from 'lucide-react';

interface MediaManagementStepProps {
  onNext: () => void;
  onBack: () => void;
  hideNavigation?: boolean;
}

export default function MediaManagementStep({ onNext, onBack, hideNavigation }: MediaManagementStepProps) {
  return (
    <div className="space-y-6">
      {/* Photo Gallery */}
      <div className="luxury-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
            <Camera className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h2 className="font-display text-xl text-charcoal">Photo Gallery</h2>
            <p className="font-elegant text-charcoal-light text-sm">Upload photos to share with your guests</p>
          </div>
        </div>
        <PhotoGalleryUpload />
      </div>

      {/* Background Music */}
      <div className="luxury-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
            <Music className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h2 className="font-display text-xl text-charcoal">Background Music</h2>
            <p className="font-elegant text-charcoal-light text-sm">Add a song to play on your invitation</p>
          </div>
        </div>
        <MusicUploader />
      </div>

      {!hideNavigation && (
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory font-elegant font-semibold px-6 py-3 rounded-full transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-elegant font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-luxury"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
