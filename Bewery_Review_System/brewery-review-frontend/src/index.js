 
import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import './styles/styles.css';

// Use createRoot for React version 18 or later
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Router>
);
