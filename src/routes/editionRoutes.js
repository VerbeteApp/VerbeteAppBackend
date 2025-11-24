const express = require('express');
const router = express.Router();

const { getLatestEdition, fetchAndSaveEdition, getEditionsSummary, getEditionByNumber } = require("../controller/editionController");

//Pegar a edição mais recentes do banco
router.get('/', getLatestEdition);

router.get('/createAndSaveEdition', fetchAndSaveEdition);

router.get('/summarys', getEditionsSummary);

router.get('/:edition_number', getEditionByNumber);

module.exports = router;