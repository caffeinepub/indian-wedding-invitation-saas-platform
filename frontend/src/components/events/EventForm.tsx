import React, { useState } from 'react';
import { EventData } from '@/context/InvitationFormContext';
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

const EVENT_TYPES: Array<{ value: EventType | string; label: string }> = [
  { value: EventType.haldi, label: 'Haldi' },
  { value: EventType.mehndi, label: 'Mehndi' },
  { value: EventType.sangeet, label: 'Sangeet' },
  { value: EventType.wedding, label: 'Wedding' },
  { value: EventType.reception, label: 'Reception' },
  { value: EventType.custom, label: 'Custom' },
];

export default function EventForm({ initialEvent, onSave, onCancel }: EventFormProps) {
  const [title, setTitle] = useState(initialEvent?.title || '');
  const [date, setDate] = useState(initialEvent?.date || '');
  const [time, setTime] = useState(initialEvent?.time || '');
  const [venue, setVenue] = useState(initialEvent?.venue || '');
  const [description, setDescription] = useState(initialEvent?.description || '');
  const [eventType, setEventType] = useState<EventType | string>(
    initialEvent?.eventType || EventType.wedding
  );

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
    <div className="bg-muted/30 rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {initialEvent ? 'Edit Event' : 'Add New Event'}
      </h3>

      {/* Event Type Selector */}
      <div className="mb-4">
        <Label className="text-foreground mb-2 block">Event Type</Label>
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map(type => (
            <button
              key={type.value}
              onClick={() => setEventType(type.value)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all min-h-[36px] ${
                eventType === type.value
                  ? 'bg-gold-500 text-white shadow-gold'
                  : 'border border-border text-foreground hover:border-gold-400'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="text-foreground mb-2 block">Event Title *</Label>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., Wedding Ceremony"
            className="min-h-[44px]"
          />
        </div>
        <div>
          <Label className="text-foreground mb-2 block">Date</Label>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="min-h-[44px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="text-foreground mb-2 block">Time</Label>
          <Input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="min-h-[44px]"
          />
        </div>
        <div>
          <Label className="text-foreground mb-2 block">Venue</Label>
          <Input
            value={venue}
            onChange={e => setVenue(e.target.value)}
            placeholder="Event venue"
            className="min-h-[44px]"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-foreground mb-2 block">Description</Label>
        <Textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Brief description of the event..."
          rows={2}
          className="resize-none"
        />
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 border border-border text-foreground hover:bg-muted font-medium text-sm px-4 py-2 rounded-full transition-colors min-h-[44px]"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!title}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-medium text-sm px-4 py-2 rounded-full transition-colors shadow-gold disabled:opacity-50 min-h-[44px]"
        >
          <Save className="w-4 h-4" />
          {initialEvent ? 'Update' : 'Add'} Event
        </button>
      </div>
    </div>
  );
}
