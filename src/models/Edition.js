const mongoose = require("mongoose");

const EditionSchema = new mongoose.Schema({
    date: { type: String, require: true },
    category: [
        {
            name: {type: String, require: true},
            news: [
                {
                    title: String,
                    description: String,
                    content: String,
                    url: String,
                    image: String,
                    author: String,
                    publishedAt: String,
                    source: {
                        name: String
                    }
                }
            ]
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model("Edition", EditionSchema);