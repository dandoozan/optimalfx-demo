import React from 'react';
import './Description.css';

export default function Description() {
  return (
    <div className="description">
      <p>
        A trading strategy that compares recent price movements to similar ones
        from the past. A "base pattern" (consisting of two or more
        recently-completed bars) are matched with similar historical bar
        patterns to find high-confidence trades.
      </p>
      <p>See a demo of how it works in the simulation below.</p>
    </div>
  );
}
