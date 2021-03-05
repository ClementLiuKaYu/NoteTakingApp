const express = require('express')

class Router {
    constructor(notes,users){
        this.notes = notes
        this.users = users
    }

    router(){
        let router = express.Router()

        router.get("/", this.get.bind(this));
        router.post("/", this.post.bind(this));
        router.put("/:id", this.put.bind(this));
        router.delete("/:id", this.delete.bind(this));
    
        return router;
      }



}