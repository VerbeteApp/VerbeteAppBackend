require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

require('./src/cron/syncNews');

const editionRouter = require("./src/routes/editionRoutes");
const newsRouter = require("./src/routes/newsRoutes");
const horoscopeRouter = require('./src/routes/horoscopeRoutes');
const wordGameController = require('./src/routes/wordGameRoutes');
const wordSearchRouter = require('./src/routes/wordSearchGameRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/edition', editionRouter);
app.use('/api/horoscope', horoscopeRouter);
app.use('/api/news', newsRouter);
app.use('/api/wordGame', wordGameController);
app.use('/api/wordSearch', wordSearchRouter);


app.get('/', (req, res) => {
    setTimeout(() => {
        res.send('Server is working!')
    }, 1000);
});


connectDB()
    .then(()=> {
        console.log('MongoDB connected');

        app.listen(port, () =>{
            console.log(`API running on port ${port}`)
        }) 
    })
    .catch((err) => {
        console.log('ERRO trying to connect to MongoDB');
    })

