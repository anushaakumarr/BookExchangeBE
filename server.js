require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Importing routes
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Debugging route imports
console.log('Auth Routes:', authRoutes);
console.log('Book Routes:', bookRoutes);
console.log('Exchange Routes:', exchangeRoutes);
console.log('Message Routes:', messageRoutes);

// Using routes as middleware
app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/message', messageRoutes);

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
