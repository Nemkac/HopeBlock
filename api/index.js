const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

//Database
connectDB();

app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GET /api/campaigns -> svi aktivni humanitarni walleti iz baze`);
    console.log(`GET /api/campaigns/:id -> detalji jednog walleta iz baze`);
    console.log(`GET /api/donations/:address -> sve donacije ka humanitornoj svrci`);
});