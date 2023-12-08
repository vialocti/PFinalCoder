import {Router} from 'express'
import {ProductsManager} from '../clases/ProductsManager.js'

const productsRouter=Router()

productsRouter.get('/',(req,res)=>{
    try {
        
    } catch (error) {
        
    }


})

productsRouter.get('/:pid', (req,res)=>{
    const pid = req.params
    try {
        
    } catch (error) {
        
    }

})

productsRouter.post('/',(req,res)=>{
    const product = req.body
    try {
        
    } catch (error) {
        
    }

})

productsRouter.put('/:pid', (req,res)=>{
   const pid = req.params
   try {
        
   } catch (error) {
       
   }

})

productsRouter.delete('/:pid', (req,res)=>{
    try {
        
    } catch (error) {
        
    }

})





export default productsRouter