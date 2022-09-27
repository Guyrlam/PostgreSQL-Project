const { Router } = require('express');
const { addRequest } = require('../services/request/create-request');

const reqRoute = Router();

reqRoute.post('/', async (req, res) => {
    const service = await addRequest(req.body);
    if (service.Error != null) {
        res.status(400).json(service);
    } else {
        const message = {
            message: 'Pedido realizado com sucesso!',
        };

        res.status(200).json(message);
    }
});

module.exports = { reqRoute };
