import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Simulation from '../Simulation/Simulation';
import Description from '../Description/Description';

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
