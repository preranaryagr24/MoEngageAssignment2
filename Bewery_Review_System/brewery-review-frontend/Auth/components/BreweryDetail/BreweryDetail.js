import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
      await axios.post(`/api/breweries/${id}/review`, { rating, description });
      setReviews([...reviews, { rating, description }]);
      setRating(0);
      setDescription('');
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!brewery) return <div>Loading...</div>;

  return (
    <div>
      <h2>{brewery.name}</h2>
      <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
      <p>Phone: {brewery.phone}</p>
      <p><a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Website</a></p>

      <h3>Reviews</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>Rating: {review.rating}</p>
            <p>{review.description}</p>
          </li>
        ))}
      </ul>

      <h3>Add Review</h3>
      <form onSubmit={handleAddReview}>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}

export default BreweryDetail;
