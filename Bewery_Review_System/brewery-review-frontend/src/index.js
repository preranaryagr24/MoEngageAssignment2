import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import './styles/styles.css'
// Use ReactDOM.createRoot for React version 18 or later
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Router>
);
