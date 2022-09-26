const { pool } = require('../repository');

const pull = {
    text: `SELECT 
    users.id, 
    classes.class,
    users.name,
    users.email, 
    users.password,
	users.phone,
    users.created_at, 
    users.updated_at
    FROM users 
    INNER JOIN classes
    ON users.class_id = classes.id
    WHERE users.deleted_at isnull`,
};

const unity = {
    text: `SELECT 
    users.id, 
    classes.class,
    users.name,
    users.email, 
    users.password,
	users.phone,
    users.created_at, 
    users.updated_at,
    users.deleted_at
    FROM users 
    INNER JOIN classes
    ON users.class_id = classes.id
    WHERE users.id = $1`,
    values: [],
};

async function pullUserList() {
    const resp = await pool.query(pull);
    return resp.rows;
}

async function pullUser(id) {
    unity.values = [id];

    const selected = await pool.query(unity);

    if (selected.rows[0].deleted_at != null) {
        throw new Error('O cliente informado não foi encontrado.');
    }

    return selected.rows[0];
}

module.exports = {
    pullUserList,
    pullUser,
};
