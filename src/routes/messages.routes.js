import { Router } from "express";
import { messagesModel } from "../dao/models/messages.models.js";

const messagesRoutes = Router()
    messagesRoutes.post('/',async(req,res)=>{
        
        const msg =req.body
            console.log(msg)
            await messagesModel.create(msg)
            res.send({estado:'OK', mensaje:'Datos Grabados'})

        try {
            
        } catch (error) {
            console.log(error)
            res.send()
        }
    })

export default messagesRoutes