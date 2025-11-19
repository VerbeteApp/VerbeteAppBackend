const mongoose = require('mongoose');

const SudokuSchema = new mongoose.Schema({
  initial_layout: { type: String, required: true }, 
  solution: { type: String, required: true },      
  difficulty: { 
    type: Number, 
    min: 1, 
    max: 3, 
    required: true 
  },
  date: Date
}, {
  _id: false
});

module.exports = SudokuSchema;