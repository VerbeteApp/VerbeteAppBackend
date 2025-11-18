const mongoose = require("mongoose");

const HoroscopeSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true,
        unique: true
    },
    prediction: [
        {
            sign: {type: String, required: true},
            decription: {type: String, required: true},
        }
    ]
}, {timestamps: true});


module.exports = mongoose.model("Horoscope", HoroscopeSchema);