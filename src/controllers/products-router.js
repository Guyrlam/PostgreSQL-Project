const { Router } = require('express');
const { addProduct } = require('../services/products/add-products');
const { updateProduct } = require('../services/products/update-products');
const { deleteProduct } = require('../services/products/delete-products');
const {
    listProducts,
    filterListASC,
    filterListDESC,
    selectProduct,
} = require('../services/products/show-products');

const productsRoute = Router();

productsRoute.post('/', async function (req, res) {
    const service = await addProduct(req.body);
    if (service.Error != null) {
        res.status(400).json(service);
    } else {
        const message = {
            message: 'Produto adicionado com sucesso!',
        };

        res.status(200).json(message);
    }
});

productsRoute.put('/:id', async function (req, res) {
    const service = await updateProduct(req.body, req.params.id);
    if (service.Error != null) {
        res.status(400).json(service);
    } else {
        const message = {
            message: 'Produto alterado com sucesso!',
        };

        res.status(200).json(message);
    }
});

productsRoute.get('/:id', async function (req, res) {
    const service = await selectProduct(req.params.id);
    if (service.Error != null) {
        const message = {
            Error: service.Error,
        };
        res.status(400).json(message);
    } else {
        res.status(200).json(service.message);
    }
});

productsRoute.delete('/:id', async function (req, res) {
    const service = await deleteProduct(req.params.id);
    if (service.Error != null) {
        res.status(400).json(service);
    } else {
        const message = {
            message: 'Produto deletado com sucesso!',
        };

        res.status(200).json(message);
    }
});

productsRoute.get('/', async function (req, res) {
    const service = await listProducts();
    if (service.Error != null) {
        const message = {
            Error: service.Error,
        };
        res.status(400).json(message);
    } else {
        res.status(200).json(service.message);
    }
});

productsRoute.get('/filterASC/:category/:brand', async function (req, res) {
    const service = await filterListASC(req.params.category, req.params.brand);
    if (service.Error != null) {
        const message = {
            Error: service.Error,
        };
        res.status(400).json(message);
    } else {
        res.status(200).json(service.message);
    }
});

productsRoute.get('/filterDESC/:category/:brand', async function (req, res) {
    const service = await filterListDESC(req.params.category, req.params.brand);
    if (service.Error != null) {
        const message = {
            Error: service.Error,
        };
        res.status(400).json(message);
    } else {
        res.status(200).json(service.message);
    }
});

module.exports = { productsRoute };
