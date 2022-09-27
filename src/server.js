const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const { productsRoute } = require('./controllers/products-router');
const { usersRoute } = require('./controllers/users-router ');
const { cartRoute } = require('./controllers/cart-router');
const { reqRoute } = require('./controllers/request-router');

const app = express();
const { PORT } = process.env;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/cart', cartRoute);
app.use('/request', reqRoute);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at http://localhost:${PORT}`);
});

module.exports = { app };
