const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    CompanyName:{
        type:String,
    },
    GstNumber:{
        type:String,
    },
    Email:{
        type:String,
    },
    PhoneNumber:{
        type:String,
    },
    AddressLine1:{
        type:String,
    },
    AddressLine2:{
        type:String,
    },
    PostalCode:{
        type:String,
    },
    CityName:{
        type:String,
    },
    District:{
        type:String,
    },
    WebSite:{
        type:String,
    }
})

const result = new mongoose.model("customer",schema)

module.exports=result