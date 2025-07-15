import * as React from 'react';
import { CalendarEvent } from '../types/CalendarEvent';

export function useCalendarState() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);
  const [isEventDialogOpen, setIsEventDialogOpen] = React.useState(false);

  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: crypto.randomUUID(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  return {
    currentDate,
    selectedDate,
    events,
    isEventDialogOpen,
    setCurrentDate,
    setSelectedDate,
    setIsEventDialogOpen,
    addEvent,
    deleteEvent,
  };
}