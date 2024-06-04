import express from 'express';
import axios from 'axios';
import Review from '../../brewery-review-frontend/src/components/Review.js';

const router = express.Router();

// Search Breweries
router.get('/search', async (req, res) => {
    const { by, value } = req.query;
    try {
        const response = await axios.get(`https://api.openbrewerydb.org/breweries?by_${by}=${value}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get Brewery Details
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://api.openbrewerydb.org/breweries/${req.params.id}`);
        const reviews = await Review.find({ breweryId: req.params.id });
        res.json({ ...response.data, reviews });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add Review
router.post('/:id/review', async (req, res) => {
    const { rating, description } = req.body;
    try {
        const newReview = new Review({ breweryId: req.params.id, rating, description });
        await newReview.save();
        res.status(201).send('Review added');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
