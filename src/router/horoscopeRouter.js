const express = require ('express');
const router = express.Router();

const { getAllHoroscope } = require('../controller/horoscopeController');

router.get('/allHoroscope', getAllHoroscope);

//TODO: CRIAR UM ENDPOINT PARA PEGAR HOROSCOPE POR SIGNO

module.exports = router;