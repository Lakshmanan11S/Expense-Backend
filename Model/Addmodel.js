const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    Name:{
        type:String,
    },
    Type:{
        type:String,
    },
    CreditReason:{
        type:String,
    },
    DebitReason:{
        type:String,
    },
    TransactionDetails:{
        type:String,
    },
    Amount:{
        type:String,
    },
    AttachFile:{
        base64:{
            type:String,
        },
        name:{
            type:String
        }
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