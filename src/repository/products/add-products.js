const { pool } = require('../repository');
const { selectBrand } = require('../brands/show-brands');
const { selectCategory } = require('../categories/show-categories');

const newProduct = {
    text: 'INSERT INTO products(name, category_id, brand_id, description, price) VALUES($1, $2, $3, $4, $5)',
    values: [],
};

async function insertProduct(object) {
    try {
        newProduct.values = [];

        const category = await selectCategory(object.category);
        object.category = category.id;

        const brand = await selectBrand(object.brand);
        object.brand = brand.id;

        for (let el in object) {
            const item = object[el];
            newProduct.values.push(item);
        }

        await pool.query(newProduct);

        return true;
    } catch (error) {
        return error;
    }
}

module.exports = { insertProduct };
