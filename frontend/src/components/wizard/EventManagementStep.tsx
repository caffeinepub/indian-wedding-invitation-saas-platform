import React, { useState } from 'react';
import { useInvitationForm, LocalEvent, EventData } from '@/context/InvitationFormContext';
import EventCard from '../events/EventCard';
import EventForm from '../events/EventForm';
import { Plus, ChevronRight, ChevronLeft } from 'lucide-react';

interface EventManagementStepProps {
  onNext: () => void;
  onBack: () => void;
  hideNavigation?: boolean;
  invitationId?: string;
}

export default function EventManagementStep({ onNext, onBack, hideNavigation }: EventManagementStepProps) {
  const { formData, addEvent, updateEvent, deleteEvent } = useInvitationForm();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);

  const handleSaveEvent = (event: EventData) => {
    if (editingEvent) {
      updateEvent(event);
    } else {
      addEvent({ ...event, isNew: true } as LocalEvent);
    }
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: EventData) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteEvent(id);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const activeEvents = formData.events.filter(e => !e.isDeleted);
  const sortedEvents = [...activeEvents].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif text-foreground">Wedding Events</h2>
        {!showForm && (
          <button
            onClick={() => { setEditingEvent(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-medium text-sm px-4 py-2 rounded-full transition-all shadow-gold min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <EventForm
            initialEvent={editingEvent}
            onSave={handleSaveEvent}
            onCancel={handleCancel}
          />
        </div>
      )}

      {sortedEvents.length === 0 && !showForm ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🎊</div>
          <p className="text-muted-foreground text-lg mb-2">No events added yet</p>
          <p className="text-muted-foreground text-sm">
            Add your wedding events like Haldi, Mehndi, Sangeet, Wedding, and Reception.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {sortedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!hideNavigation && (
        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 border border-border text-foreground hover:bg-muted font-medium px-6 py-3 rounded-full transition-all min-h-[44px]"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-medium px-8 py-3 rounded-full transition-all shadow-gold min-h-[44px]"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
