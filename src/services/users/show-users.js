const { pullUserList, pullUser } = require('../../repository/users/show-users');

async function listUsers() {
    const status = {
        Error: null,
    };

    try {
        const resp = await pullUserList();
        status.message = resp;
    } catch (error) {
        status.Error = error.message;
    }

    return status;
}

async function selectUser(id) {
    const status = {
        Error: null,
    };

    try {
        const resp = await pullUser(id);
        status.message = resp;
    } catch (error) {
        status.Error = error.message;
    }

    return status;
}

module.exports = { listUsers, selectUser };
