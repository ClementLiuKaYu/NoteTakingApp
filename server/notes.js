require('dotenv').config()

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
})
