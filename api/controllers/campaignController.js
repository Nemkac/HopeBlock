const Campaign = require('../models/Campaign');

exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ success: false, error: `Campaign not found` });
        }
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

exports.createCampaign = async (req, res) => {
    try {
        const {
            name, description, eth_address, goal, collected = 0, is_active = true, tags = [], imageUrl
        } = req.body;

        if (!name || !eth_address || !goal || !description) {
            return res.status(400).json({ error: 'Name, Address, goal and description are required!' });
        }

        const newCampaign = new Campaign({
            name, description, eth_address, goal, collected, is_active, tags, imageUrl
        });

        await newCampaign.save();
        res.status(201).json({ newCampaign });
    } catch (err) {
        console.log("Error creating campaign: ", err.message);
        res.status(500).json({ error: 'Failed to create campaign.' })
    }
}