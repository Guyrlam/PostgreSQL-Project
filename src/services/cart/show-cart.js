const { userCart } = require('../../repository/cart/show-cart');

async function listCart(id) {
    const resp = await userCart(id);
    return resp;
}

module.exports = { listCart };
