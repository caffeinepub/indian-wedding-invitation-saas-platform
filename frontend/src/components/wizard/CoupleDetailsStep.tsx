import { useInvitationForm } from '../../context/InvitationFormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRef } from 'react';
import { Camera, X, ChevronRight } from 'lucide-react';

interface CoupleDetailsStepProps {
  onNext: () => void;
}

export default function CoupleDetailsStep({ onNext }: CoupleDetailsStepProps) {
  const { formData, updateFormData } = useInvitationForm();
  const bridePhotoRef = useRef<HTMLInputElement>(null);
  const groomPhotoRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (type: 'bridePhoto' | 'groomPhoto', file: File | null) => {
    updateFormData({ [type]: file });
  };

  const getPhotoPreview = (file: File | null): string | null => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  const isValid = formData.brideName && formData.groomName && formData.weddingDate;

  return (
    <div className="space-y-8 bg-card rounded-2xl p-8 border border-border shadow-sm">
      <div className="text-center">
        <h2 className="text-3xl font-serif text-foreground mb-2">Couple Details</h2>
        <p className="text-muted-foreground">Tell us about the happy couple</p>
      </div>

      {/* Photo Upload Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Bride Photo */}
        <div className="text-center">
          <Label className="text-foreground font-medium mb-3 block">Bride's Photo</Label>
          <div className="relative inline-block">
            {formData.bridePhoto ? (
              <div className="relative">
                <img
                  src={getPhotoPreview(formData.bridePhoto)!}
                  alt="Bride"
                  className="w-32 h-32 object-cover rounded-full border-4 border-gold-400/60 shadow-lg ring-2 ring-gold-300/20"
                />
                <button
                  onClick={() => handlePhotoChange('bridePhoto', null)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => bridePhotoRef.current?.click()}
                className="w-32 h-32 border-2 border-dashed border-gold-400/40 rounded-full flex flex-col items-center justify-center text-muted-foreground hover:border-gold-500 hover:text-gold-500 transition-colors"
              >
                <Camera size={24} />
                <span className="text-xs mt-1">Add Photo</span>
              </button>
            )}
            <input
              ref={bridePhotoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePhotoChange('bridePhoto', e.target.files?.[0] || null)}
            />
          </div>
          {formData.bridePhoto && (
            <button
              onClick={() => bridePhotoRef.current?.click()}
              className="mt-2 text-xs text-gold-600 hover:underline"
            >
              Change Photo
            </button>
          )}
        </div>

        {/* Groom Photo */}
        <div className="text-center">
          <Label className="text-foreground font-medium mb-3 block">Groom's Photo</Label>
          <div className="relative inline-block">
            {formData.groomPhoto ? (
              <div className="relative">
                <img
                  src={getPhotoPreview(formData.groomPhoto)!}
                  alt="Groom"
                  className="w-32 h-32 object-cover rounded-full border-4 border-gold-400/60 shadow-lg ring-2 ring-gold-300/20"
                />
                <button
                  onClick={() => handlePhotoChange('groomPhoto', null)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => groomPhotoRef.current?.click()}
                className="w-32 h-32 border-2 border-dashed border-gold-400/40 rounded-full flex flex-col items-center justify-center text-muted-foreground hover:border-gold-500 hover:text-gold-500 transition-colors"
              >
                <Camera size={24} />
                <span className="text-xs mt-1">Add Photo</span>
              </button>
            )}
            <input
              ref={groomPhotoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePhotoChange('groomPhoto', e.target.files?.[0] || null)}
            />
          </div>
          {formData.groomPhoto && (
            <button
              onClick={() => groomPhotoRef.current?.click()}
              className="mt-2 text-xs text-gold-600 hover:underline"
            >
              Change Photo
            </button>
          )}
        </div>
      </div>

      {/* Names */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="brideName" className="text-foreground font-medium">Bride's Name *</Label>
          <Input
            id="brideName"
            value={formData.brideName}
            onChange={(e) => updateFormData({ brideName: e.target.value })}
            placeholder="Enter bride's name"
            className="mt-1 min-h-[44px]"
          />
        </div>
        <div>
          <Label htmlFor="groomName" className="text-foreground font-medium">Groom's Name *</Label>
          <Input
            id="groomName"
            value={formData.groomName}
            onChange={(e) => updateFormData({ groomName: e.target.value })}
            placeholder="Enter groom's name"
            className="mt-1 min-h-[44px]"
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="weddingDate" className="text-foreground font-medium">Wedding Date *</Label>
          <Input
            id="weddingDate"
            type="date"
            value={formData.weddingDate}
            onChange={(e) => updateFormData({ weddingDate: e.target.value })}
            className="mt-1 min-h-[44px]"
          />
        </div>
        <div>
          <Label htmlFor="weddingTime" className="text-foreground font-medium">Wedding Time</Label>
          <Input
            id="weddingTime"
            type="time"
            value={formData.weddingTime}
            onChange={(e) => updateFormData({ weddingTime: e.target.value })}
            className="mt-1 min-h-[44px]"
          />
        </div>
      </div>

      {/* Venue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="venueName" className="text-foreground font-medium">Venue Name</Label>
          <Input
            id="venueName"
            value={formData.venueName}
            onChange={(e) => updateFormData({ venueName: e.target.value })}
            placeholder="e.g., The Grand Palace"
            className="mt-1 min-h-[44px]"
          />
        </div>
        <div>
          <Label htmlFor="venueAddress" className="text-foreground font-medium">Venue Address</Label>
          <Input
            id="venueAddress"
            value={formData.venueAddress}
            onChange={(e) => updateFormData({ venueAddress: e.target.value })}
            placeholder="Full address"
            className="mt-1 min-h-[44px]"
          />
        </div>
      </div>

      {/* Google Maps */}
      <div>
        <Label htmlFor="googleMapsLink" className="text-foreground font-medium">Google Maps Link</Label>
        <Input
          id="googleMapsLink"
          value={formData.googleMapsLink}
          onChange={(e) => updateFormData({ googleMapsLink: e.target.value })}
          placeholder="https://maps.google.com/..."
          className="mt-1 min-h-[44px]"
        />
      </div>

      {/* Invitation Message */}
      <div>
        <Label htmlFor="invitationMessage" className="text-foreground font-medium">Invitation Message</Label>
        <Textarea
          id="invitationMessage"
          value={formData.invitationMessage}
          onChange={(e) => updateFormData({ invitationMessage: e.target.value })}
          placeholder="Together with their families, joyfully invite you..."
          rows={3}
          className="mt-1 resize-none"
        />
      </div>

      {/* Family Details */}
      <div>
        <Label htmlFor="familyDetails" className="text-foreground font-medium">Family Details</Label>
        <Textarea
          id="familyDetails"
          value={formData.familyDetails}
          onChange={(e) => updateFormData({ familyDetails: e.target.value })}
          placeholder="Son/Daughter of Mr. & Mrs. ..."
          rows={3}
          className="mt-1 resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-medium px-8 py-3 rounded-full transition-all shadow-gold disabled:opacity-50 min-h-[44px]"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
