const mongoose = require('mongoose')

const schema=new mongoose.Schema({
    pdfBase64:{
        type:String,
    }
})
const result = new mongoose.model("pdf",schema)

module.exports=result