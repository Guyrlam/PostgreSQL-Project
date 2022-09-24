const { delCart } = require('../../repository/cart/delete-cart');

async function deleteItem(user, product) {
    const status = {
        Error: null,
    };

    try {
        const resp = await delCart(user, product);

        if (resp != true) {
            throw resp;
        }
    } catch (error) {
        status.Error = error.message;
    } finally {
        return status;
    }
}

module.exports = { deleteItem };
