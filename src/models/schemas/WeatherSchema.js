const mongoose = require("mongoose");

//Sub Schema
const DailyForecastSchema = new mongoose.Schema({
    day: { type: String, required: true }, // Ex: "Segunda-feira"
    weather: String, // Ex: "Nublado", "Chuvoso"
    rain_probability: Number,
    rain_mm: Number,
    wind_speed: Number,
    wind_direction: String,
    max_temp: Number,
    min_temp: Number,
    current_temp: Number
}, {_id: false});

//Main Schema
const WeatherSchema = new mongoose.Schema({
    today:{ type: DailyForecastSchema, required: true },
    next_days: [DailyForecastSchema]
}, {_id: false})

module.exports = WeatherSchema;

