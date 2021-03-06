class Note {
    constructor(knex){
        this.knex = knex
    }

    getNotes(userId){
        return this.knex.from('notes').select('id','content').where('user_id',userId).orderBy('id','asc')
    }

    getSharedNotes(userId){
        return
    }

    add(note,user){
        return this.knex.from('notes').insert({content:note,user_id:user.id})
    }

    update(id,note){
        return this.knex.from('notes').where('id',id).update({content:note})
    }

    remove(id){
        return this.knex.from('notes').where('id',id).del()
    }
}

module.exports = Note