// Express app setup
const express = require('express')
const app = express()
const port = 8080
let server = app.listen(port,()=>{console.log(`Finding Memo at port ${port}...`)})

// Importing required middleware and packages
require('dotenv').config()

// Bcrypt setup
// const bcrypt = require(bcrypt)

// Database setup (knex)
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
})

// Handlebars setup
const handlebars = require('express-handlebars')
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

// Serves public files
app.use(express.static('public'))

// Initial get req
app.get('/',(req,res)=>{
    res.render('index',{notes:[1,2,3]})
})

app.get('/login',(req,res)=>{
    res.render('login')
})
