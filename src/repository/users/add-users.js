const { pool } = require('../repository');
const { selectClass } = require('../user-classes/show-user-classes');

const newUser = {
    text: 'INSERT INTO users(class_id, name, email, password, phone) VALUES($1, $2, $3, $4, $5)',
    values: [],
};

async function insertUser(object) {
    try {
        newUser.values = [];

        const classe = await selectClass(object.class);
        object.class = classe.id;

        for (let el in object) {
            const item = object[el];
            newUser.values.push(item);
        }

        await pool.query(newUser);

        return true;
    } catch (error) {
        return error;
    }
}

module.exports = { insertUser };
