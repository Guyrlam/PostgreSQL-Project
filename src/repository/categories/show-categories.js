const { pool } = require('../repository');

const get = {
    text: 'select id, category from categories where category = $1',
    values: [],
};

const list = {
    text: 'select id, category from categories ',
};

async function selectCategory(category) {
    try {
        get.values = [category];
        const selected = await pool.query(get);
        return selected.rows[0];
    } catch (error) {
        return error;
    }
}

async function listCategory() {
    try {
        const selected = await pool.query(list);

        return selected.rows[0];
    } catch (error) {
        return error;
    }
}

module.exports = { selectCategory, listCategory };
