import React from 'react';
import './App.css';
import Header from './Header';
import Simulation from '../Simulation/Simulation';
import Description from './Description';

function App() {
  return (
    <div className="app">
      <Header />
      <Description />
      <Simulation />
    </div>
  );
}

export default App;
