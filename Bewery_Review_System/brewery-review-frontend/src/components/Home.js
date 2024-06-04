import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { loggedIn, user } = useAuth();

  return (
    <div>
      <h1>Welcome to Brewery Review System</h1>
      {loggedIn ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>This is the landing page content for authenticated users.</p>
          <p>Access the review and search pages from the navbar.</p>
        </div>
      ) : (
        <div>
          <p>This is the landing page content for guests.</p>
          <p>Please sign in or sign up to access the review and search pages.</p>
          <Link to="/login">Login</Link>
          <span> or </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
