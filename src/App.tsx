import React from 'react';
import './index.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import { Home, About, Projects, Voyage} from './pages';


const App = () => {
  return (
    <main className=' bg-slate-300/20'>
        <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/voyage" element={<Voyage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
