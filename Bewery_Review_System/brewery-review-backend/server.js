 
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
// app.use(cors({
//   origin: 'http://localhost:3000', // Adjust if your frontend runs on a different port
//   credentials: true
// }));
// app.use(express.json());

// // Connect to MongoDB
// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Define your routes here
// app.post('/api/users/login', (req, res) => {
//     const { username, password } = req.body;
//     // Mock response for testing
//     if (username === 'test' && password === 'password') {
//         res.json({ token: 'fake-jwt-token' });
//     } else {
//         res.status(401).json({ message: 'Invalid credentials' });
//     }
// });

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../brewery-review-frontend/build')));

// app.get('/api', (req, res) => {
//     res.json({ message: 'API is working' });
// });

// // Handle any other route by serving the React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../brewery-review-frontend/build', 'index.html'));
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false); 
const cookieParser = require('cookie-parser');
const cors = require('cors');
const asyncErrors = require('express-async-errors');

const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');
const verifyJWT = require('./middlewares/verifyJWT');
const credentials = require('./middlewares/credentials');
const corsOptions = require('./config/corsOptions');

const userRoutes = require('./routes/userRoutes');
const { addReview, getReview } = require('./controllers/reviewController');

dotenv.config();

const app = express();

// Middleware
app.use(credentials);
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

const baseUrl = "/api/v1";

app.use(`${baseUrl}/users`, userRoutes);

app.get("/getReview/:brewerId", getReview);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(verifyJWT);
app.post("/addReview", addReview);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
