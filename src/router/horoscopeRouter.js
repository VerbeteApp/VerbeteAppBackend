const express = require ('express');
const router = express.Router();

const { getAllHoroscope } = require('../controller/horoscopeController');

router.get('/allHoroscope', getAllHoroscope);

module.exports = router;