import React, { useState } from 'react';
import { useInvitationForm, LocalEvent } from '@/context/InvitationFormContext';
import EventCard from '../events/EventCard';
import EventForm from '../events/EventForm';
import { Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { EventType } from '@/backend';

interface EventManagementStepProps {
  onNext: () => void;
  onBack: () => void;
  hideNavigation?: boolean;
  invitationId?: string;
}

export default function EventManagementStep({ onNext, onBack, hideNavigation }: EventManagementStepProps) {
  const { formData, addEvent, updateEvent, deleteEvent } = useInvitationForm();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<LocalEvent | null>(null);

  const handleAddEvent = (event: LocalEvent) => {
    if (editingEvent) {
      updateEvent(event);
    } else {
      addEvent(event);
    }
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: LocalEvent) => {
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

  const sortedEvents = [...formData.events].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="luxury-card rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-charcoal">Wedding Events</h2>
        {!showForm && (
          <button
            onClick={() => { setEditingEvent(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-elegant text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-luxury"
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
            onSave={handleAddEvent}
            onCancel={handleCancel}
          />
        </div>
      )}

      {sortedEvents.length === 0 && !showForm ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🎊</div>
          <p className="font-serif text-charcoal-light text-lg mb-2">No events added yet</p>
          <p className="font-elegant text-charcoal-light text-sm">
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
