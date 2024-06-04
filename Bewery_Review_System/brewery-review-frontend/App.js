import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Search from './components/Search/Search';
import BreweryDetail from './components/BreweryDetail/BreweryDetail';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={<Search />} />
      <Route path="/brewery/:id" element={<BreweryDetail />} />
    </Routes>
  );
}

export default App;
