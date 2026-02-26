import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ArrowLeft, Save, CheckCircle } from 'lucide-react';
import {
  useGetInvitationBySlug,
  useUpdateInvitation,
  useGetEventsByInvitation,
  useAddEvent,
  useUpdateEvent,
  useDeleteEvent,
  useGetPhotosByInvitation,
  useAddPhoto,
  useDeletePhoto,
  useGetBackgroundMusic,
  useSetBackgroundMusic,
  useAddPhotos,
} from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import type { EventData } from '../context/InvitationFormContext';
import EventCard from '../components/events/EventCard';
import EventForm from '../components/events/EventForm';
import PhotoGalleryUpload from '../components/media/PhotoGalleryUpload';
import MusicUploader from '../components/media/MusicUploader';
import { InvitationFormProvider, useInvitationForm } from '../context/InvitationFormContext';
import TemplateThemeStep from '../components/wizard/TemplateThemeStep';
import { EventType } from '../backend';

function EditorContent() {
  const { slug: invitationId } = useParams({ from: '/edit/$slug' });
  const navigate = useNavigate();

  const { data: invitation, isLoading: invLoading } = useGetInvitationBySlug(invitationId);
  const { data: events, isLoading: eventsLoading } = useGetEventsByInvitation(invitationId);
  const { data: photos } = useGetPhotosByInvitation(invitationId);
  const { data: musicList } = useGetBackgroundMusic(invitationId);

  const updateInvitation = useUpdateInvitation();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const addPhoto = useAddPhoto();
  const deletePhoto = useDeletePhoto();
  const setBackgroundMusic = useSetBackgroundMusic();
  const addPhotos = useAddPhotos();

  const { updateFormData } = useInvitationForm();

  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state for details tab
  const [details, setDetails] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    weddingTime: '',
    venueName: '',
    venueAddress: '',
    googleMapsLink: '',
    familyDetails: '',
    invitationMessage: '',
  });

  // Couple photos state
  const [bridePhotoFile, setBridePhotoFile] = useState<File | null>(null);
  const [groomPhotoFile, setGroomPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    if (invitation) {
      setDetails({
        brideName: invitation.brideName,
        groomName: invitation.groomName,
        weddingDate: invitation.weddingDate,
        weddingTime: invitation.weddingTime,
        venueName: invitation.venueName,
        venueAddress: invitation.venueAddress,
        googleMapsLink: invitation.googleMapsLink,
        familyDetails: invitation.familyDetails,
        invitationMessage: invitation.invitationMessage,
      });

      // Sync to form context for template preview
      updateFormData({
        brideName: invitation.brideName,
        groomName: invitation.groomName,
        weddingDate: invitation.weddingDate,
        weddingTime: invitation.weddingTime,
        venueName: invitation.venueName,
        venueAddress: invitation.venueAddress,
        selectedTemplate: invitation.selectedTemplate,
        colorScheme: invitation.colorScheme,
        fontChoice: invitation.fontChoice,
        backgroundChoice: invitation.backgroundChoice,
      });
    }
  }, [invitation, updateFormData]);

  const handleSaveDetails = async () => {
    if (!invitation) return;
    try {
      await updateInvitation.mutateAsync({
        slug: invitationId,
        ...details,
        selectedTemplate: invitation.selectedTemplate,
        colorScheme: invitation.colorScheme,
        fontChoice: invitation.fontChoice,
        backgroundChoice: invitation.backgroundChoice,
      });

      // Upload couple photos if changed
      if (bridePhotoFile || groomPhotoFile) {
        let brideBlob: ExternalBlob | null = null;
        let groomBlob: ExternalBlob | null = null;

        if (bridePhotoFile) {
          const bytes = new Uint8Array(await bridePhotoFile.arrayBuffer());
          brideBlob = ExternalBlob.fromBytes(bytes);
        }
        if (groomPhotoFile) {
          const bytes = new Uint8Array(await groomPhotoFile.arrayBuffer());
          groomBlob = ExternalBlob.fromBytes(bytes);
        }

        await addPhotos.mutateAsync({
          invitationId,
          bridePhoto: brideBlob,
          groomPhoto: groomBlob,
        });
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save details:', err);
    }
  };

  const handleAddEvent = async (event: EventData) => {
    await addEvent.mutateAsync({
      invitationId,
      eventId: event.id || `${invitationId}-event-${Date.now()}`,
      title: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue,
      description: event.description,
      eventType: event.eventType as EventType,
    });
    setShowEventForm(false);
  };

  const handleUpdateEvent = async (event: EventData) => {
    if (!editingEvent) return;
    await updateEvent.mutateAsync({
      eventId: editingEvent.id,
      invitationId,
      title: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue,
      description: event.description,
      eventType: event.eventType as EventType,
    });
    setEditingEvent(null);
    setShowEventForm(false);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Delete this event?')) return;
    await deleteEvent.mutateAsync({ eventId, invitationId });
  };

  const handleAddPhoto = async (imageUrl: string) => {
    await addPhoto.mutateAsync({
      invitationId,
      photoId: `${invitationId}-photo-${Date.now()}`,
      imageUrl,
    });
  };

  const handleDeletePhoto = async (photoId: string) => {
    await deletePhoto.mutateAsync({ photoId, invitationId });
  };

  const handleSaveMusic = async (musicUrl: string, autoPlay: boolean) => {
    await setBackgroundMusic.mutateAsync({
      invitationId,
      musicId: `${invitationId}-music-${Date.now()}`,
      musicUrl,
      autoPlay,
    });
  };

  if (invLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-50 dark:bg-charcoal-900">
        <Loader2 className="w-12 h-12 animate-spin text-gold-500" />
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-50 dark:bg-charcoal-900">
        <div className="text-center">
          <p className="text-crimson-500 text-lg mb-4">Invitation not found</p>
          <button onClick={() => navigate({ to: '/dashboard' })} className="text-gold-500 hover:underline">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-50 dark:bg-charcoal-900 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pt-6">
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="p-2 hover:bg-gold-50 dark:hover:bg-charcoal-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-charcoal-600 dark:text-ivory-300" />
          </button>
          <div>
            <h1 className="text-2xl font-serif text-charcoal-800 dark:text-ivory-100">
              Edit: {invitation.brideName} & {invitation.groomName}
            </h1>
            <p className="text-charcoal-500 dark:text-ivory-400 text-sm font-sans">/{invitationId}</p>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details">
            <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-6 shadow-soft border border-gold-100 dark:border-charcoal-700">
              <h2 className="text-xl font-serif text-charcoal-800 dark:text-ivory-100 mb-6">Couple Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Bride's Name", key: 'brideName' },
                  { label: "Groom's Name", key: 'groomName' },
                  { label: 'Wedding Date', key: 'weddingDate', type: 'date' },
                  { label: 'Wedding Time', key: 'weddingTime', type: 'time' },
                  { label: 'Venue Name', key: 'venueName' },
                  { label: 'Venue Address', key: 'venueAddress' },
                  { label: 'Google Maps Link', key: 'googleMapsLink' },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-sm font-sans text-charcoal-600 dark:text-ivory-300 mb-1">{label}</label>
                    <input
                      type={type || 'text'}
                      value={details[key as keyof typeof details]}
                      onChange={e => setDetails(prev => ({ ...prev, [key]: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gold-200 dark:border-charcoal-600 rounded-lg bg-ivory-50 dark:bg-charcoal-700 text-charcoal-800 dark:text-ivory-100 focus:outline-none focus:ring-2 focus:ring-gold-400 font-sans text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-sans text-charcoal-600 dark:text-ivory-300 mb-1">Family Details</label>
                <textarea
                  value={details.familyDetails}
                  onChange={e => setDetails(prev => ({ ...prev, familyDetails: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gold-200 dark:border-charcoal-600 rounded-lg bg-ivory-50 dark:bg-charcoal-700 text-charcoal-800 dark:text-ivory-100 focus:outline-none focus:ring-2 focus:ring-gold-400 font-sans text-sm resize-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-sans text-charcoal-600 dark:text-ivory-300 mb-1">Invitation Message</label>
                <textarea
                  value={details.invitationMessage}
                  onChange={e => setDetails(prev => ({ ...prev, invitationMessage: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gold-200 dark:border-charcoal-600 rounded-lg bg-ivory-50 dark:bg-charcoal-700 text-charcoal-800 dark:text-ivory-100 focus:outline-none focus:ring-2 focus:ring-gold-400 font-sans text-sm resize-none"
                />
              </div>

              {/* Couple Photos */}
              <div className="mb-6">
                <h3 className="text-lg font-serif text-charcoal-700 dark:text-ivory-200 mb-4">Couple Photos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bride Photo */}
                  <div>
                    <label className="block text-sm font-sans text-charcoal-600 dark:text-ivory-300 mb-2">Bride's Photo</label>
                    {invitation.bridePhoto && !bridePhotoFile && (
                      <img
                        src={invitation.bridePhoto.getDirectURL()}
                        alt="Bride"
                        className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-gold-200"
                      />
                    )}
                    {bridePhotoFile && (
                      <img
                        src={URL.createObjectURL(bridePhotoFile)}
                        alt="Bride preview"
                        className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-gold-400"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setBridePhotoFile(e.target.files?.[0] || null)}
                      className="text-sm text-charcoal-600 dark:text-ivory-300"
                    />
                  </div>

                  {/* Groom Photo */}
                  <div>
                    <label className="block text-sm font-sans text-charcoal-600 dark:text-ivory-300 mb-2">Groom's Photo</label>
                    {invitation.groomPhoto && !groomPhotoFile && (
                      <img
                        src={invitation.groomPhoto.getDirectURL()}
                        alt="Groom"
                        className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-gold-200"
                      />
                    )}
                    {groomPhotoFile && (
                      <img
                        src={URL.createObjectURL(groomPhotoFile)}
                        alt="Groom preview"
                        className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-gold-400"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setGroomPhotoFile(e.target.files?.[0] || null)}
                      className="text-sm text-charcoal-600 dark:text-ivory-300"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveDetails}
                disabled={updateInvitation.isPending || addPhotos.isPending}
                className="flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold rounded-full transition-all duration-300 shadow-luxury disabled:opacity-50"
              >
                {updateInvitation.isPending || addPhotos.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : saveSuccess ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saveSuccess ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-6 shadow-soft border border-gold-100 dark:border-charcoal-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-charcoal-800 dark:text-ivory-100">Wedding Events</h2>
                <button
                  onClick={() => { setEditingEvent(null); setShowEventForm(true); }}
                  className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold rounded-full text-sm transition-colors"
                >
                  + Add Event
                </button>
              </div>

              {eventsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
                </div>
              ) : (
                <div className="space-y-4">
                  {events?.map(event => {
                    // Convert backend Event to EventData for EventCard
                    const eventData: EventData = {
                      id: event.id,
                      title: event.title,
                      date: event.date,
                      time: event.time,
                      venue: event.venue,
                      description: event.description,
                      eventType: event.eventType,
                    };
                    return (
                      <EventCard
                        key={event.id}
                        event={eventData}
                        onEdit={(e) => { setEditingEvent(e); setShowEventForm(true); }}
                        onDelete={handleDeleteEvent}
                      />
                    );
                  })}
                  {(!events || events.length === 0) && !showEventForm && (
                    <p className="text-center text-charcoal-400 dark:text-ivory-500 py-8 font-sans">
                      No events added yet. Click "Add Event" to get started.
                    </p>
                  )}
                </div>
              )}

              {showEventForm && (
                <div className="mt-6 border-t border-gold-100 dark:border-charcoal-700 pt-6">
                  <EventForm
                    initialEvent={editingEvent || undefined}
                    onSave={editingEvent ? handleUpdateEvent : handleAddEvent}
                    onCancel={() => { setShowEventForm(false); setEditingEvent(null); }}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme">
            <TemplateThemeStep
              invitationId={invitationId}
            />
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <div className="space-y-6">
              <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-6 shadow-soft border border-gold-100 dark:border-charcoal-700">
                <h2 className="text-xl font-serif text-charcoal-800 dark:text-ivory-100 mb-6">Photo Gallery</h2>
                <PhotoGalleryEditorSection
                  photos={photos?.map(p => ({ id: p.id, url: p.imageUrl })) || []}
                  onAdd={handleAddPhoto}
                  onDelete={handleDeletePhoto}
                />
              </div>

              <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-6 shadow-soft border border-gold-100 dark:border-charcoal-700">
                <h2 className="text-xl font-serif text-charcoal-800 dark:text-ivory-100 mb-6">Background Music</h2>
                <MusicEditorSection
                  existingMusic={musicList?.[0] ? { url: musicList[0].musicUrl, autoPlay: musicList[0].autoPlay } : undefined}
                  onSave={handleSaveMusic}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Inline photo gallery editor for the editor page (doesn't use form context)
function PhotoGalleryEditorSection({
  photos,
  onAdd,
  onDelete,
}: {
  photos: { id: string; url: string }[];
  onAdd: (url: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) onAdd(dataUrl);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gold-300 dark:border-charcoal-600 rounded-xl cursor-pointer hover:border-gold-400 transition-colors bg-gold-50/50 dark:bg-charcoal-700/50 mb-4">
        <span className="text-sm text-charcoal-500 dark:text-ivory-400 font-sans">Click to upload photos</span>
        <input type="file" accept="image/*" multiple onChange={e => handleFiles(e.target.files)} className="hidden" />
      </label>
      {photos.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map(photo => (
            <div key={photo.id} className="relative group aspect-square">
              <img src={photo.url} alt="" className="w-full h-full object-cover rounded-xl" />
              <button
                onClick={() => onDelete(photo.id)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Inline music editor for the editor page (doesn't use form context)
function MusicEditorSection({
  existingMusic,
  onSave,
}: {
  existingMusic?: { url: string; autoPlay: boolean };
  onSave: (url: string, autoPlay: boolean) => Promise<void>;
}) {
  const [autoPlay, setAutoPlay] = useState(existingMusic?.autoPlay ?? false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('audio/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) onSave(dataUrl, autoPlay);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {existingMusic?.url && (
        <div className="mb-4 p-3 bg-gold-50 dark:bg-gold-900/20 rounded-lg">
          <p className="text-sm text-charcoal-600 dark:text-ivory-300 font-sans mb-2">Current music uploaded</p>
          <audio controls src={existingMusic.url} className="w-full h-8" />
        </div>
      )}
      <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gold-300 dark:border-charcoal-600 rounded-xl cursor-pointer hover:border-gold-400 transition-colors bg-gold-50/50 dark:bg-charcoal-700/50 mb-3">
        <span className="text-sm text-charcoal-500 dark:text-ivory-400 font-sans">
          {existingMusic?.url ? 'Replace music file' : 'Upload music file'}
        </span>
        <input type="file" accept="audio/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={autoPlay}
          onChange={e => setAutoPlay(e.target.checked)}
          className="w-4 h-4 accent-gold-500"
        />
        <span className="text-sm text-charcoal-600 dark:text-ivory-300 font-sans">Auto-play when invitation opens</span>
      </label>
    </div>
  );
}

export default function InvitationEditor() {
  return (
    <InvitationFormProvider>
      <EditorContent />
    </InvitationFormProvider>
  );
}
