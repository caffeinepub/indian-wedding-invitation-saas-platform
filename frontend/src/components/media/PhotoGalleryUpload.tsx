import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInvitationForm } from '@/context/InvitationFormContext';

export default function PhotoGalleryUpload() {
  const { formData, updateFormData } = useInvitationForm();
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const photoId = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        updateFormData({
          photos: [...formData.photos, { id: photoId, imageUrl }],
        });
      };
      reader.readAsDataURL(file);
    });
  }, [formData.photos, updateFormData]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
  };

  const handleDelete = (photoId: string) => {
    updateFormData({ photos: formData.photos.filter(p => p.id !== photoId) });
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        className={`drag-zone p-8 text-center cursor-pointer ${isDragging ? 'drag-over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('gallery-photo-input')?.click()}
      >
        <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
          <ImageIcon className="w-7 h-7 text-gold" />
        </div>
        <p className="font-inter font-medium text-foreground">
          Drop photos here or <span className="text-gold-dark underline">browse</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">Multiple images supported • PNG, JPG</p>
        <Upload className="w-5 h-5 text-gold/60 mx-auto mt-3" />
      </div>
      <input
        id="gallery-photo-input"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileInput}
      />

      {/* Photo Grid */}
      {formData.photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {formData.photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative group aspect-square rounded-xl overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              <img
                src={photo.imageUrl}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-2 right-2 w-7 h-7 bg-crimson text-ivory rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-crimson"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {formData.photos.length === 0 && (
        <p className="text-center text-sm text-muted-foreground font-inter">
          No photos added yet. Upload your favorite couple photos!
        </p>
      )}
    </div>
  );
}
