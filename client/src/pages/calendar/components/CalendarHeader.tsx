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
      <div className="flex items-center space-x-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Calendar
        </h1>
        <Button 
          variant="outline" 
          onClick={handleToday}
          className="glass-card border-0 font-semibold hover:scale-105 transition-transform"
        >
          Today
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
          className="glass-card border-0 hover:scale-105 transition-transform"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold min-w-[220px] text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
          className="glass-card border-0 hover:scale-105 transition-transform"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}