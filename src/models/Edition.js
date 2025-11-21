const mongoose = require("mongoose");

const NewsSchema = require('./schemas/NewsSchema');
const SudokuSchema = require('./schemas/SudokuSchema');
const WeatherSchema = require('./schemas/WeatherSchema');
const HoroscopeSchema = require('./schemas/HoroscopeSchema');
const StampSchema = require('./schemas/StampSchema');
const WordSearchSchema = require('./schemas/WordSearchSchema');

const EditionSchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true, index: true },
    edition_number: { type: Number, required: true, unique: true },
    news: [NewsSchema],
    word_game: { type: String, required: false },
    sudoku_game: { type: SudokuSchema, required: false },
    word_search_game: { type: WordSearchSchema, required: false },
    horoscope: { type: [HoroscopeSchema], required: false },
    weather_forecast: { type: WeatherSchema, required: false },
    texture: { type: String, required: false },
    stamp: { type: StampSchema, required: false }
}, {timestamps: true});

EditionSchema.statics.getSummary = function() {
  return this.find({}, { 
    date: 1, 
    edition_number: 1, 
    texture: 1, 
    _id: 1 
  }).sort({ date: -1 });
};

module.exports = mongoose.model("Edition", EditionSchema);