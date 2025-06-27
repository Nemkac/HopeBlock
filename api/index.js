const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const Campaign = require('./models/Campaign');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

connectDB();


app.get('/api/campaigns', async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/campaigns/:id', async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ success: false, error: `Campaign not found` });
        }
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GET /api/campaigns -> svi aktivni humanitarni walleti iz baze`);
    console.log(`GET /api/campaigns/:id -> detalji jednog walleta iz baze`);
});