const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    Name:{
        type:String,
    },
    Type:{
        type:String,
    },
    Amount:{
        type:String,
    },
    AttachFile:{
        type:String,
    },
    Description:{
        type:String,
    },
    Date:{
        type:String,
    },
})
const result = new mongoose.model("Add Detail",schema)

module.exports=result