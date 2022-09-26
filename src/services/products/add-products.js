const { insertProduct } = require('../../repository/products/add-products');

async function addProduct(data) {
    const status = {
        Error: null,
    };

    try {
        if (!data || !data.name || data.name === undefined) {
            throw new Error(
                'Não foi possível adicionar esse produto pois seu nome não foi informado!'
            );
        } else if (!data.category || data.category === undefined) {
            throw new Error(
                'Não foi possível adicionar esse produto pois sua categoria não foi informada!'
            );
        } else if (!data.brand || data.brand === undefined) {
            throw new Error(
                'Não foi possível adicionar esse produto pois sua marca não foi informada!'
            );
        } else if (!data.description || data.description === undefined) {
            throw new Error(
                'Não foi possível adicionar esse produto pois sua descrição não foi informada!'
            );
        } else if (!data.price || data.price === undefined) {
            throw new Error(
                'Não foi possível adicionar esse produto pois seu valor não foi informado!'
            );
        }

        const resp = await insertProduct(data);

        if (resp !== true) {
            throw resp;
        }
    } catch (error) {
        status.Error = error.message;
    }

    return status;
}

module.exports = { addProduct };
