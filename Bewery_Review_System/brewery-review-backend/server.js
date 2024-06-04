 
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// // Initialize Express app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Serve static files (React app)
// app.use(express.static(path.join(__dirname, 'client/build')));

// // API routes
// app.get('/api', (req, res) => {
//     res.json({ message: 'API is working' });
// });

// // Handle any other route by serving the React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust if your frontend runs on a different port
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define your routes here
app.post('/api/users/login', (req, res) => {
    const { username, password } = req.body;
    // Mock response for testing
    if (username === 'test' && password === 'password') {
        res.json({ token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../brewery-review-frontend/build')));

app.get('/api', (req, res) => {
    res.json({ message: 'API is working' });
});

// Handle any other route by serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../brewery-review-frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
