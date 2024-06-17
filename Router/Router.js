const express = require('express');
const usercontroler = require ('../Controler/Controler.js')
const router = express.Router()

router.post('/login',usercontroler.login)
router.post('/addamount',usercontroler.addamount)



module.exports=router