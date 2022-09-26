const { alterUser } = require('../../repository/users/update-users');

async function updateUser(data, id) {
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
                'Não foi possível alterar esse usuário pois seu nome não foi informada!'
            );
        } else if (!data.email) {
            throw new Error(
                'Não foi possível alterar esse usuário pois seu email não foi informado!'
            );
        } else if (!data.password || data.password === undefined) {
            throw new Error(
                'Não foi possível alterar esse usuário pois sua senha não foi informada!'
            );
        } else if (!data.phone || data.phone === undefined) {
            throw new Error(
                'Não foi possível alterar esse usuário pois seu telefone não foi informado!'
            );
        } else if (!id) {
            throw new Error('Não foi possível identificar este usuário!');
        }

        const resp = await alterUser(data, id);

        if (resp !== true) {
            throw resp;
        }
    } catch (error) {
        status.Error = error.message;
    }

    return status;
}

module.exports = { updateUser };
