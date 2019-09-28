import React from 'react';
import styles from './App.module.css';
import Header from './Header';
import Simulation from '../Simulation/Simulation';
import Description from './Description';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Description />
      <Simulation />
    </div>
  );
}

export default App;
