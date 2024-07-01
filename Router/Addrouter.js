const express = require('express');
const addcontroler = require('../Controler/Addcontroler')
const addrouter = express.Router()

addrouter.post('/adddetails',addcontroler.adddetails)
addrouter.get('/getalldetails',addcontroler.getalldetails)
addrouter.put('/editdetails/:id',addcontroler.editdetails)
addrouter.delete('/deletedetail/:id',addcontroler.deletedetail)
addrouter.post('/getdetailsbydaterange',addcontroler.getDetailsByDateRange)
addrouter.get('/getopeningbalance',addcontroler.getOpeningBalance)




module.exports=addrouter