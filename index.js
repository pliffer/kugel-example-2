const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

const kugel = require('kugel');

kugel.init().then(() => {
    // Configuração do servidor Express e rota inicial
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(express.json());

    // Rota para renderizar a página inicial
    app.get('/', (req, res) => {
        res.render('index');
    });

    // Rota para receber o CEP e buscar informações de endereço
    app.post('/endereco', async (req, res) => {
        const cep = req.body.cep;
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            res.json(response.data);
        } catch (error) {
            res.status(400).json({ error: 'CEP inválido.' });
        }
    });

    // Iniciar o servidor Express
    const port = 3000;
    app.listen(port, () => {
        console.log(`Endereco-app rodando na porta ${port}`);
    });
});