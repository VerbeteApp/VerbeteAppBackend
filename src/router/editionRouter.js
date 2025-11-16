const express = require('express');
const router = express.Router();

const editionController = require("../controller/editionController");

//Pegar as edições mais recentes do banco
router.get('/latest', editionController.getLatestEdition);

module.exports = router;