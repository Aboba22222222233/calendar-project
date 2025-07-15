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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
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
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
            {selectedDate && (
              <Button
                size="sm"
                onClick={onEventCreate}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Event
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.time}
                        </div>
                        {event.description && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEventDelete(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No events scheduled for this date
                </div>
              )
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Select a date to view events
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}