const { pool } = require('../repository');
const { pullUnity } = require('./show-products');

const deleted = {
    text: 'UPDATE products SET deleted_at = now() WHERE id = $1',
    values: [],
};

async function delProduct(id) {
    try {
        pullUnity(id);
        deleted.values = [id];

        await pool.query(deleted);

        return true;
    } catch (error) {
        return error;
    }
}

module.exports = { delProduct };
