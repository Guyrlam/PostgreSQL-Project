const { delProduct } = require('../../repository/products/delete-products');

async function deleteProduct(id) {
    const status = {
        Error: null,
    };

    try {
        if (!id) {
            throw new Error('Não foi possível identificar este produto!');
        }

        const resp = await delProduct(id);

        if (resp !== true) {
            throw resp;
        }
    } catch (error) {
        status.Error = error.message;
    }

    return status;
}

module.exports = { deleteProduct };
