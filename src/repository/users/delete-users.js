const { pool } = require('../repository');
const { pullUser } = require('./show-users');

const deleted = {
    text: 'UPDATE users SET deleted_at = now() WHERE id = $1',
    values: [],
};

async function delUser(id) {
    try {
        pullUser(id);
        deleted.values = [id];

        await pool.query(deleted);

        return true;
    } catch (error) {
        return error;
    }
}

module.exports = { delUser };
