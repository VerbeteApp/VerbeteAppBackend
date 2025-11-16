const mongoose = require('mongoose');

const connectDB = () => {
    const MONGO_URI = process.env.MONGO_URI;
    console.log("Trying to connect to database...")
    return mongoose.connect(MONGO_URI);

}

module.exports = connectDB;