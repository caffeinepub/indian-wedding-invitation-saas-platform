import React, { useRef } from 'react';
import { useInvitationForm } from '@/context/InvitationFormContext';
import { Upload, X, ImageIcon } from 'lucide-react';

export default function PhotoGalleryUpload() {
  const { formData, updateFormData } = useInvitationForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          updateFormData({ photos: [...formData.photos, dataUrl] });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: newPhotos });
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gold/40 rounded-xl p-8 text-center cursor-pointer hover:border-gold hover:bg-gold/5 transition-all duration-200"
      >
        <Upload className="w-8 h-8 text-gold mx-auto mb-3" />
        <p className="font-elegant text-charcoal font-medium mb-1">Drop photos here or click to upload</p>
        <p className="font-elegant text-charcoal-light text-sm">Supports JPG, PNG, WebP</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </div>

      {/* Photo Grid */}
      {formData.photos.length > 0 && (
        <div className="mt-4 grid grid-cols-3 md:grid-cols-4 gap-3">
          {formData.photos.map((photoUrl, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={photoUrl}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-1 right-1 w-6 h-6 bg-crimson text-ivory rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {formData.photos.length === 0 && (
        <div className="mt-4 flex items-center gap-2 text-charcoal-light">
          <ImageIcon className="w-4 h-4" />
          <span className="font-elegant text-sm">No photos uploaded yet</span>
        </div>
      )}
    </div>
  );
}
