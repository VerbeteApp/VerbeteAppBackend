// src/routes/wordSearchRoutes.js
const express = require('express');
const router = express.Router();
const wordSearchGameController = require('../controller/wordSearchGameController');

router.get('/test', wordSearchGameController.getWordSearch);

module.exports = router;