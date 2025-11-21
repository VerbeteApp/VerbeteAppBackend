const express = require ('express');
const router = express.Router();

const { fetchNewsFromExtAPI } = require("../controller/newsController");

//Buscar noticias da api externa e salva no banco
router.get('/fetchAndSync', fetchNewsFromExtAPI);

module.exports = router;