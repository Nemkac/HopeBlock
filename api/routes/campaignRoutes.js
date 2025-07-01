const express = require('express');
const router = express.Router();
const { getAllCampaigns, getCampaignById, createCampaign, deleteCampaign } = require('../controllers/campaignController');

router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);
router.post('/create', createCampaign);
router.delete('/delete/:id', deleteCampaign)

module.exports = router;