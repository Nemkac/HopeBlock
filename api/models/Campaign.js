const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    eth_address: { type: String, required: true, unique: true },
    goal: { type: Number, required: true },
    collected: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
    tags: [String],
    imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema);
