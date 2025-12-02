const express = require('express');
const router = express.Router();
const wordGameController = require('../controller/wordGameController');

router.get('/', wordGameController.getDailyWord)
router.get('/word-list', wordGameController.getAllWordsFromList)

module.exports = router;

