const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    breweryId: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Review', ReviewSchema);
