import React from 'react';
import AppRouter from './router';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      {/* The AppRouter now controls which layout is used */}
      <AppRouter />
    </LanguageProvider>
  );
}

export default App;
