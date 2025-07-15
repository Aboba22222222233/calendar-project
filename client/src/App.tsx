import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CalendarPage } from './pages/calendar/CalendarPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;