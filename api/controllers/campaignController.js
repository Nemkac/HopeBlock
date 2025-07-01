const { error } = require('console');
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

        const existingCampaign = await Campaign.findOne({ eth_address });
        if (existingCampaign) {
            return res.status(409).json({ error: 'Campaign with provided ETH address already exists!' });
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

exports.deleteCampaign = async (req, res) => {
    try {
        const campaignId = req.params.id;

        const deleted = await Campaign.findByIdAndDelete(campaignId)

        if (!deleted) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        res.status(200).json({ message: 'Campaign deleted successfully!' });

    } catch (err) {
        console.error('Error while deleting campaign: ', err);
        res.status(500).json({ error: 'Failed to delete campaign' });
    }
}