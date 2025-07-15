import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { CalendarEvent } from '../types/CalendarEvent';

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  onEventAdd: (event: Omit<CalendarEvent, 'id'>) => void;
}

export function EventDialog({ isOpen, onClose, selectedDate, onEventAdd }: EventDialogProps) {
  const [title, setTitle] = React.useState('');
  const [time, setTime] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !title.trim()) return;

    onEventAdd({
      title: title.trim(),
      date: selectedDate,
      time: time || 'All day',
      description: description.trim(),
    });

    setTitle('');
    setTime('');
    setDescription('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setTime('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Add Event {selectedDate && `- ${format(selectedDate, 'MMMM d, yyyy')}`}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description (optional)"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}