const { Router } = require('express');
const { addUser } = require('../services/users/add-users');
const { updateUser } = require('../services/users/update-users');
const { deleteUser } = require('../services/users/delete-users');
const {
    listUsers,
    filterUsersASC,
    filterUsersDESC,
    selectUser,
} = require('../services/users/show-users');

const usersRoute = Router();

usersRoute.post('/', async (req, res) => {
    const service = await addUser(req.body);
    if (service.Error != null) {
        res.status(400).json(service);
    } else {
        const message = {
            message: 'Usuário adicionado com sucesso!',
        };

        res.status(200).json(message);
    }
});

usersRoute.put('/:id', async (req, res) => {
    const service = await updateUser(req.body, req.params.id);
    if (service.Error != null) {
        res.status(400).json(service);
    } else {
        const message = {
            message: 'Usuário alterado com sucesso!',
        };

        res.status(200).json(message);
    }
});

usersRoute.get('/:id', async (req, res) => {
    const service = await selectUser(req.params.id);
    if (service.Error != null) {
        const message = {
            Error: service.Error,
        };
        res.status(400).json(message);
    } else {
        res.status(200).json(service.message);
    }
});

usersRoute.delete('/:id', async (req, res) => {
    const service = await deleteUser(req.params.id);
    if (service.Error != null) {
        res.status(400).json(service);
    } else {
        const message = {
            message: 'Usuário deletado com sucesso!',
        };

        res.status(200).json(message);
    }
});

usersRoute.get('/', async (req, res) => {
    const service = await listUsers();
    if (service.Error != null) {
        const message = {
            Error: service.Error,
        };
        res.status(400).json(message);
    } else {
        res.status(200).json(service.message);
    }
});

usersRoute.get('/filterASC/:category/:brand', async (req, res) => {
    const service = await filterUsersASC(req.params.category, req.params.brand);
    if (service.Error != null) {
        const message = {
            Error: service.Error,
        };
        res.status(400).json(message);
    } else {
        res.status(200).json(service.message);
    }
});

usersRoute.get('/filterDESC/:category/:brand', async (req, res) => {
    const service = await filterUsersDESC(req.params.category, req.params.brand);
    if (service.Error != null) {
        const message = {
            Error: service.Error,
        };
        res.status(400).json(message);
    } else {
        res.status(200).json(service.message);
    }
});

module.exports = { usersRoute };
