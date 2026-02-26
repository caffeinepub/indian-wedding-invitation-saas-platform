import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Save, Eye, ArrowLeft, Settings, Calendar, Image, Music, Loader2, Upload, X, Camera } from 'lucide-react';
import { useGetInvitationBySlug, useUpdateInvitation, useAddPhotos } from '../hooks/useQueries';
import { InvitationFormProvider, useInvitationForm } from '../context/InvitationFormContext';
import { ExternalBlob } from '../backend';
import CoupleDetailsStep from '../components/wizard/CoupleDetailsStep';
import EventManagementStep from '../components/wizard/EventManagementStep';
import TemplateThemeStep from '../components/wizard/TemplateThemeStep';
import MediaManagementStep from '../components/wizard/MediaManagementStep';

type TabId = 'details' | 'events' | 'theme' | 'media';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'details', label: 'Details', icon: <Settings className="w-4 h-4" /> },
  { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
  { id: 'theme', label: 'Theme', icon: <Image className="w-4 h-4" /> },
  { id: 'media', label: 'Media', icon: <Music className="w-4 h-4" /> },
];

function EditorContent({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const { updateFormData, formData } = useInvitationForm();
  const [activeTab, setActiveTab] = useState<TabId>('details');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Photo state for editor
  const [bridePhotoFile, setBridePhotoFile] = useState<File | null>(null);
  const [groomPhotoFile, setGroomPhotoFile] = useState<File | null>(null);
  const [bridePhotoPreview, setBridePhotoPreview] = useState<string | null>(null);
  const [groomPhotoPreview, setGroomPhotoPreview] = useState<string | null>(null);
  const bridePhotoRef = useRef<HTMLInputElement>(null);
  const groomPhotoRef = useRef<HTMLInputElement>(null);

  const { data: invitation, isLoading } = useGetInvitationBySlug(slug);
  const updateInvitation = useUpdateInvitation();
  const addPhotos = useAddPhotos();

  // Initialize form data from existing invitation
  useEffect(() => {
    if (invitation && !initialized) {
      updateFormData({
        brideName: invitation.brideName,
        groomName: invitation.groomName,
        weddingDate: invitation.weddingDate,
        weddingTime: invitation.weddingTime,
        venueName: invitation.venueName,
        venueAddress: invitation.venueAddress,
        googleMapsLink: invitation.googleMapsLink,
        familyDetails: invitation.familyDetails,
        invitationMessage: invitation.invitationMessage,
        selectedTemplate: invitation.selectedTemplate,
        colorScheme: invitation.colorScheme,
        fontChoice: invitation.fontChoice,
        backgroundChoice: invitation.backgroundChoice,
        bridePhoto: null,
        groomPhoto: null,
      });

      // Load existing photos from backend
      if (invitation.bridePhoto) {
        setBridePhotoPreview(invitation.bridePhoto.getDirectURL());
      }
      if (invitation.groomPhoto) {
        setGroomPhotoPreview(invitation.groomPhoto.getDirectURL());
      }

      setInitialized(true);
    }
  }, [invitation, initialized, updateFormData]);

  const handleBridePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBridePhotoFile(file);
    if (file) {
      setBridePhotoPreview(URL.createObjectURL(file));
    } else {
      setBridePhotoPreview(null);
    }
  };

  const handleGroomPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setGroomPhotoFile(file);
    if (file) {
      setGroomPhotoPreview(URL.createObjectURL(file));
    } else {
      setGroomPhotoPreview(null);
    }
  };

  const handleSave = async () => {
    if (!slug) return;
    setIsSaving(true);
    try {
      await updateInvitation.mutateAsync({
        slug,
        brideName: formData.brideName,
        groomName: formData.groomName,
        weddingDate: formData.weddingDate,
        weddingTime: formData.weddingTime,
        venueName: formData.venueName,
        venueAddress: formData.venueAddress,
        googleMapsLink: formData.googleMapsLink,
        familyDetails: formData.familyDetails,
        invitationMessage: formData.invitationMessage,
        selectedTemplate: formData.selectedTemplate,
        colorScheme: formData.colorScheme,
        fontChoice: formData.fontChoice,
        backgroundChoice: formData.backgroundChoice,
      });

      // Upload photos if new files were selected
      if (bridePhotoFile || groomPhotoFile) {
        let brideBlob: ExternalBlob | null = null;
        let groomBlob: ExternalBlob | null = null;

        if (bridePhotoFile) {
          const bytes = new Uint8Array(await bridePhotoFile.arrayBuffer());
          brideBlob = ExternalBlob.fromBytes(bytes);
        } else if (invitation?.bridePhoto) {
          brideBlob = invitation.bridePhoto;
        }

        if (groomPhotoFile) {
          const bytes = new Uint8Array(await groomPhotoFile.arrayBuffer());
          groomBlob = ExternalBlob.fromBytes(bytes);
        } else if (invitation?.groomPhoto) {
          groomBlob = invitation.groomPhoto;
        }

        await addPhotos.mutateAsync({
          invitationId: slug,
          bridePhoto: brideBlob,
          groomPhoto: groomBlob,
        });
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const noop = () => {};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
          <p className="text-ivory/60">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <p className="text-ivory/60 mb-4">Invitation not found</p>
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="px-6 py-2 bg-gold text-white rounded-full hover:bg-gold/90 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-charcoal/95 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate({ to: '/dashboard' })}
                className="flex items-center gap-2 text-ivory/60 hover:text-ivory transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Dashboard</span>
              </button>
              <div className="h-4 w-px bg-gold/20" />
              <h1 className="text-ivory font-serif font-semibold">
                {invitation.brideName} &amp; {invitation.groomName}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate({ to: `/invitation/${slug}` })}
                className="flex items-center gap-2 px-4 py-2 text-ivory/70 hover:text-ivory border border-gold/30 hover:border-gold/60 rounded-full text-sm transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2 bg-gold text-white rounded-full text-sm font-medium hover:bg-gold/90 disabled:opacity-50 transition-colors"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saveSuccess ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-charcoal/80 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-gold text-gold'
                    : 'border-transparent text-ivory/50 hover:text-ivory/80'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'details' && (
          <div className="bg-ivory/5 rounded-2xl p-6 border border-gold/10">
            <CoupleDetailsStep onNext={noop} hideNavigation />

            {/* Separate Photo Upload Section in Editor */}
            <div className="mt-8 pt-8 border-t border-gold/20">
              <h3 className="text-lg font-serif font-semibold text-ivory mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-gold" />
                Couple Photos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bride Photo */}
                <div className="space-y-2">
                  <p className="text-sm text-ivory/70 font-medium">Bride Photo</p>
                  <div
                    className="relative border-2 border-dashed border-gold/30 rounded-xl overflow-hidden cursor-pointer hover:border-gold/60 transition-colors bg-gold/5"
                    style={{ minHeight: '180px' }}
                    onClick={() => bridePhotoRef.current?.click()}
                  >
                    {bridePhotoPreview ? (
                      <div className="relative">
                        <img
                          src={bridePhotoPreview}
                          alt="Bride"
                          className="w-full h-44 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setBridePhotoFile(null);
                            setBridePhotoPreview(null);
                            if (bridePhotoRef.current) bridePhotoRef.current.value = '';
                          }}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-44 gap-2 text-ivory/40">
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
                    onChange={handleBridePhotoChange}
                  />
                </div>

                {/* Groom Photo */}
                <div className="space-y-2">
                  <p className="text-sm text-ivory/70 font-medium">Groom Photo</p>
                  <div
                    className="relative border-2 border-dashed border-gold/30 rounded-xl overflow-hidden cursor-pointer hover:border-gold/60 transition-colors bg-gold/5"
                    style={{ minHeight: '180px' }}
                    onClick={() => groomPhotoRef.current?.click()}
                  >
                    {groomPhotoPreview ? (
                      <div className="relative">
                        <img
                          src={groomPhotoPreview}
                          alt="Groom"
                          className="w-full h-44 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setGroomPhotoFile(null);
                            setGroomPhotoPreview(null);
                            if (groomPhotoRef.current) groomPhotoRef.current.value = '';
                          }}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-44 gap-2 text-ivory/40">
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
                    onChange={handleGroomPhotoChange}
                  />
                </div>
              </div>
              <p className="text-xs text-ivory/40 mt-3">
                Photos will be saved when you click "Save Changes" above.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="bg-ivory/5 rounded-2xl p-6 border border-gold/10">
            <EventManagementStep
              invitationId={slug}
              onNext={noop}
              onBack={noop}
              hideNavigation
            />
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="bg-ivory/5 rounded-2xl p-6 border border-gold/10">
            <TemplateThemeStep hideNavigation />
          </div>
        )}

        {activeTab === 'media' && (
          <div className="bg-ivory/5 rounded-2xl p-6 border border-gold/10">
            <MediaManagementStep
              onNext={noop}
              onBack={noop}
              hideNavigation
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function InvitationEditor() {
  const { slug } = useParams({ from: '/edit/$slug' });

  return (
    <InvitationFormProvider>
      <EditorContent slug={slug} />
    </InvitationFormProvider>
  );
}
