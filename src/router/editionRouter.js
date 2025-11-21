const express = require('express');
const router = express.Router();

const { getLatestEdition, fetchNewsFromExtAPI } = require("../controller/editionController");

//Pegar as edições mais recentes do banco
router.get('/latest', getLatestEdition);

//Buscar noticias da api externa e salva no banco
router.get('/fetchAndSync', fetchNewsFromExtAPI)


module.exports = router;