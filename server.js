const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/views/index.html')
})

app.get('/database', (req, res) => {
    res.send([{name: 'Vinicius', age: 22}, {name: 'João', age: 23}])
})

try {
    const response = axios.get(`http://projeto_web_ux_db_be.railway.internal:${port}/dinners`)
    console.log(response.data)
} catch (error) {
    console.log(error)
}


app.listen(port, () => {
    console.log(`Servidor express rodando na porta ${port}`);
    console.log(`http://localhost:${port}`)
})