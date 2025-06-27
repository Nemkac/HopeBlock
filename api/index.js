const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const mockDonations = [
    {
        id: 1,
        name: "Humanitarna pomoć za decu",
        description: "Kupovina školskog pribora i hrane za ugroženu decu",
        eth_address: "0x1234...abcd",
        usdc_address: "0x9999...usdc",
        goal: "5", // u ETH
        collected: "2.3", // u ETH
        is_active: true,
        tags: ["deca", "obrazovanje"]
    },
    {
        id: 2,
        name: "Zdravstvena pomoć",
        description: "Sakupljanje sredstava za terapije i lekove",
        eth_address: "0x5678...abcd",
        usdc_address: "0x8888...usdc",
        goal: "10",
        collected: "7.1",
        is_active: true,
        tags: ["zdravlje", "pomoc"]
    },
    {
        id: 3,
        name: "Pomoć porodicama iz poplavljenih područja",
        description: "Obezbeđivanje osnovnih sredstava za život",
        eth_address: "0xabcd...1234",
        usdc_address: "0x7777...usdc",
        goal: "15",
        collected: "15",
        is_active: false,
        tags: ["katastrofa", "porodice"]
    }
];

// Endpoint: lista kampanja
app.get('/api/campaigns', (req, res) => {
    setTimeout(() => {
        res.json({ success: true, data: mockDonations });
    }, 300);
});

// Endpoint: jedna kampanja po ID-u
app.get('/api/campaigns/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const campaign = mockDonations.find(c => c.id === id);

    setTimeout(() => {
        if (!campaign) {
            return res.status(404).json({ success: false, error: `Campaign with ID ${id} not found` });
        }
        res.json({ success: true, data: campaign });
    }, 300);
});

// Start
app.listen(PORT, () => {
    console.log(`Mock humanitarian wallet API on http://localhost:${PORT}`);
    console.log(`GET /api/campaigns -> svi aktivni humanitarni walleti`);
    console.log(`GET /api/campaigns/:id -> detalji jednog walleta`);
});
