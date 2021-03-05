// Express app setup
const express = require('express')
const app = express()
const port = 8080
let server = app.listen(port,()=>{console.log(`Finding Memo at port ${port}...`)})

// Import required middlewares and packages
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Database setup (knex)
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        user: process.env.DB_DEV_USERNAME,
        password: process.env.DB_DEV_PASSWORD,
        database: process.env.DB_DEV_NAME
    }
})

// User authentication setup
const bcrypt = require('bcrypt')
const passport = require('passport')
const passportInit = require('./server/user-auth')
const flash = require('express-flash')
const session = require('express-session')
const userAuth = require('./server/user-auth')

userAuth.initialize(passport,email => users.find(user => user.email === email),id => users.find(user => user.id === id))

app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

// Handlebars setup
const handlebars = require('express-handlebars')
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

// Serves public files
app.use(express.static('public'))

// Initial get req
app.get('/',userAuth.checkAuth,(req,res)=>{
    console.log('qwer',req.session)
    console.log('asdf',req.user)
    res.render('index',{notes:[1,2,3]})
})

app.get('/login',userAuth.checkNotAuth,(req,res)=>{
    res.render('login')
})

app.post('/login',(req,res,next)=>{console.log(users);next()},passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

const users = []

app.get('/register',userAuth.checkNotAuth,(req,res)=>{
    res.render('register')
})

app.post('/register',async (req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
          id: Date.now().toString(),
          email: req.body.email,
          password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})