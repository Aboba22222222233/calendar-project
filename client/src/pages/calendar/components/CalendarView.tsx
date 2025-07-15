import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { CalendarEvent } from '../types/CalendarEvent';

interface CalendarViewProps {
  currentDate: Date;
  selectedDate: Date | undefined;
  events: CalendarEvent[];
  onDateSelect: (date: Date | undefined) => void;
  onEventCreate: () => void;
  onEventDelete: (eventId: string) => void;
}

export function CalendarView({
  currentDate,
  selectedDate,
  events,
  onDateSelect,
  onEventCreate,
  onEventDelete
}: CalendarViewProps) {
  const selectedDateEvents = events.filter(event => 
    selectedDate && isSameDay(event.date, selectedDate)
  );

  const gradientColors = [
    'from-pink-400 to-rose-500',
    'from-purple-400 to-indigo-500',
    'from-blue-400 to-cyan-500',
    'from-green-400 to-emerald-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-pink-500'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="glass-card border-0 shadow-2xl">
          <CardContent className="p-8">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              month={currentDate}
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
            {selectedDate && (
              <Button
                size="sm"
                onClick={onEventCreate}
                className="gradient-button border-0 hover:scale-105 transition-transform"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${gradientColors[index % gradientColors.length]} text-white shadow-lg hover:shadow-xl transition-shadow`}
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{event.title}</div>
                        <div className="text-sm opacity-90 font-medium">
                          {event.time}
                        </div>
                        {event.description && (
                          <div className="text-sm opacity-80 mt-1">
                            {event.description}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEventDelete(event.id)}
                        className="hover:bg-white/20 text-white hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <div className="text-lg font-medium">No events scheduled</div>
                  <div className="text-sm">Create your first event for this date</div>
                </div>
              )
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <div className="text-6xl mb-4">👆</div>
                <div className="text-lg font-medium">Select a date</div>
                <div className="text-sm">Choose a date to view and manage events</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}