import React from 'react';
import './Description.css';

export default function Description() {
  return (
    <div class="description">
      A trading strategy that compares recent price movements to similar ones
      from the past. A "base pattern" (consisting of two or more
      recently-completed bars) are matched with similar historical bar patterns
      to find high-confidence trades.
    </div>
  );
}
