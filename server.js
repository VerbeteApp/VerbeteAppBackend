require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const fetchAndSaveEdition = require('./src/services/editionService');

const editionRouter = require("./src/router/editionRouter");

const app = express();
const port = 3000;

const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send('Server is working!')
    }, 1000);

})



///TODO: Move this structure to config file and just import a function
mongoose.connect(MONGO_URI)
    .then(()=> {
        console.log('MongoDB connected');

        console.log('EXECUTANDO TESTE DE BUSCA E SALVAMENTO...');
        fetchAndSaveEdition();

        app.listen(port, () =>{
            console.log(`API running on port ${port}`)
        }) 
    })
    .catch((err) => {
        console.log('ERRO trying to connect to MongoDB');
    })

