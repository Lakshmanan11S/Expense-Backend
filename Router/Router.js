const express = require('express');
const usercontroler = require ('../Controler/Controler.js')
const router = express.Router()

router.post('/login',usercontroler.login)




module.exports=router