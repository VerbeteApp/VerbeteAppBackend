const express = require('express');
const router = express.Router();

const { getLatestEdition} = require("../controller/editionController");

//Pegar a edição mais recentes do banco
router.get('/latest', getLatestEdition);

//TODO: CRIAR ENDPOINT PARA RETORNAR APENAS O REUSMO DA EDIÇÀO COM DATA, NUMERO DA EDIÇÃO E "TEXTURA" DA CAPA OU ALGO DO TIPO

module.exports = router;