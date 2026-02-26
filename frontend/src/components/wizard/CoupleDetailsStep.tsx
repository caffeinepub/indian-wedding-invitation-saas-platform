import React, { useRef } from 'react';
import { useInvitationForm } from '../../context/InvitationFormContext';
import { User, Upload, X, Camera } from 'lucide-react';

interface CoupleDetailsStepProps {
  onNext: () => void;
  hideNavigation?: boolean;
}

export default function CoupleDetailsStep({ onNext, hideNavigation }: CoupleDetailsStepProps) {
  const { formData, updateFormData } = useInvitationForm();
  const bridePhotoRef = useRef<HTMLInputElement>(null);
  const groomPhotoRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (field: 'bridePhoto' | 'groomPhoto', file: File | null) => {
    updateFormData({ [field]: file });
  };

  const handlePhotoSelect = (field: 'bridePhoto' | 'groomPhoto', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(field, file);
  };

  const getPreviewUrl = (file: File | null): string | null => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  const isValid = formData.brideName && formData.groomName && formData.weddingDate && formData.venueName;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
          <User className="w-8 h-8 text-gold" />
        </div>
        <h2 className="text-2xl font-serif text-charcoal dark:text-ivory font-bold">Couple Details</h2>
        <p className="text-charcoal/60 dark:text-ivory/60 mt-1">Tell us about the happy couple</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bride Name */}
        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-ivory mb-2">
            Bride's Name <span className="text-crimson">*</span>
          </label>
          <input
            type="text"
            value={formData.brideName}
            onChange={e => updateFormData({ brideName: e.target.value })}
            placeholder="Enter bride's name"
            className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-charcoal/50 text-charcoal dark:text-ivory placeholder-charcoal/40 dark:placeholder-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>

        {/* Groom Name */}
        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-ivory mb-2">
            Groom's Name <span className="text-crimson">*</span>
          </label>
          <input
            type="text"
            value={formData.groomName}
            onChange={e => updateFormData({ groomName: e.target.value })}
            placeholder="Enter groom's name"
            className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-charcoal/50 text-charcoal dark:text-ivory placeholder-charcoal/40 dark:placeholder-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>

        {/* Wedding Date */}
        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-ivory mb-2">
            Wedding Date <span className="text-crimson">*</span>
          </label>
          <input
            type="date"
            value={formData.weddingDate}
            onChange={e => updateFormData({ weddingDate: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-charcoal/50 text-charcoal dark:text-ivory focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>

        {/* Wedding Time */}
        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-ivory mb-2">
            Wedding Time
          </label>
          <input
            type="time"
            value={formData.weddingTime}
            onChange={e => updateFormData({ weddingTime: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-charcoal/50 text-charcoal dark:text-ivory focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>

        {/* Venue Name */}
        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-ivory mb-2">
            Venue Name <span className="text-crimson">*</span>
          </label>
          <input
            type="text"
            value={formData.venueName}
            onChange={e => updateFormData({ venueName: e.target.value })}
            placeholder="Enter venue name"
            className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-charcoal/50 text-charcoal dark:text-ivory placeholder-charcoal/40 dark:placeholder-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>

        {/* Venue Address */}
        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-ivory mb-2">
            Venue Address
          </label>
          <input
            type="text"
            value={formData.venueAddress}
            onChange={e => updateFormData({ venueAddress: e.target.value })}
            placeholder="Enter venue address"
            className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-charcoal/50 text-charcoal dark:text-ivory placeholder-charcoal/40 dark:placeholder-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>
      </div>

      {/* Google Maps Link */}
      <div>
        <label className="block text-sm font-medium text-charcoal dark:text-ivory mb-2">
          Google Maps Link
        </label>
        <input
          type="url"
          value={formData.googleMapsLink}
          onChange={e => updateFormData({ googleMapsLink: e.target.value })}
          placeholder="https://maps.google.com/..."
          className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-charcoal/50 text-charcoal dark:text-ivory placeholder-charcoal/40 dark:placeholder-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
      </div>

      {/* Couple Photos */}
      <div>
        <label className="block text-sm font-medium text-charcoal dark:text-ivory mb-3">
          Couple Photos
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bride Photo */}
          <div className="space-y-2">
            <p className="text-sm text-charcoal/70 dark:text-ivory/70 font-medium flex items-center gap-1">
              <Camera className="w-4 h-4 text-gold" /> Bride Photo
            </p>
            <div
              className="relative border-2 border-dashed border-gold/30 rounded-xl overflow-hidden cursor-pointer hover:border-gold/60 transition-colors bg-gold/5 dark:bg-gold/10"
              style={{ minHeight: '180px' }}
              onClick={() => bridePhotoRef.current?.click()}
            >
              {formData.bridePhoto ? (
                <div className="relative w-full h-full">
                  <img
                    src={getPreviewUrl(formData.bridePhoto) || ''}
                    alt="Bride preview"
                    className="w-full h-44 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); handleFileChange('bridePhoto', null); if (bridePhotoRef.current) bridePhotoRef.current.value = ''; }}
                    className="absolute top-2 right-2 bg-crimson text-white rounded-full p-1 shadow-lg hover:bg-crimson/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {formData.bridePhoto.name}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-44 gap-2 text-charcoal/40 dark:text-ivory/40">
                  <Upload className="w-8 h-8 text-gold/60" />
                  <span className="text-sm">Click to upload bride photo</span>
                  <span className="text-xs">JPG, PNG, WEBP</span>
                </div>
              )}
            </div>
            <input
              ref={bridePhotoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handlePhotoSelect('bridePhoto', e)}
            />
          </div>

          {/* Groom Photo */}
          <div className="space-y-2">
            <p className="text-sm text-charcoal/70 dark:text-ivory/70 font-medium flex items-center gap-1">
              <Camera className="w-4 h-4 text-gold" /> Groom Photo
            </p>
            <div
              className="relative border-2 border-dashed border-gold/30 rounded-xl overflow-hidden cursor-pointer hover:border-gold/60 transition-colors bg-gold/5 dark:bg-gold/10"
              style={{ minHeight: '180px' }}
              onClick={() => groomPhotoRef.current?.click()}
            >
              {formData.groomPhoto ? (
                <div className="relative w-full h-full">
                  <img
                    src={getPreviewUrl(formData.groomPhoto) || ''}
                    alt="Groom preview"
                    className="w-full h-44 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); handleFileChange('groomPhoto', null); if (groomPhotoRef.current) groomPhotoRef.current.value = ''; }}
                    className="absolute top-2 right-2 bg-crimson text-white rounded-full p-1 shadow-lg hover:bg-crimson/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {formData.groomPhoto.name}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-44 gap-2 text-charcoal/40 dark:text-ivory/40">
                  <Upload className="w-8 h-8 text-gold/60" />
                  <span className="text-sm">Click to upload groom photo</span>
                  <span className="text-xs">JPG, PNG, WEBP</span>
                </div>
              )}
            </div>
            <input
              ref={groomPhotoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handlePhotoSelect('groomPhoto', e)}
            />
          </div>
        </div>
      </div>

      {/* Family Details */}
      <div>
        <label className="block text-sm font-medium text-charcoal dark:text-ivory mb-2">
          Family Details
        </label>
        <textarea
          value={formData.familyDetails}
          onChange={e => updateFormData({ familyDetails: e.target.value })}
          placeholder="Share details about both families..."
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-charcoal/50 text-charcoal dark:text-ivory placeholder-charcoal/40 dark:placeholder-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
        />
      </div>

      {/* Invitation Message */}
      <div>
        <label className="block text-sm font-medium text-charcoal dark:text-ivory mb-2">
          Invitation Message
        </label>
        <textarea
          value={formData.invitationMessage}
          onChange={e => updateFormData({ invitationMessage: e.target.value })}
          placeholder="Write a heartfelt message for your guests..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-charcoal/50 text-charcoal dark:text-ivory placeholder-charcoal/40 dark:placeholder-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
        />
      </div>

      {!hideNavigation && (
        <div className="flex justify-end pt-4">
          <button
            onClick={onNext}
            disabled={!isValid}
            className="px-8 py-3 bg-gold text-white rounded-full font-medium hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-luxury"
          >
            Next: Choose Theme →
          </button>
        </div>
      )}
    </div>
  );
}
