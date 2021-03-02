// Express app setup
const express = require('express')
const app = express()
const port = 8080
const server = app.listen(port,()=>{console.log(`Finding Memo at port ${port}...`)})

// Importing libraries needed
const handlebars = require('express-handlebars')

// Handlebars setup
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

// Serves public files
app.use(express.static('public'))

// Initial get req
app.get('/',(req,res)=>{
    res.render('index',{notes:[1,2,3,4,5]})
})

app.get('/login',(req,res)=>{
    res.render('login')
})
