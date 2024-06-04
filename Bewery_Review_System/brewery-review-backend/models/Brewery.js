const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define Brewery Schema
const brewerySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  website_url: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, { timestamps: true });

// Create Brewery model
const Brewery = mongoose.model('Brewery', brewerySchema);

module.exports = Brewery;
