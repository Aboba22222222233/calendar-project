import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function CalendarHeader({ currentDate, onDateChange }: CalendarHeaderProps) {
  const handlePreviousMonth = () => {
    onDateChange(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    onDateChange(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Button variant="outline" onClick={handleToday}>
          Today
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold min-w-[200px] text-center">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}