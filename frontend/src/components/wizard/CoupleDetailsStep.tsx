import React, { useCallback, useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useInvitationForm } from '@/context/InvitationFormContext';

export default function CoupleDetailsStep() {
  const { formData, updateFormData } = useInvitationForm();
  const [isDragging, setIsDragging] = useState(false);

  const handlePhotoUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateFormData({ couplePhotoUrl: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  }, [updateFormData]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handlePhotoUpload(file);
    }
  }, [handlePhotoUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handlePhotoUpload(file);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-gold-dark mb-2">
          Couple Details
        </h2>
        <p className="font-inter text-muted-foreground">
          Tell us about the beautiful couple
        </p>
      </div>

      {/* Couple Photo Upload */}
      <div className="space-y-3">
        <Label className="font-cinzel text-sm font-semibold text-foreground tracking-wide">
          Couple Photo
        </Label>
        <div
          className={`drag-zone p-8 text-center cursor-pointer transition-all ${isDragging ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById('couple-photo-input')?.click()}
        >
          {formData.couplePhotoUrl ? (
            <div className="relative inline-block">
              <img
                src={formData.couplePhotoUrl}
                alt="Couple"
                className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-gold/40 shadow-gold"
              />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); updateFormData({ couplePhotoUrl: '' }); }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-crimson text-ivory rounded-full flex items-center justify-center shadow-crimson hover:bg-crimson-light transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                <Image className="w-8 h-8 text-gold" />
              </div>
              <div>
                <p className="font-inter font-medium text-foreground">
                  Drop your photo here or <span className="text-gold-dark underline">browse</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
              </div>
              <Upload className="w-5 h-5 text-gold/60 mx-auto" />
            </div>
          )}
        </div>
        <input
          id="couple-photo-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      {/* Names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="brideName" className="font-cinzel text-sm font-semibold tracking-wide">
            Bride's Name *
          </Label>
          <Input
            id="brideName"
            value={formData.brideName}
            onChange={(e) => updateFormData({ brideName: e.target.value })}
            placeholder="e.g. Priya Sharma"
            className="input-luxury font-inter"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="groomName" className="font-cinzel text-sm font-semibold tracking-wide">
            Groom's Name *
          </Label>
          <Input
            id="groomName"
            value={formData.groomName}
            onChange={(e) => updateFormData({ groomName: e.target.value })}
            placeholder="e.g. Arjun Mehta"
            className="input-luxury font-inter"
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="weddingDate" className="font-cinzel text-sm font-semibold tracking-wide">
            Wedding Date *
          </Label>
          <Input
            id="weddingDate"
            type="date"
            value={formData.weddingDate}
            onChange={(e) => updateFormData({ weddingDate: e.target.value })}
            className="input-luxury font-inter"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weddingTime" className="font-cinzel text-sm font-semibold tracking-wide">
            Wedding Time *
          </Label>
          <Input
            id="weddingTime"
            type="time"
            value={formData.weddingTime}
            onChange={(e) => updateFormData({ weddingTime: e.target.value })}
            className="input-luxury font-inter"
          />
        </div>
      </div>

      {/* Venue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="venueName" className="font-cinzel text-sm font-semibold tracking-wide">
            Venue Name *
          </Label>
          <Input
            id="venueName"
            value={formData.venueName}
            onChange={(e) => updateFormData({ venueName: e.target.value })}
            placeholder="e.g. The Grand Palace"
            className="input-luxury font-inter"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="venueAddress" className="font-cinzel text-sm font-semibold tracking-wide">
            Venue Address *
          </Label>
          <Input
            id="venueAddress"
            value={formData.venueAddress}
            onChange={(e) => updateFormData({ venueAddress: e.target.value })}
            placeholder="Full address"
            className="input-luxury font-inter"
          />
        </div>
      </div>

      {/* Google Maps */}
      <div className="space-y-2">
        <Label htmlFor="googleMapsLink" className="font-cinzel text-sm font-semibold tracking-wide">
          Google Maps Link
        </Label>
        <Input
          id="googleMapsLink"
          value={formData.googleMapsLink}
          onChange={(e) => updateFormData({ googleMapsLink: e.target.value })}
          placeholder="https://maps.google.com/..."
          className="input-luxury font-inter"
        />
      </div>

      {/* Family Details */}
      <div className="space-y-2">
        <Label htmlFor="familyDetails" className="font-cinzel text-sm font-semibold tracking-wide">
          Family Details
        </Label>
        <Textarea
          id="familyDetails"
          value={formData.familyDetails}
          onChange={(e) => updateFormData({ familyDetails: e.target.value })}
          placeholder="Share details about both families..."
          rows={4}
          className="input-luxury font-inter resize-none"
        />
      </div>

      {/* Invitation Message */}
      <div className="space-y-2">
        <Label htmlFor="invitationMessage" className="font-cinzel text-sm font-semibold tracking-wide">
          Invitation Message *
        </Label>
        <Textarea
          id="invitationMessage"
          value={formData.invitationMessage}
          onChange={(e) => updateFormData({ invitationMessage: e.target.value })}
          placeholder="Write a heartfelt message for your guests..."
          rows={5}
          className="input-luxury font-inter resize-none"
        />
      </div>
    </div>
  );
}
