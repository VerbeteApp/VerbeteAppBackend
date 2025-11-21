const mongoose = require('mongoose');


const StampSchema = new mongoose.Schema({
    collection_id: { type: Number, required: true },
    stamp_number: {type: Number, required: true}
    }, {
    _id: false,
})

module.exports = StampSchema;