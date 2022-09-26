const { pool } = require('../repository');
const { pullCart } = require('./show-cart');

const newProduct = {
    text: 'INSERT INTO shopping_cart(user_id, product_id, amount) VALUES($1, $2, $3)',
    values: [],
};

const add = {
    text: 'UPDATE shopping_cart SET amount = amount + $3 WHERE user_id = $1 AND product_id = $2',
    values: [],
};

async function insertCart(object) {
    try {
        let isNew = true;

        const cart = await pullCart();
        cart.forEach((el) => {
            if (el.user_id === object.user && el.product_id === object.product) {
                isNew = false;
            }
        });

        if (isNew === true) {
            newProduct.values = [];
            object.values(object).forEach((item) => {
                newProduct.values.push(item);
            });

            await pool.query(newProduct);
        } else {
            add.values = [];
            object.values(object).forEach((item) => {
                add.values.values.push(item);
            });

            await pool.query(add);
        }

        return true;
    } catch (error) {
        return error;
    }
}

module.exports = { insertCart };
