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
        category_id UUID REFERENCES category(id) NOT NULL
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
        INSERT INTO user_account(id, username, password) VALUES($1, $2, $3) RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), username, await bcrypt.hash(password,5)]);
    return response.rows[0];
}

async function createCategory({ name }) {
    const SQL = `
        INSERT INTO category(id, name) VALUES($1, $2) RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0];
}

async function createProduct({ name, category_id, price }) {
    const SQL = `
        INSERT INTO product(id, name, price, category_id) VALUES($1, $2, $3, $4) RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), name, price, category_id]);
    return response.rows[0];
}

async function createUserProduct({ user_id, product_id, count }) {
    const SQL = `
        INSERT INTO user_product(id, user_id, product_id, count) VALUES($1, $2, $3, $4) RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), user_id, product_id, count]);
    return response.rows[0];
}
module.exports = {
    client,
    createTables, createUser, createCategory, createProduct, createUserProduct
}