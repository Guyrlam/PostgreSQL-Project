const { pool } = require('../repository');

const deleted = {
    text: 'DELETE FROM shopping_cart WHERE user_id = $1 AND product_id = $2',
    values: [],
};

async function delCart(user, product) {
    try {
        deleted.values = [user, product];

        await pool.query(deleted);

        return true;
    } catch (error) {
        return error;
    }
}

module.exports = { delCart };
