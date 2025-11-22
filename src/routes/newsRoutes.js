const express = require ('express');
const router = express.Router();

const { fetchNewsFromExtAPI, getDailyNews } = require("../controller/newsController");

//Buscar noticias da api externa e salva no banco
router.get('/fetchAndSync', fetchNewsFromExtAPI);

//Search in database
router.get('/', getDailyNews);



module.exports = router;