const express = require('express');
const addmodel = require('../Model/Addmodel')
const moment = require('moment');

exports.adddetails=async(req,res)=>{
    try{
        const{Name,Type,CreditAmount,DebitAmount,CreditReason,DebitReason,TransactionDetails,AttachFile,Description,Date}=req.body
        
        const latestEntry = await addmodel.findOne({},{},{sort:{'Date':-1}})
       
        let openingBalance=0

        if(!latestEntry){
            openingBalance=req.body.OpeningBalance||0
        }else{
            openingBalance=latestEntry.Balance
        }
        const balance = openingBalance+parseFloat(CreditAmount||0)-parseFloat(DebitAmount||0)
        const newdetails = new addmodel({
            Name,
            Type,
            OpeningBalance:openingBalance,
            CreditAmount:parseFloat(CreditAmount||0),
            DebitAmount:parseFloat(DebitAmount||0),
            Balance:balance,
            CreditReason,
            DebitReason,
            TransactionDetails,
            AttachFile,
            Description,
            Date
        })
        await newdetails.save()
        res.send({
            message:"Add details saved successfuly",
            data:newdetails
        })
    }catch(error){
        res.status(500).json({message:"Add details error found",error})
    }
}



exports.getdetails = async(req,res)=>{
    try{
        const entries = await addmodel.find({}, {}, { sort: { 'Date': -1 } });
        if(entries.length===0){
            return res.status(404).json({ message: "No details found" });
        }
        let totalCreditAmount =0
        let totalDebitAmount =0
        let openingBalance =entries[entries.length-1].OpeningBalance
        entries.forEach(entry=>{
            totalCreditAmount += entry.CreditAmount;
            totalDebitAmount+=entry.DebitAmount
        })
        let balance = openingBalance + totalCreditAmount - totalDebitAmount;
        res.status(200).json({
            message:"Detail found",
            data:{
                OpeningBalance: openingBalance,
                CreditAmount: totalCreditAmount,
                DebitAmount: totalDebitAmount,
                Balance: balance
            }
        })
    }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while fetching details" });
}}

exports.getOpeningBalance = async (req, res) => {
    try {
        const currentDate = new Date();
        const firstDateOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDateOfPreviousMonth = new Date(firstDateOfCurrentMonth);
        lastDateOfPreviousMonth.setDate(0);

        const latestEntry = await addmodel.findOne({ Date: { $lte: lastDateOfPreviousMonth.toISOString() } }, {}, { sort: { 'Date': -1 } });

        let openingBalance = 0;

        if (latestEntry) {
            openingBalance = latestEntry.Balance;
        }

        res.send({
            message: "Opening balance fetched successfully",
            openingBalance: openingBalance,
            data:openingBalance,
            date: firstDateOfCurrentMonth.toISOString()
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching opening balance", error });
    }
};






exports.getalldetails = async (req, res) => {
    try {
        // Get the current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-indexed month
        const currentYear = currentDate.getFullYear();

        // Construct the start and end dates for the current month
        const startDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
        const endDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-31`; // Assuming max 31 days in a month

        // Find documents with Date between startDate and endDate
        const Adddetails = await addmodel.find({
            Date: {
                $gte: startDate,
                $lte: endDate
            }
        });

        if (Adddetails.length === 0) {
            res.status(404).json({ message: "No Add details found for this month" });
        } else {
            res.status(200).json({ message: "Add details data fetched successfully for this month", data: Adddetails });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Failed to fetch data" });
    }
}



exports.getDetailsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

      
        const isoStartDate = new Date(startDate);
        const isoEndDate = new Date(endDate);

        if (isNaN(isoStartDate.getTime()) || isNaN(isoEndDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

 
        const details = await addmodel.find({
            Date: {
                $gte: isoStartDate.toISOString(),
                $lte: isoEndDate.toISOString()
            }
        });

        if (details.length === 0) {
            return res.status(404).json({ message: "No details found for the specified date range" });
        } else {
            return res.status(200).json({ message: "Details fetched successfully for the specified date range", data: details });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ message: "Failed to fetch data" });
    }
};
exports.editdetails=async(req,res)=>{
    try{
        const id= req.params.id
        const detailsid = await addmodel.findById(id)
        if(!detailsid){
            return res.status(404).json({message:'Details not found'})
        }
        const updatedetails = await addmodel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({message:" Update Successfully",data:updatedetails})

    }catch(error){
        res.status(500).json({message:"server error found"})
    }
}


exports.deletedetail = async(req,res)=>{
    try{
        const id = req.params.id
        const deleteid = await addmodel.findById(id)
        if(!deleteid){
            return res.status(404).json({message:"details not found"})
        }
       await addmodel.findByIdAndDelete(id)
        res.status(200).json({message:" Deleted Successfully"})

    }catch(error){
        res.status(500).json({message:"server error"})
    }
}


