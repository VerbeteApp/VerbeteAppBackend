const express = require('express');
const editionRouter = require("./src/router/editionRouter");

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send('Server is working!')
    }, 1000);

})

app.listen(port, () =>{
    console.log(`API running on port ${port}`)
})