const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    invoiceNo:{
        type:String,
        required:true
    },
    invoiceDate:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:Boolean,
    },
    receivedAmount:{
        type:String,
    },
    receivedDate:{
        type:String,
    },
     pdfBase64:{
        type:String,
        required:true
    }
  
    
   
})

const result = new mongoose.model("customerdetails",schema)

module.exports=result