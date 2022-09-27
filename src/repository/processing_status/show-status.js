const { pool } = require('../repository');

const get = {
    text: 'select id, status from processing_status where status = $1',
    values: [],
};

const list = {
    text: 'select id, status from processing_status',
};

async function selecStatus(status) {
    try {
        get.values = [status];

        const selected = await pool.query(get);

        return selected.rows[0];
    } catch (err) {
        return err;
    }
}

async function listStatus() {
    try {
        const selected = await pool.query(list);

        return selected.rows[0];
    } catch (err) {
        return err;
    }
}

module.exports = { selecStatus, listStatus };
