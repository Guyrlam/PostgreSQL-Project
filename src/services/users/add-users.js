const { insertUser } = require('../../repository/users/add-users');

async function addUser(data) {
    const status = {
        Error: null,
    };

    try {
        if (!data || !data.class || data.class === undefined) {
            throw new Error(
                'Não foi possível adicionar esse usuário pois sua classe não foi informado!'
            );
        } else if (!data.name || data.name === undefined) {
            throw new Error(
                'Não foi possível adicionar esse usuário pois seu nome não foi informada!'
            );
        } else if (!data.email) {
            throw new Error(
                'Não foi possível adicionar esse usuário pois seu email não foi informado!'
            );
        } else if (!data.password || data.password === undefined) {
            throw new Error(
                'Não foi possível adicionar esse usuário pois sua senha não foi informada!'
            );
        } else if (!data.phone || data.phone === undefined) {
            throw new Error(
                'Não foi possível adicionar esse usuário pois seu telefone não foi informado!'
            );
        }

        const resp = await insertUser(data);

        if (resp !== true) {
            throw resp;
        }
    } catch (error) {
        status.Error = error.message;
    }

    return status;
}

module.exports = { addUser };
