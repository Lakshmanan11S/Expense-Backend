const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    }
})

const result = new mongoose.model('user',schema)

module.exports=result