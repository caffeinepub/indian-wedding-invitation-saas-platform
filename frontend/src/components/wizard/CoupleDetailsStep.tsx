import { useInvitationForm } from '../../context/InvitationFormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { Camera, X } from 'lucide-react';

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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif text-charcoal mb-2">Couple Details</h2>
        <p className="text-charcoal/60">Tell us about the happy couple</p>
      </div>

      {/* Photo Upload Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Bride Photo */}
        <div className="text-center">
          <Label className="text-charcoal font-medium mb-3 block">Bride's Photo</Label>
          <div className="relative inline-block">
            {formData.bridePhoto ? (
              <div className="relative">
                <img
                  src={getPhotoPreview(formData.bridePhoto)!}
                  alt="Bride"
                  className="w-32 h-32 object-cover rounded-full border-4 border-gold/60 shadow-lg ring-2 ring-gold/20"
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
                className="w-32 h-32 border-2 border-dashed border-gold/40 rounded-full flex flex-col items-center justify-center text-charcoal/40 hover:border-gold hover:text-gold transition-colors"
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
              className="mt-2 text-xs text-gold hover:underline"
            >
              Change Photo
            </button>
          )}
        </div>

        {/* Groom Photo */}
        <div className="text-center">
          <Label className="text-charcoal font-medium mb-3 block">Groom's Photo</Label>
          <div className="relative inline-block">
            {formData.groomPhoto ? (
              <div className="relative">
                <img
                  src={getPhotoPreview(formData.groomPhoto)!}
                  alt="Groom"
                  className="w-32 h-32 object-cover rounded-full border-4 border-gold/60 shadow-lg ring-2 ring-gold/20"
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
                className="w-32 h-32 border-2 border-dashed border-gold/40 rounded-full flex flex-col items-center justify-center text-charcoal/40 hover:border-gold hover:text-gold transition-colors"
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
              className="mt-2 text-xs text-gold hover:underline"
            >
              Change Photo
            </button>
          )}
        </div>
      </div>

      {/* Names */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="brideName" className="text-charcoal font-medium">Bride's Name *</Label>
          <Input
            id="brideName"
            value={formData.brideName}
            onChange={(e) => updateFormData({ brideName: e.target.value })}
            placeholder="Enter bride's name"
            className="mt-1 border-gold/30 focus:border-gold"
          />
        </div>
        <div>
          <Label htmlFor="groomName" className="text-charcoal font-medium">Groom's Name *</Label>
          <Input
            id="groomName"
            value={formData.groomName}
            onChange={(e) => updateFormData({ groomName: e.target.value })}
            placeholder="Enter groom's name"
            className="mt-1 border-gold/30 focus:border-gold"
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="weddingDate" className="text-charcoal font-medium">Wedding Date *</Label>
          <Input
            id="weddingDate"
            type="date"
            value={formData.weddingDate}
            onChange={(e) => updateFormData({ weddingDate: e.target.value })}
            className="mt-1 border-gold/30 focus:border-gold"
          />
        </div>
        <div>
          <Label htmlFor="weddingTime" className="text-charcoal font-medium">Wedding Time</Label>
          <Input
            id="weddingTime"
            type="time"
            value={formData.weddingTime}
            onChange={(e) => updateFormData({ weddingTime: e.target.value })}
            className="mt-1 border-gold/30 focus:border-gold"
          />
        </div>
      </div>

      {/* Venue */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="venueName" className="text-charcoal font-medium">Venue Name</Label>
          <Input
            id="venueName"
            value={formData.venueName}
            onChange={(e) => updateFormData({ venueName: e.target.value })}
            placeholder="e.g., The Grand Ballroom"
            className="mt-1 border-gold/30 focus:border-gold"
          />
        </div>
        <div>
          <Label htmlFor="venueAddress" className="text-charcoal font-medium">Venue Address</Label>
          <Input
            id="venueAddress"
            value={formData.venueAddress}
            onChange={(e) => updateFormData({ venueAddress: e.target.value })}
            placeholder="Full address"
            className="mt-1 border-gold/30 focus:border-gold"
          />
        </div>
        <div>
          <Label htmlFor="googleMapsLink" className="text-charcoal font-medium">Google Maps Link</Label>
          <Input
            id="googleMapsLink"
            value={formData.googleMapsLink}
            onChange={(e) => updateFormData({ googleMapsLink: e.target.value })}
            placeholder="https://maps.google.com/..."
            className="mt-1 border-gold/30 focus:border-gold"
          />
        </div>
      </div>

      {/* Family Details & Message */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="familyDetails" className="text-charcoal font-medium">Family Details</Label>
          <Textarea
            id="familyDetails"
            value={formData.familyDetails}
            onChange={(e) => updateFormData({ familyDetails: e.target.value })}
            placeholder="e.g., Son of Mr. & Mrs. Sharma..."
            className="mt-1 border-gold/30 focus:border-gold resize-none"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="invitationMessage" className="text-charcoal font-medium">Invitation Message</Label>
          <Textarea
            id="invitationMessage"
            value={formData.invitationMessage}
            onChange={(e) => updateFormData({ invitationMessage: e.target.value })}
            placeholder="Write a heartfelt message for your guests..."
            className="mt-1 border-gold/30 focus:border-gold resize-none"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="bg-gold hover:bg-gold/90 text-white px-8"
        >
          Next: Events →
        </Button>
      </div>
    </div>
  );
}
