const {
    pullProducts,
    pullUnity,
    orderProductsASC,
    orderProductsDESC,
} = require('../../repository/products/show-products');

async function listProducts() {
    const status = {
        Error: null,
    };

    try {
        const resp = await pullProducts();
        status.message = resp;
    } catch (error) {
        status.Error = error.message;
    } finally {
        return status;
    }
}

async function filterListASC(category, brand) {
    const status = {
        Error: null,
    };

    try {
        const resp = await orderProductsASC(category, brand);
        status.message = resp;
    } catch (error) {
        status.Error = error.message;
    } finally {
        return status;
    }
}

async function filterListDESC(category, brand) {
    const status = {
        Error: null,
    };

    try {
        const resp = await orderProductsDESC(category, brand);
        status.message = resp;
    } catch (error) {
        status.Error = error.message;
    } finally {
        return status;
    }
}

async function selectProduct(id) {
    const status = {
        Error: null,
    };

    try {
        const resp = await pullUnity(id);
        status.message = resp;
    } catch (error) {
        status.Error = error.message;
    } finally {
        return status;
    }
}

module.exports = { listProducts, filterListASC, filterListDESC, selectProduct };
