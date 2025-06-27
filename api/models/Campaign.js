const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name: String,
    description: String,
    eth_address: String,
    usdc_address: String,
    goal: Number,
    collected: Number,
    is_active: Boolean,
    tags: [String],
    imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema);
