import React, { useState } from 'react';
import { EventData } from '@/context/InvitationFormContext';
import { getEventConfig } from '@/utils/eventIcons';
import { EventType } from '@/backend';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';

interface EventFormProps {
  initialEvent?: EventData | null;
  onSave: (event: EventData) => void;
  onCancel: () => void;
}

const EVENT_TYPES: EventType[] = [
  EventType.haldi,
  EventType.mehndi,
  EventType.sangeet,
  EventType.wedding,
  EventType.reception,
  EventType.custom,
];

export default function EventForm({ initialEvent, onSave, onCancel }: EventFormProps) {
  const [title, setTitle] = useState(initialEvent?.title || '');
  const [date, setDate] = useState(initialEvent?.date || '');
  const [time, setTime] = useState(initialEvent?.time || '');
  const [venue, setVenue] = useState(initialEvent?.venue || '');
  const [description, setDescription] = useState(initialEvent?.description || '');
  const [eventType, setEventType] = useState<EventType>(initialEvent?.eventType || EventType.wedding);

  const handleSave = () => {
    if (!title) return;
    const event: EventData = {
      id: initialEvent?.id || `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      date,
      time,
      venue,
      description,
      eventType,
    };
    onSave(event);
  };

  return (
    <div className="bg-ivory-dark rounded-2xl p-6 border border-gold/20">
      <h3 className="font-display text-lg text-charcoal mb-4">
        {initialEvent ? 'Edit Event' : 'Add New Event'}
      </h3>

      {/* Event Type Selector */}
      <div className="mb-4">
        <Label className="font-elegant text-charcoal mb-2 block">Event Type</Label>
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map(type => {
            const config = getEventConfig(type);
            return (
              <button
                key={type}
                onClick={() => setEventType(type)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-elegant transition-all ${
                  eventType === type
                    ? 'bg-gold text-charcoal shadow-luxury'
                    : 'border border-gold/30 text-charcoal hover:border-gold'
                }`}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="font-elegant text-charcoal mb-2 block">Event Title *</Label>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., Wedding Ceremony"
            className="border-gold/30 focus:border-gold"
          />
        </div>
        <div>
          <Label className="font-elegant text-charcoal mb-2 block">Date</Label>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border-gold/30 focus:border-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="font-elegant text-charcoal mb-2 block">Time</Label>
          <Input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="border-gold/30 focus:border-gold"
          />
        </div>
        <div>
          <Label className="font-elegant text-charcoal mb-2 block">Venue</Label>
          <Input
            value={venue}
            onChange={e => setVenue(e.target.value)}
            placeholder="Event venue"
            className="border-gold/30 focus:border-gold"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label className="font-elegant text-charcoal mb-2 block">Description</Label>
        <Textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Brief description of the event..."
          rows={2}
          className="border-gold/30 focus:border-gold"
        />
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 border border-charcoal/30 text-charcoal hover:bg-charcoal/10 font-elegant text-sm px-4 py-2 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!title}
          className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-elegant text-sm px-4 py-2 rounded-full transition-colors shadow-luxury disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {initialEvent ? 'Update' : 'Add'} Event
        </button>
      </div>
    </div>
  );
}
