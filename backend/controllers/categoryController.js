const express = require('express');
const category = require('../models/categories');
const flower  = require('../models/flowers');


//add category
exports.addCategory = async (req,res) => {
    
    const {_id,name} = req.body;

    try{
    
        if(!_id || !name){
            return res.status(400).json({message:"Please provide all the required fields!"});
        }
        
        const newCategory = new category({
            _id,
            name
        });

        await newCategory.save();
        return res.status(201).json({message:"Category created successfully! "});

    }catch(err){
        console.error("Error while adding category: ", err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}


//get all categories
exports.getCategory = async (req,res) => {
    try{
        const categories = await category.find();
        if(categories.length ===0){
            return res.status(404).json({message:"no categories are found! "});
        }

        const categoriesWithflowers = await Promise.all(categories.map(async (cat)=>{
            const flowers = await flower.find({category: cat._id});
            return {
                id: cat._id,
                name: cat.name,
                flowers:flowers
            }
        }))

        return res.status(200).json(categoriesWithflowers);
    }catch(err){
        console.error("Error while fetching categories: ", err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}


//get category by id
exports.getCategoryById = async (req,res) => {
    
    const id = Number(req.params.id);

    try{
        const categoryData = await category.findById(id);
        if(!categoryData){
            return res.status(404).json({message:"Category not found!"});
        }

        const flowers = await flower.find({category: id});
        const categoryWithFlowers = {
            id: categoryData._id,
            name: categoryData.name,
            flowers: flowers
        };

        return res.status(200).json(categoryWithFlowers);
    }catch(err){
        console.error("Error while fetching category by id: ", err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}