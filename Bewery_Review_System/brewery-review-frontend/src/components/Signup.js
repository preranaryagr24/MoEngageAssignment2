 
import axios from 'axios';
import { useState } from 'react';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, password };  
      await axios.post('http://localhost:5000/api/v1/users/register', userData);
      // Redirect or perform any other action after successful signup
    } catch (error) {
      console.error('Sign-up failed', error.response ? error.response.data : error.message);
      alert('Signup failed');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label><br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <label htmlFor="email">Email:</label><br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export async function handleSubmit(e, name, email, password) {
  e.preventDefault();
  const userData = { name, email, password };
  
  try {
    const response = await axios.post('http://localhost:5000/api/v1/users/register', userData);
    console.log('Sign-up successful', response.data);
  } catch (error) {
    console.error('Sign-up failed', error.response ? error.response.data : error.message);
  }
}

export default Signup;
