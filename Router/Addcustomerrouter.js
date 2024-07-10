const express = require('express');
const addCustomerControler=require('../Controler/Addcustomercontroler')
const customerrouter = express.Router()

customerrouter.post('/addcustomer',addCustomerControler.addCustomer)
customerrouter.get('/getallcustomer',addCustomerControler.getAllCustomer)
customerrouter.get('/getcustomername',addCustomerControler.getCustomerName)
customerrouter.get('/getcustomerdetailsbyname/:CompanyName',addCustomerControler.getCustomerDetailsByName)



module.exports=customerrouter