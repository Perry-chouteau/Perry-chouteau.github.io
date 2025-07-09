import React from 'react';
import './index.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import { Home, Projects, Voyage} from './pages';

const App = () => {
  return (
    <main className=' bg-slate-300/20 h-full'>
        <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/voyage" element={<Voyage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
