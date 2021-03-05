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

module.exports = User