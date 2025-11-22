const express = require("express");
const router = express.Router();

const horoscopeController = require("../controller/horoscopeController");

router.get("/", horoscopeController.getAllHoroscope);

router.get("/:sign", horoscopeController.getHoroscopeBySign);

module.exports = router;
