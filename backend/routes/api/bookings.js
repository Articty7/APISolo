const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { SpotImage } = require('../../db/models');

const router = express.Router();

// Routes Here

module.exports = router;