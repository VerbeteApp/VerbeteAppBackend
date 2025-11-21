const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: String,
    cover_image: String,
    date: { type:Date, default: Date.now },
    author: String,
    source: String,
    link: String,
    description: String,
    language: { type:String, default: 'pt-br' }
    }, {
    _id: false,
})

module.exports = NewsSchema;