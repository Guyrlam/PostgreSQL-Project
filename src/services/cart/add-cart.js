const { insertCart } = require('../../repository/cart/add-cart');

async function addCart(data) {
    const status = {
        Error: null,
    };

    try {
        if (!data || !data.user || data.user === undefined) {
            throw new Error(
                'Não foi possível adicionar esse produto pois o usuário não foi informado!'
            );
        } else if (!data.product || data.product === undefined) {
            throw new Error(
                'Não foi possível adicionar esse produto pois seu id não foi informada!'
            );
        } else if (!data.amount || data.amount === undefined) {
            throw new Error(
                'Não foi possível adicionar esse produto pois sua quantidade não foi informada!'
            );
        }

        const resp = await insertCart(data);

        if (resp != true) {
            throw resp;
        }
    } catch (error) {
        status.Error = error.message;
    } finally {
        return status;
    }
}

module.exports = { addCart };
