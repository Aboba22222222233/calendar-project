import * as React from 'react';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarView } from './components/CalendarView';
import { EventDialog } from './components/EventDialog';
import { useCalendarState } from './hooks/useCalendarState';

export function CalendarPage() {
  const {
    currentDate,
    selectedDate,
    events,
    isEventDialogOpen,
    setCurrentDate,
    setSelectedDate,
    setIsEventDialogOpen,
    addEvent,
    deleteEvent
  } = useCalendarState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <CalendarHeader
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />
        <CalendarView
          currentDate={currentDate}
          selectedDate={selectedDate}
          events={events}
          onDateSelect={setSelectedDate}
          onEventCreate={() => setIsEventDialogOpen(true)}
          onEventDelete={deleteEvent}
        />
        <EventDialog
          isOpen={isEventDialogOpen}
          onClose={() => setIsEventDialogOpen(false)}
          selectedDate={selectedDate}
          onEventAdd={addEvent}
        />
      </div>
    </div>
  );
}