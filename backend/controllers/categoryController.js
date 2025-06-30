const express = require('express');
const category = require('../models/categories');
const flower  = require('../models/flowers');


exports.addCategory = async (req,res) => {
    
    const {id,name} = req.body;

    try{
    
        if(!id || !name){
            return res.status(400).json({message:"Please provide all the required fields!"});
        }
        
        const newCategory = new category({
            id,
            name
        })

        await newCategory.save();
        return res.status(201).json({message:"Category created successfully! "});

    }catch(err){
        console.error("Error while adding category: ", err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}