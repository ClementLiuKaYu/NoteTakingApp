require('dotenv').config()

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
})

class User {
    constructor(knex){
        this.knex = knex
    }

    getUserByEmail(email){
        return this.knex.select('id','username','email').from('users').where('users.email',email)
    }

    addUser(userInfo){
        this.getUserByEmail(userInfo.email).then((user)=>{
            if (user.length === 0){
                return this.knex.from('users').insert(userInfo)
            }
        })
    }
}