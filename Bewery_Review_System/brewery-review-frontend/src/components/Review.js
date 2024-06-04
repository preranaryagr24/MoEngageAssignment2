// const mongoose = require('mongoose');

// const ReviewSchema = new mongoose.Schema({
//     breweryId: { type: String, required: true },
//     rating: { type: Number, required: true },
//     description: { type: String, required: true }
// });

// const Review = mongoose.model('Review', ReviewSchema);
// module.exports = Review;
// Define Review schema as a plain JavaScript object
const ReviewSchema = {
    breweryId: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true }
};

module.exports=  ReviewSchema;
