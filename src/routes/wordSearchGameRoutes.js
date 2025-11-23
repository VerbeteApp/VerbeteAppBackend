// src/routes/wordSearchRoutes.js
const express = require('express');
const router = express.Router();
const wordSearchGameController = require('../controller/wordSearchGameController');

router.get('/test', wordSearchGameController.getWordSearch);
router.get('/words/edition/:edition_number', wordSearchGameController.getWordSSearchByEdition);
router.get('/rows/edition/:edition_number', wordSearchGameController.getRowsByEdition);


module.exports = router;