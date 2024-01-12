import mongoose from "mongoose";

const productsCollection ='products'

const productsSchema = mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:true
   },
   description:{
    type:String,
    required:true
   },
   code:{
    type:String,
    required:true,
    unique:true
   },
   price:{
    type:Number,
    required:true
   },
   stock:{
    type:Number,
    required:true
   },
   category:{
    type:String,
    required:true
   },
   thumbnails:{
    type:String,
    required:true
   },
   status:{
    type:Boolean,
    default:true
   }



})


export const productsModel = mongoose.model(productsCollection,productsSchema)
