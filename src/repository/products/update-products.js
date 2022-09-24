const { pool } = require('../repository');
const { selectBrand } = require('../brands/show-brands');
const { selectCategory } = require('../categories/show-categories');
const { pullUnity } = require('./show-products');

const alter = {
    text: 'UPDATE products SET name = $1, category_id = $2, brand_id = $3, description = $4, price = $5, updated_at = now() WHERE id = $6',
    values: [],
};

async function alterProduct(object, id) {
    try {
        pullUnity(id);

        alter.values = [];

        const category = await selectCategory(object.category);
        object.category = category.id;

        const brand = await selectBrand(object.brand);
        object.brand = brand.id;

        for (let el in object) {
            const item = object[el];
            alter.values.push(item);
        }

        alter.values.push(id);

        await pool.query(alter);

        return true;
    } catch (error) {
        return error;
    }
}

module.exports = { alterProduct };
