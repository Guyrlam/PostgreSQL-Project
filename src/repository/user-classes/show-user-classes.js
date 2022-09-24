const { pool } = require('../repository');

const get = {
    text: 'select id, class from classes where class = $1',
    values: [],
};

const list = {
    text: 'select id, class from classes ',
};

async function selectClass(brand) {
    try {
        get.values = [brand];

        const selected = await pool.query(get);

        return selected.rows[0];
    } catch (err) {
        return err;
    }
}

async function listClasses() {
    try {
        const selected = await pool.query(list);

        return selected.rows[0];
    } catch (err) {
        return err;
    }
}

module.exports = { selectClass, listClasses };
