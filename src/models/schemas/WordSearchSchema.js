const mongoose = require('mongoose');

const DirectionEnum = ['VERTICAL', 'HORIZONTAL'];

//Sub-Schema
const WordPlacementSchema = new mongoose.Schema({
    direction: {
        type: String, enum: DirectionEnum, required: true
    },

    initial_pos: {
        type: [Number],
        required: true,
        validate: {
            validator: function(v) { return v.length === 2; },
            message: 'initial_pos deve ser uma tupla de coordenadas [x, y]'
        }
    },
    word: {type: String, required: true},
    is_reversed: {type: Boolean, default: false }
}, {_id: false});

//Main Schema
const WordSearchSchema = new mongoose.Schema({
    rows: [{ type: String, required: true }],
    words: [WordPlacementSchema]
}, {_id: false});

module.exports = WordSearchSchema;