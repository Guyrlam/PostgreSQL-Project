const product = {
    text: 'INSERT INTO request_list(request_id, product_id, amount) VALUES($1, $2, $3)',
    values: [],
};

async function insertRequestProducts(header, array, client) {
    try {
        array.forEach(async (el) => {
            product.values = [header, el.product, el.amount];
            await client.query(product);
        });

        return true;
    } catch (error) {
        return error;
    }
}

module.exports = { insertRequestProducts };
