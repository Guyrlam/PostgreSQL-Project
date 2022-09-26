const { pool } = require('../repository');
const { selectClass } = require('../user-classes/show-user-classes');
const { pullUser } = require('./show-users');

const alter = {
    text: 'UPDATE users SET class_id = $1, name = $2,email  = $3, password = $4, phone = $5, updated_at = now() WHERE id = $6',
    values: [],
};

async function alterUser(object, id) {
    try {
        pullUser(id);

        alter.values = [];
        const manipulate = object;

        const classe = await selectClass(object.class);
        manipulate.class = classe.id;

        object.values(manipulate).forEach((item) => {
            alter.values.push(item);
        });

        alter.values.push(id);

        await pool.query(alter);

        return true;
    } catch (error) {
        return error;
    }
}

module.exports = { alterUser };
