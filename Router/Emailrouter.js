const express = require('express')
const emailcontroler = require('../Controler/Emailcontroler')
const router = express.Router()



router.post('/sendmail',emailcontroler.sendmail)
router.get('/getcustomernamebyemail/:companyName',emailcontroler.customerNameByEmail)
router.post('/save-pdf',emailcontroler.savepdf)
router.get('/view-pdf/:invoiceNo',emailcontroler.viewPdf)
router.put('/updatepaymentstatus/:invoiceNo',emailcontroler.updatePaymentStatus)
router.get('/getpreviousinvoiceNo',emailcontroler.getPreviousInvoiceNo)


module.exports=router