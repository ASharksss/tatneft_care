import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ObjectPage from './pages/ObjectPage/ObjectPage';
import { ThemeProvider } from './hooks/useTheme';
import './assets/styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" index element={<HomePage />} />
            <Route path="/object/:id" element={<ObjectPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;