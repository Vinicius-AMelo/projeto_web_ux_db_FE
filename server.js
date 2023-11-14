const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const backendPort = process.env.BACKENDPORT || 3000;

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/views/index.html')
})

app.get('/database', (req, res) => {
    res.send([{name: 'Vinicius', age: 22}, {name: 'João', age: 23}])
})

app.get('/backend', async (req, res)=> {
    try {
        const response = await axios.get(`http://projeto_web_ux_db_be.railway.internal:${backendPort}/dinners`)
        res.send(response.data)
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, () => {
    console.log(`Servidor express rodando na porta ${port}`);
    console.log(`http://localhost:${port}`)
})

