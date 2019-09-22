import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <h1>
          OptimalFX <small className="text-muted">Demo</small>
        </h1>
      </div>
    </header>
  );
}
