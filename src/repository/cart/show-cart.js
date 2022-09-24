const { pool } = require('../repository');

const pull = {
    text: `SELECT 
    user_id, 
    product_id, 
    amount 
    FROM shopping_cart`,
};

const cartUser = {
    text: `SELECT 
    users.name, 
    products.name, 
    shopping_cart.amount 
    FROM shopping_cart 
    INNER JOIN users 
    ON shopping_cart.user_id = users.id
    INNER JOIN products
    ON shopping_cart.product_id = products.id
    WHERE user_id = $1`,
    values: [],
};

const amount = {
    text: `SELECT 
    SUM (amount)  
    FROM shopping_cart
    WHERE user_id = $1`,
    values: [],
};

const prices = {
    text: `SELECT
	shopping_cart.amount amount,
	products.price price
	FROM shopping_cart
	INNER JOIN products
	ON shopping_cart.product_id = products.id
	WHERE shopping_cart.user_id = $1`,
    values: [],
};

async function pullCart() {
    resp = await pool.query(pull);
    return resp.rows;
}

async function userCart(id) {
    let client;

    const status = {
        Error: null,
    };

    try {
        client = await pool.connect();

        cartUser.values = [id];
        amount.values = [id];
        prices.values = [id];

        const selected = await client.query(cartUser);
        const totalAmount = await client.query(amount);
        const pricesList = await client.query(prices);

        let total = 0;
        pricesList.rows.forEach(el => {
            total += el.price * Number(el.amount);
        });
        const cart = {
            itens: selected.rows,
            'total-amount': totalAmount.rows[0].sum,
            'total-value': total,
        };

        status.message = cart;
    } catch (error) {
        status.Error = error.message;
    } finally {
        client.release();
        return status;
    }
}

module.exports = {
    pullCart,
    userCart,
};
