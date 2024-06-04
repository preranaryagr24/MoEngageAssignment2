import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/Signup';
import Review from './components/Review';
import Search from './components/Search';
import BreweryDetail from './components/BreweryDetail';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Navbar /> {/* Include the Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/review" element={<PrivateRoute element={<Review />} />} />
        <Route path="/search" element={<PrivateRoute element={<Search />} />} />
        <Route path="/brewery/:id" element={<PrivateRoute element={<BreweryDetail />} />} />
      </Routes>
    </>
  );
}

export default App;
