const { pool } = require('../repository');

const pull = {
    text: `SELECT 
    products.id, 
    products.name, 
    categories.category,
    brands.brand,
    products.description, 
    products.price, 
    products.created_at, 
    products.updated_at
    FROM products 
    INNER JOIN categories 
    ON products.category_id = categories.id
    INNER JOIN brands
    ON products.brand_id = brands.id
    WHERE products.deleted_at isnull`,
};

const unity = {
    text: `SELECT 
    products.id, 
    products.name, 
    categories.category,
    brands.brand,
    products.description, 
    products.price, 
    products.created_at, 
    products.updated_at,
    products.deleted_at
    FROM products 
    INNER JOIN categories 
    ON products.category_id = categories.id
    INNER JOIN brands
    ON products.brand_id = brands.id
    WHERE products.id = $1`,
    values: [],
};

const filterASC = {
    text: `SELECT 
    products.id, 
    products.name, 
    categories.category,
    brands.brand,
    products.description, 
    products.price, 
    products.created_at, 
    products.updated_at
    FROM products 
    INNER JOIN categories 
    ON products.category_id = categories.id
    INNER JOIN brands
    ON products.brand_id = brands.id
    WHERE products.deleted_at isnull AND categories.category = $1 AND brands.brand = $2
    ORDER BY products.price ASC`,
    values: [],
};

const filterDESC = {
    text: `SELECT 
    products.id, 
    products.name, 
    categories.category,
    brands.brand,
    products.description, 
    products.price, 
    products.created_at, 
    products.updated_at
    FROM products 
    INNER JOIN categories 
    ON products.category_id = categories.id
    INNER JOIN brands
    ON products.brand_id = brands.id
    WHERE products.deleted_at isnull AND categories.category = $1 AND brands.brand = $2
    ORDER BY products.price DESC`,
    values: [],
};

async function pullProducts() {
    resp = await pool.query(pull);
    return resp.rows;
}

async function pullUnity(id) {
    unity.values = [id];

    const selected = await pool.query(unity);

    if (selected.rows[0].deleted_at != null) {
        throw new Error("O produto informado não foi encontrado.");
    }

    return selected.rows[0];
}

async function orderProductsASC(category, brand) {
    filterASC.values = [category, brand];

    const selected = await pool.query(filterASC);
    return selected.rows;
}

async function orderProductsDESC(category, brand) {
    filterDESC.values = [category, brand];

    const selected = await pool.query(filterDESC);
    return selected.rows;
}

module.exports = {
    pullProducts,
    pullUnity,
    orderProductsASC,
    orderProductsDESC,
};
