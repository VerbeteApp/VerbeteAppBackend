const express = require('express');
const router = express.Router();

const { getLatestEdition, fetchAndSaveEdition } = require("../controller/editionController");

//Pegar a edição mais recentes do banco
router.get('/', getLatestEdition);

router.get('/createAndSaveEdition', fetchAndSaveEdition);

//TODO: CRIAR ENDPOINT PARA RETORNAR APENAS O REUSMO DA EDIÇÀO COM DATA, NUMERO DA EDIÇÃO E "TEXTURA" DA CAPA OU ALGO DO TIPO

module.exports = router;