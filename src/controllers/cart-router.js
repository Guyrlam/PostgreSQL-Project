const { Router } = require('express');
const { addCart } = require('../services/cart/add-cart');
const { listCart } = require('../services/cart/show-cart');
const { deleteItem } = require('../services/cart/delete-cart');

const cartRoute = Router();

cartRoute.post('/', async (req, res) => {
    const service = await addCart(req.body);
    if (service.Error != null) {
        res.status(400).json(service);
    } else {
        const message = {
            message: 'Produto adicionado ao carrinho com sucesso!',
        };

        res.status(200).json(message);
    }
});

cartRoute.get('/:id', async (req, res) => {
    const service = await listCart(req.params.id);
    if (service.Error != null) {
        const message = {
            Error: service.Error,
        };
        res.status(400).json(message);
    } else {
        res.status(200).json(service.message);
    }
});

cartRoute.delete('/:user/:product', async (req, res) => {
    const service = await deleteItem(req.params.user, req.params.product);
    if (service.Error != null) {
        res.status(400).json(service);
    } else {
        const message = {
            message: 'Produto deletado com sucesso!',
        };

        res.status(200).json(message);
    }
});

module.exports = { cartRoute };
