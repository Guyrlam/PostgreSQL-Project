const { pool } = require('../repository');

const get = {
    text: 'select id, brand from brands where brand = $1',
    values: [],
};

const list = {
    text: 'select id, brand from brands ',
};

async function selectBrand(brand) {
    try {
        get.values = [brand];

        const selected = await pool.query(get);

        return selected.rows[0];
    } catch (err) {
        return err;
    }
}

async function listBrands() {
    try {
        const selected = await pool.query(list);

        return selected.rows[0];
    } catch (err) {
        return err;
    }
}

module.exports = { selectBrand, listBrands };
