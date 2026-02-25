import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventType } from '@/backend';
import { EVENT_CONFIGS } from '@/utils/eventIcons';
import { LocalEvent } from '@/context/InvitationFormContext';

interface EventFormProps {
  initialData?: Partial<LocalEvent>;
  onSave: (event: Omit<LocalEvent, 'id'>) => void;
  onCancel: () => void;
}

export default function EventForm({ initialData, onSave, onCancel }: EventFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [time, setTime] = useState(initialData?.time || '');
  const [venue, setVenue] = useState(initialData?.venue || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [eventType, setEventType] = useState<EventType>(initialData?.eventType || EventType.wedding);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !time || !venue.trim()) return;
    onSave({ title, date, time, venue, description, eventType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6 luxury-card animate-scale-in">
      <h3 className="font-cinzel text-lg font-bold text-gold-dark">
        {initialData?.title ? 'Edit Event' : 'Add New Event'}
      </h3>

      {/* Event Type */}
      <div className="space-y-2">
        <Label className="font-cinzel text-sm font-semibold tracking-wide">Event Type *</Label>
        <Select value={eventType} onValueChange={(v) => setEventType(v as EventType)}>
          <SelectTrigger className="input-luxury font-inter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(EVENT_CONFIGS).map(([type, config]) => (
              <SelectItem key={type} value={type} className="font-inter">
                <div className="flex items-center gap-2">
                  <span>{config.icon}</span>
                  <span>{config.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label className="font-cinzel text-sm font-semibold tracking-wide">Event Title *</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Haldi Ceremony"
          className="input-luxury font-inter"
          required
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-cinzel text-sm font-semibold tracking-wide">Date *</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-luxury font-inter"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="font-cinzel text-sm font-semibold tracking-wide">Time *</Label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input-luxury font-inter"
            required
          />
        </div>
      </div>

      {/* Venue */}
      <div className="space-y-2">
        <Label className="font-cinzel text-sm font-semibold tracking-wide">Venue *</Label>
        <Input
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          placeholder="Venue name and address"
          className="input-luxury font-inter"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="font-cinzel text-sm font-semibold tracking-wide">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional details about this event..."
          rows={3}
          className="input-luxury font-inter resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="btn-gold flex-1 rounded-full font-cinzel tracking-wider">
          Save Event
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 rounded-full font-cinzel">
          Cancel
        </Button>
      </div>
    </form>
  );
}
