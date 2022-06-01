import React, { useEffect } from 'react';
import logo from './logo.svg';
import Dashboard from './features/dashboard';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
