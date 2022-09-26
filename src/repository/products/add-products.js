const { pool } = require('../repository');
const { selectBrand } = require('../brands/show-brands');
const { selectCategory } = require('../categories/show-categories');

const newProduct = {
    text: 'INSERT INTO products(name, category_id, brand_id, description, price) VALUES($1, $2, $3, $4, $5)',
    values: [],
};

async function insertProduct(object) {
    try {
        const manipulate = object;
        newProduct.values = [];

        const category = await selectCategory(object.category);
        manipulate.category = category.id;

        const brand = await selectBrand(manipulate.brand);
        manipulate.brand = brand.id;

        object.values(manipulate).forEach((item) => {
            newProduct.values.push(item);
        });

        await pool.query(newProduct);

        return true;
    } catch (error) {
        return error;
    }

    
}

module.exports = { insertProduct };
