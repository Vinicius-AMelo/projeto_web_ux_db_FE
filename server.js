const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const backendPort = process.env.BACKENDPORT || 7087;

app.use(express.static(path.join(__dirname, 'src/frontend')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/frontend/views/index.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/src/frontend/views/login.html')
})

app.get('/registros', (req, res) => {
    res.sendFile(__dirname + '/src/frontend/views/registros.html')
})
app.get('/cardapio', (req, res) => {
    res.sendFile(__dirname + '/src/frontend/views/cardapio.html')
})

app.get('/dinners', async (req, res) => {
    try {
        const response = await axios.get(`http://projeto_web_ux_db_be.railway.internal:${backendPort}/dinners`)
        // const response = await axios.get(`http://localhost:${backendPort}/dinners`)
        res.send(response.data)
    } catch (error) {
        res.send(error)
    }
})

app.post('/dinners', async (req, res) => {
    console.log(req.body)
    try {
        const response = await axios.post(`http://projeto_web_ux_db_be.railway.internal:${backendPort}/dinners`, req.body)
        // const response = await axios.post(`http://localhost:${backendPort}/dinners`, req.body)
        res.send(response.data)
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, () => {
    console.log(`Servidor express rodando na porta ${port}`);
    console.log(`http://localhost:${port}`)
})

