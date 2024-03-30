const {
    client,
    createTables, createUser, createCategory, createProduct, createUserProduct,
    fetchUsers, fetchProducts, fetchUserProducts, fetchCategoryByName, fetchCategoryByID,
    deleteUserProduct,
    authenticate, findUserByToken
} = require('./db');
const express = require('express');
const app = express();
app.use(express.json());

async function isLoggedIn(req, res, next) {
    try {
        req.user = await findUserByToken(req.headers.authorization);
        next();
    } catch (e) {
        next(e);
    }
};

app.post('/api/auth/register', async(req, res, next) => {
    try {
        const user = req.body;
        await createUser(user);
        res.send(await authenticate(user));
    }
    catch (e) {
        next(e);
    }
});

app.post('/api/auth/login', async(req, res, next) => {
    try {
        res.send(await authenticate(req.body));
    }
    catch (e) {
        next(e);
    }
});

app.get('/api/auth/me', isLoggedIn, async(req, res, next) => {
    try {
        res.send(req.user);
    }
    catch (e) {
        next(e);
    }
});

app.get('/api/users', async(req, res, next) => {
    try {
        res.send(await fetchUsers());
    }
    catch (e) {
        next(e);
    }
});

app.put('/api/users/:id/cart', isLoggedIn, async(req, res, next) => {
    //QUESTION: I seem to not need this :id, because the information is already available
    //          in req.user.id from my isLoggedIn middleware, is there some other syntax
    //          I should be using? or maybe I should be checking if the URL id and the
    //          authenticated id are the same? or maybe the :id is a way to say "this
    //          part can be anything"?
    try {
        const user_product = await {
                            user_id: req.user.id,
                            product_id: req.body.product_id,
                            count: req.body.count }
        res.send(await createUserProduct(user_product));
    }
    catch (e) {
        next(e);
    }
});

app.delete('/api/users/:user_id/cart/:id', isLoggedIn, async(req, res, next) => {
    try {
        const user_product = {
            user_id: req.user.id,
            product_id: req.body.product_id
        }
        res.send(await deleteUserProduct(user_product));
    }
    catch (e) {
        next(e);
    }
});

app.get('/api/users/:id/cart', isLoggedIn, async(req, res, next) => {
    try {
        res.send(await fetchUserProducts(req.user.id));
    }
    catch (e) {
        next(e);
    }
});

app.get('/api/products', async(req, res, next) => {
    try {
        res.send(await fetchProducts());
    }
    catch (e) {
        next(e);
    }
});

async function init() {
    await client.connect();
    await createTables();

    const [bob, joe, mary] = await Promise.all([
        createUser({ username: 'bob', password: 'bob123' }),
        createUser({ username: 'joe', password: 'joe123' }),
        createUser({ username: 'mary', password: 'mary123' })
    ]);

    const categories = await Promise.all([
        createCategory({ name: 'electronics' }),
        createCategory({ name: 'food' }),
        createCategory({ name: 'toy' }),
        createCategory({ name: 'furniture' }),
        createCategory({ name: 'decoration' }),
    ]);

    const [iphone, cheese, lego] = await Promise.all([
        createProduct({ name: 'iphone', price: 1000, category_name: categories[0].name }),
        createProduct({ name: 'cheese', price: 5 , category_name: categories[1].name }),
        createProduct({ name: 'lego', price: 30 , category_name: categories[2].name })
    ]);

    for (let i = 0; i < 100; i++) {
        const product = { name: 'product' + i,
                        price: Math.floor(Math.random() * 1000),
                        category_name: categories[Math.floor(Math.random() * 5)].name
                    };
        createProduct(product);
    }

    // const [test] = await Promise.all([
    //     createUserProduct({user_id: bob.id, product_id: iphone.id, count: 1})
    // ]);
    // console.log(test);
    // console.log(bob);
    // console.log(await fetchUserProducts(bob.id));
    // const users = await fetchUsers();
    // console.log(users);
    // const category1 = await fetchCategoryByName("electronics");
    // console.log('Category1: ', category1);
    // const category2 = await fetchCategoryByID(food.id);
    // console.log('Category2: ', category2);
    // const products = await fetchProducts();
    // console.log('Products: ', products);
    // console.log('Testing authentication');
    // const token = await authenticate({ username: 'bob', password: 'bob123' });
    // console.log('Token: ', token);
    // const user = await findUserByToken(token.token);
    // console.log('User: ', user);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
}

init();