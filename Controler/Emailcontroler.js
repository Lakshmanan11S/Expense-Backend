const express = require('express')
const emailModel=require('../Model/Emailmodel')
const nodemailer = require('nodemailer')
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.sendmail = [upload.single('pdf'), async (req, res) => {
    try {
        const { subject, text, invoiceNo, invoiceDate, companyName } = req.body;
        const pdf = req.file;
        
        if (!subject || !text || !pdf || !invoiceNo || !invoiceDate || !companyName) {
            return res.status(400).json({ message: "All fields are required and PDF file must be attached" });
        }

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.TO,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: "invoice.pdf",
                    content: pdf.buffer,
                    contentType: 'application/pdf'
                }
            ]
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
                return res.status(500).json({ message: "Error sending email", error: error.message });
            }

            try {
                const existingInvoice = await emailModel.findOne({ invoiceNo });
                if (existingInvoice) {
                    return res.status(400).json({ message: "Invoice number already exists" });
                }

                const pdfBase64 = pdf.buffer.toString('base64');

                const newInvoiceDetails = new emailModel({
                    invoiceNo,
                    invoiceDate,
                    companyName,
                    pdfBase64
                });

                await newInvoiceDetails.save();

                res.status(200).json({ message: "Mail sent and invoice details saved successfully", info: info.response });
            } catch (error) {
                console.error("Error saving invoice details: ", error);
                res.status(500).json({ message: "Error saving invoice details", error: error.message });
            }
        });
    } catch (error) {
        console.error("Server error: ", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}];





exports.customerNameByEmail=async(req,res)=>{
    try{
        const emailCompanyName=req.params.companyName
        const emailsCompanyName=await emailModel.find({companyName:emailCompanyName})
        if(!emailsCompanyName||emailsCompanyName.length===0){
            return res.status(404).json({ message: `Customer with CompanyName ${emailCompanyName} not found` })
        }res.status(200).json({ message: "Customer details fetched successfully", data: emailsCompanyName });
    }catch(error){
        res.status(500).json({message:"data fetching error found"})
    }
}




exports.savepdf = async (req, res) => {
    try {
        const { pdfBase64, invoiceNo, invoiceDate, companyName } = req.body;

   

        const exitingInvoice = await emailModel.findOne({ invoiceNo });
        if (exitingInvoice) {
            return res.status(400).json({ message: "Invoice number already exists" });
        }

        const newInvoiceDetails = new emailModel({
            invoiceNo,
            invoiceDate,
            companyName,
            pdfBase64
        });

        await newInvoiceDetails.save();
        res.send({
            message: "PDF file and invoiceData is saved successfully",
            invoiceData: newInvoiceDetails,
        });
    } catch (error) {
        res.status(500).json({ message: "PDF file error found" });
    }
};



exports.updatePaymentStatus = async (req, res) => {
    try {
        const { invoiceNo } = req.params; 
        const { paymentStatus, receivedAmount, receivedDate } = req.body; 

        if (!invoiceNo) {
            return res.status(400).json({ message: "Invoice number is required" });
        }

        if (paymentStatus && (!receivedAmount || !receivedDate)) {
            return res.status(400).json({ message: "Received amount and received date are required when payment status is true" });
        }

        const existingInvoice = await emailModel.findOne({ invoiceNo });
        if (!existingInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        const updatedFields = {
            paymentStatus
        };

        if (paymentStatus) {
            updatedFields.receivedAmount = receivedAmount;
            updatedFields.receivedDate = receivedDate;
        }

        await emailModel.findOneAndUpdate({ invoiceNo }, updatedFields);

        res.status(200).json({ message: "Payment status updated successfully" ,data:updatedFields});
    } catch (error) {
        console.error("Error updating payment status: ", error);
        res.status(500).json({ message: "Error updating payment status", error: error.message });
    }
};

exports.viewPdf=async(req,res)=>{
    try{
        const invoiceNo = req.params.invoiceNo;
        const pdf = await emailModel.findOne({ invoiceNo });
        if (!pdf) {
            return res.status(404).json({ message: 'PDF not found' });
        }
        res.json({ pdfBase64: pdf.pdfBase64 });
        
    }catch (error) {
        console.error("Error retrieving PDF:", error);
        res.status(500).json({ message: "Server error found", error: error.message });
    }
}




exports.getPreviousInvoiceNo = async (req, res) => {
    try {
     
        const lastEntry = await emailModel.findOne().sort({ _id: -1 }).exec();
        
        if (!lastEntry) {
            return res.status(404).json({ message: "No previous invoices found" });
        }

        return res.status(200).json({ 
            message: "Previous entry invoice number fetched successfully",
            data: lastEntry.invoiceNo
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching previous invoice number", error: error.message });
    }
};