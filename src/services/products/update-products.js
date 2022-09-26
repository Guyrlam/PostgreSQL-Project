const { alterProduct } = require('../../repository/products/update-products');

async function updateProduct(data, id) {
    const status = {
        Error: null,
    };

    try {
        if (!data || !data.name || data.name === undefined) {
            throw new Error(
                'Não foi possível alterar esse produto pois seu nome não foi informado!'
            );
        } else if (!data.category || data.category === undefined) {
            throw new Error(
                'Não foi possível alterar esse produto pois sua categoria não foi informada!'
            );
        } else if (!data.brand || data.brand === undefined) {
            throw new Error(
                'Não foi possível alterar esse produto pois sua marca não foi informada!'
            );
        } else if (!data.description || data.description === undefined) {
            throw new Error(
                'Não foi possível alterar esse produto pois sua descrição não foi informada!'
            );
        } else if (!data.price || data.price === undefined) {
            throw new Error(
                'Não foi possível alterar esse produto pois seu valor não foi informado!'
            );
        } else if (!id) {
            throw new Error('Não foi possível identificar este produto!');
        }

        const resp = await alterProduct(data, id);

        if (resp !== true) {
            throw resp;
        }
    } catch (error) {
        status.Error = error.message;
    }

    return status;
}

module.exports = { updateProduct };
