const express = require('express');
const router = express.Router();
const { getAllCampaigns, getCampaignById, createCampaign } = require('../controllers/campaignController');

router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);
router.post('/create', createCampaign);

module.exports = router;