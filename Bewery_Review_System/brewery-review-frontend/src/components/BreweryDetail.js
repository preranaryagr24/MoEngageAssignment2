import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/styles.css'; 

function BreweryDetail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const response = await axios.get(`/api/breweries/${id}`);
        setBrewery(response.data);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBrewery();
  }, [id]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to submit a review');
        return;
      }

      await axios.post(`/api/breweries/${id}/review`, { rating, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setReviews([...reviews, { rating, description }]);
      setRating(0);
      setDescription('');
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!brewery) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Brewery Details</h2>
      <div id="breweryInfo">
        <h3>{brewery.name}</h3>
        <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
        <p>Phone: {brewery.phone}</p>
        <p><a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Website</a></p>
      </div>

      <h3>Reviews</h3>
      <ul id="reviews">
        {reviews.map((review, index) => (
          <li key={index}>
            <p>Rating: {review.rating}</p>
            <p>{review.description}</p>
          </li>
        ))}
      </ul>

      <h3>Add Review</h3>
      <form id="reviewForm" onSubmit={handleAddReview}>
        <label htmlFor="rating">Rating (1-5):</label><br />
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        /><br />
        <label htmlFor="description">Description:</label><br />
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br /><br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default BreweryDetail;
