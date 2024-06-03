import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

import {StatusCodes} from "http-status-codes";

import mongoose from "mongoose";

import Review from "../model/reviewmodel.js";

import {BadRequestError} from "../middlewares/errors.js";

export const addReview= async(req,res)=>{
    const {brewerId,review} =req.body;

    if(!brewerId || !review) throw new BadRequestError("Kindly Enter all values");

    try{
        await Review.create({
            brewerId,
            review,
            uid:req.userId,
        });
    }catch(e){
     res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({msg:"Error!"});
    }
    res.status(StatusCodes.CREATED).json({msg:"success"});

};

export const getReview=async(req,res)=>{
    const {brewerId}=req.params;
    const reviews=await Review.find({brewerId});
    res.status(StatusCodes.OK).json({data:reviews});
};