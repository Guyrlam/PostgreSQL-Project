const { delUser } = require('../../repository/users/delete-users');

async function deleteUser(id) {
    const status = {
        Error: null,
    };

    try {
        if (!id) {
            throw new Error('Não foi possível identificar este usuário!');
        }

        const resp = await delUser(id);

        if (resp != true) {
            throw resp;
        }
    } catch (error) {
        status.Error = error.message;
    } finally {
        return status;
    }
}

module.exports = { deleteUser };
