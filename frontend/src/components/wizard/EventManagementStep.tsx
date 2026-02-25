import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/events/EventCard';
import EventForm from '@/components/events/EventForm';
import { useInvitationForm, LocalEvent } from '@/context/InvitationFormContext';
import { EventType } from '@/backend';

export default function EventManagementStep() {
  const { formData, updateFormData } = useInvitationForm();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<LocalEvent | null>(null);

  const handleAddEvent = (eventData: Omit<LocalEvent, 'id'>) => {
    const newEvent: LocalEvent = {
      ...eventData,
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    updateFormData({ events: [...formData.events, newEvent] });
    setShowForm(false);
  };

  const handleEditEvent = (eventData: Omit<LocalEvent, 'id'>) => {
    if (!editingEvent) return;
    const updated = formData.events.map(e =>
      e.id === editingEvent.id ? { ...eventData, id: e.id } : e
    );
    updateFormData({ events: updated });
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      updateFormData({ events: formData.events.filter(e => e.id !== eventId) });
    }
  };

  const handleStartEdit = (event: LocalEvent) => {
    setEditingEvent(event);
    setShowForm(false);
  };

  const sortedEvents = [...formData.events].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-gold-dark mb-2">
          Wedding Events
        </h2>
        <p className="font-inter text-muted-foreground">
          Add all your wedding celebrations
        </p>
      </div>

      {/* Add Event Button */}
      {!showForm && !editingEvent && (
        <Button
          onClick={() => setShowForm(true)}
          className="btn-gold w-full rounded-2xl py-6 font-cinzel text-base tracking-wider"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Wedding Event
        </Button>
      )}

      {/* Add Event Form */}
      {showForm && (
        <EventForm
          onSave={handleAddEvent}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Edit Event Form */}
      {editingEvent && (
        <EventForm
          initialData={editingEvent}
          onSave={handleEditEvent}
          onCancel={() => setEditingEvent(null)}
        />
      )}

      {/* Events Grid */}
      {sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleStartEdit}
              onDelete={handleDeleteEvent}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      ) : (
        !showForm && (
          <div className="text-center py-16 border-2 border-dashed border-gold/20 rounded-2xl">
            <Calendar className="w-12 h-12 text-gold/40 mx-auto mb-4" />
            <p className="font-cinzel text-lg text-muted-foreground">No events added yet</p>
            <p className="font-inter text-sm text-muted-foreground mt-1">
              Add Haldi, Mehndi, Sangeet, and more
            </p>
          </div>
        )
      )}
    </div>
  );
}
