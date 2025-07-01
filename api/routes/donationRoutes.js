const express = require('express');
const router = express.Router()
const { getDonations } = require('../controllers/donationController');

router.get('/:address', getDonations)

module.exports = router