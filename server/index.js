const {
    client,
    createTables, createUser, createCategory, createProduct, createUserProduct
} = require('./db');
const express = require('express');
const app = express();

app.use(express.json());

const init = async() => {
    await client.connect();
    await createTables();

    const [bob, joe, mary] = await Promise.all([
        createUser({ username: 'bob', password: 'bob123' }),
        createUser({ username: 'joe', password: 'joe123' }),
        createUser({ username: 'mary', password: 'mary123' })
    ]);

    const [electronics, food, toy] = await Promise.all([
        createCategory({ name: 'electronics' }),
        createCategory({ name: 'food' }),
        createCategory({ name: 'toy' })
    ])

    const [iphone, cheese, lego] = await Promise.all([
        createProduct({ name: 'iphone', price: 1000, category_id: electronics.id }),
        createProduct({ name: 'cheese', price: 5 , category_id: food.id }),
        createProduct({ name: 'lego', price: 30 , category_id: toy.id })
    ])

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
}

init();