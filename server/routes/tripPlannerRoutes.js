/* eslint-env node */
/* eslint-disable no-undef */
const express = require('express');
const { generateTripPlan } = require('../controllers/tripPlannerController');

const router = express.Router();

router.post('/generate-trip', generateTripPlan);

module.exports = router;
