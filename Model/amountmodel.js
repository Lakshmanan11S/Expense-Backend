const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    Amount:{
        type:String,
    }
})

const result = new mongoose.model("amount",schema)
module.exports=result