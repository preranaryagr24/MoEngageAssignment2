 
// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false); 
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const asyncErrors = require('express-async-errors');

// const errorHandlerMiddleware = require('./middlewares/error-handler');
// const notFoundMiddleware = require('./middlewares/not-found');
// const verifyJWT = require('./middlewares/verifyJWT');
// const credentials = require('./middlewares/credentials');
// const corsOptions = require('./config/corsOptions');

// const userRoutes = require('./routes/userRoutes');
// const { addReview, getReview } = require('./controllers/reviewController');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(credentials);
// app.use(cors(corsOptions));
// app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(cookieParser());

// const baseUrl = "/api/v1";

// app.use(`${baseUrl}/users`, userRoutes);

// app.get("/getReview/:brewerId", getReview);

// // Test endpoint
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

// app.use(verifyJWT);
// app.post("/addReview", addReview);

// app.use(errorHandlerMiddleware);
// app.use(notFoundMiddleware);

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//   )
//   .catch((error) => console.log(error.message));
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const userRoutes = require('./routes/userRoutes.js');
const credentials = require('./middlewares/credentials.js');
const errorHandlerMiddleware = require('./middlewares/error-handler.js');
const notFoundMiddleware = require('./middlewares/not-found.js');

dotenv.config();

const app = express();

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

const baseUrl = '/api/v1';
app.use(`${baseUrl}/users`, userRoutes);

// Test endpoint
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
