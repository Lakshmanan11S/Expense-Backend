const express = require('express')
const customerModel = require('../Model/Customermodel')

exports.addCustomer=async(req,res)=>{
    try{
        const{CompanyName,GstNumber,Email,PhoneNumber,AddressLine1,AddressLine2,PostalCode,CityName,District,WebSite}=req.body
        const newcustomer =  new customerModel({
            CompanyName,GstNumber,Email,PhoneNumber,AddressLine1,AddressLine2,PostalCode,CityName,District,WebSite
        })
        await newcustomer.save()
        res.send({
            message:"customer saved Successfully",data:newcustomer
        })
    }catch(error){
        res.status(500).json({message:"customer save error found"})
    }
}

exports.getAllCustomer=async(req,res)=>{
    try{
        const customerDetails = await customerModel.find()
        if(!customerDetails){
            return res.status(404).json({message:"customer Details not found"})
        }else{
            res.status(200).json({message:"customer details fetched successfully",data:customerDetails})
        }
    }catch(error){
        res.status(500).json({message:"customer details fetched error found"})
    }
}

exports.getCustomerName=async(req,res)=>{
    try{
        const customers = await customerModel.find({},'CompanyName')
        if(!customers){
            return res.status(404).json({message:"customer not found"})
        }else{
            res.send({message:"customer retrieved successfully",data:customers})
        }
    }catch(error){
        res.status(500).json({message:"Error retrieving customers "})
    }
}

exports.getCustomerDetailsByName=async(req,res)=>{
    try{
        const companyName=req.params.CompanyName
        const customerDetails = await customerModel.find({CompanyName:companyName})
        if(!customerDetails||customerDetails.length===0){
            return res.status(404).json({ message: `Customer with CompanyName ${companyName} not found` })
        }res.status(200).json({ message: "Customer details fetched successfully", data: customerDetails });
    } catch (error) {
        res.status(500).json({ message: "Customer details fetch error found" });
    }
}