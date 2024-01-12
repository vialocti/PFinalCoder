import mongoose from "mongoose";

const messageCollection='messages';

const messagesSchema=mongoose.Schema({
    userEmail:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

export const messagesModel = mongoose.model(messageCollection, messagesSchema)