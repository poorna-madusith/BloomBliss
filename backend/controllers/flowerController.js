const express = require('express');
const router = express.Router();
const flowers = require('../models/flowers');
const Category = require('../models/categories');




//get all flowers
exports.getFlowers = async (req,res) => {

    try{
        const flowersdata = await flowers.find().populate('category');
        if(flowersdata.length === 0){
            return res.status(404).json({message: "No flowers found!"});
        }
        return res.status(200).json(flowersdata);
    } catch (error) {
        console.error("Error fetching flowers:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


//add a flower
exports.addFlower = async (req,res)

