// src/App.jsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Home />
    </div>
  );
}

export default App;