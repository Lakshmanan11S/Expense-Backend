const express = require('express');
const addmodel = require('../Model/Addmodel')

exports.adddetails=async(req,res)=>{
    try{
        const newdetails = new addmodel({
            Name:req.body.Name,
            Type:req.body.Type,
            Amount:req.body.Amount,
            AttachFile:req.body.AttachFile,
        
            Description:req.body.Description,
            Date:req.body.Date
        })
        await newdetails.save()
        res.send({
            message:"Add details saved successfuly",
            data:newdetails
        })
    }catch(error){
        res.status(500).json({message:"Add details error found"})
    }
}

exports.getalldetails = async(req,res)=>{
    try{
        const Adddetails = await addmodel.find()
        if(!Adddetails){
            res.status(404).json({message:"Add details not found"})
        }else{
            res.status(200).json({message:"Add details data fetch successfully",data:Adddetails})
        }
    }catch(error){
        res.status(500).json({message:"fetch data error found"})
    }
}


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