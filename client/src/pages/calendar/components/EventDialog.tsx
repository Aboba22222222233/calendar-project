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
      <DialogContent className="sm:max-w-[500px] glass-card border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add Event {selectedDate && `- ${format(selectedDate, 'MMMM d, yyyy')}`}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">Event Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
              className="glass-card border-0 text-base py-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time" className="text-base font-semibold">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="glass-card border-0 text-base py-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description (optional)"
              className="glass-card border-0 text-base py-3"
            />
          </div>
          <DialogFooter className="gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="glass-card border-0 hover:scale-105 transition-transform"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="gradient-button border-0 hover:scale-105 transition-transform"
            >
              Add Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}