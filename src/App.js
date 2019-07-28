import React from 'react';
import AppRouter from './features/Router';
import './firebase/firebase';
import './App.scss';

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
