require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

require('./src/cron/syncNews');

const editionRouter = require("./src/router/editionRouter");
const newsRouter = require("./src/router/newsRouter");
const horoscopeRouter = require('./src/router/horoscopeRouter')

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', editionRouter);
app.use('/api', horoscopeRouter);
app.use('/api', newsRouter);


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

