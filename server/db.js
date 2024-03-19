const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/capstone_store_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';

const createTables = async() => {
    const SQL = `
    DROP TABLE IF EXISTS user_product;
    DROP TABLE IF EXISTS product;
    DROP TABLE IF EXISTS category;
    DROP TABLE IF EXISTS user_account;

    CREATE TABLE user_account(
        id UUID PRIMARY KEY,
        username varchar(100) NOT NULL UNIQUE,
        password varchar(255) NOT NULL
    );
    CREATE TABLE category(
        id UUID PRIMARY KEY,
        name varchar(255) NOT NULL UNIQUE
    );
    CREATE TABLE product(
        id UUID PRIMARY KEY,
        name varchar(255) NOT NULL UNIQUE,
        price INT NOT NULL,
        category_name varchar(255) REFERENCES category(name) NOT NULL
    );
    CREATE TABLE user_product(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES user_account(id) NOT NULL,
        product_id UUID REFERENCES product(id) NOT NULL,
        count INT NOT NULL,
        CONSTRAINT unique_user_id_product_id UNIQUE (user_id, product_id)
    );
    `
    await client.query(SQL);
}

async function createUser({ username, password }) {
    const SQL = `
        INSERT INTO user_account(id, username, password)
        VALUES($1, $2, $3)
        RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), username, await bcrypt.hash(password,5)]);
    return response.rows[0];
}

async function fetchUsers() {
    const SQL = `
        SELECT id, username
        FROM user_account;
        `;
    const response = await client.query(SQL);
    return response.rows;
}

async function authenticate({ username, password }) {
    const SQL = `
        SELECT id, password
        FROM user_account
        WHERE username = $1;
        `;

    const response = await client.query(SQL, [ username ]);
    if (!response.rows.length || (await bcrypt.compare(password, response.rows[0].password)) === false) {
        const error = Error('Not authorized');
        error.status = 401;
        throw error;
    }
    const token = await jwt.sign({ id: response.rows[0].id }, JWT );
    return { token };
}

async function findUserByToken(token) {
    let id;
    try {
        const payload = await jwt.verify(token, JWT);
        id = payload.id;
    } catch (ex) {
        const error = Error('Not authorized');
        error.status = 401;
        throw error;
    }
    const SQL = `
        SELECT id, username
        FROM user_account
        WHERE id = $1;
        `;
    const response = await client.query(SQL, [ id ]);
    if (!response.rows.length) {
        const error = Error('Not authorized');
        error.status = 401;
        throw error;
    }
    return response.rows[0];
}

async function createCategory({ name }) {
    const SQL = `
        INSERT INTO category(id, name) VALUES($1, $2) RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0];
}

async function fetchCategoryByName(name) {
    const SQL = `
        SELECT *
        FROM category
        WHERE name = $1;
    `;
    const response = await client.query(SQL, [name]);
    return response.rows[0];
}

async function fetchCategoryByID(category_id) {
    const SQL = `
        SELECT *
        FROM category
        WHERE id = $1;
    `;
    const response = await client.query(SQL, [category_id]);
    return response.rows[0];
}

async function createProduct({ name, price, category_name }) {
    const SQL = `
        INSERT INTO product(id, name, price, category_name)
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), name, price, category_name]);
    return response.rows[0];
}

async function fetchProducts() {
    const SQL = `
        SELECT * FROM product;
    `;
    const response = await client.query(SQL);
    return response.rows;
}

async function createUserProduct({ user_id, product_id, count }) {
    const SQL = `
        INSERT INTO user_product(id, user_id, product_id, count)
        VALUES($1, $2, $3, $4)
        ON CONFLICT ON CONSTRAINT unique_user_id_product_id
        DO UPDATE SET
            count = EXCLUDED.count
        RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), user_id, product_id, count]);
    return response.rows[0];
}

async function fetchUserProducts(user_id) {
    const SQL = `
        SELECT *
        FROM user_product
        WHERE user_id=$1;
    `
    const response = await client.query(SQL, [user_id]);
    return response.rows;
}

module.exports = {
    client,
    createTables, createUser, createCategory, createProduct, createUserProduct,
    fetchUsers, fetchProducts, fetchUserProducts, fetchCategoryByName, fetchCategoryByID,
    authenticate, findUserByToken
}