const mongoose = require('mongoose');

const HoroscopeSchema = new mongoose.Schema({
    sign: { type: String, required: true,
        enum: ['aries', 'touro', 'gemeos', 'cancer', 'leao', 'virgem', 'libra', 'escorpiao', 'sagitario', 'capricornio', 'aquario', 'peixes']
     },
    date: Date,
    message: String
    }, {
    _id: false,
})

module.exports = HoroscopeSchema;