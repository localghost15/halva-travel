const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = [
	'http://localhost:5173',
	'http://localhost:5174',
	'http://localhost:3200',
	'https://halvatravel.com',
	'https://admin.halvatravel.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());


app.use('/api/regions', require('./routes/regionRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/tours', require('./routes/tourRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/promotions', require('./routes/promotionRoutes'));
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/vouchers', require('./routes/vouchers'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
