/* eslint-env node */
/* eslint-disable no-undef */
const express = require('express');
const { saveTrip, getTripsByUser } = require('../controllers/tripsController');

const router = express.Router();

router.post('/save', saveTrip);
router.get('/:userId', getTripsByUser);

module.exports = router;
