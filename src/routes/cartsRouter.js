import {Router} from 'express'
import {CartsManagerMDB}  from '../dao/clasesmg/CartsManagerMDB.js'
import { ProductsManagerMDB } from '../dao/clasesmg/ProductsManagerMDB.js'

const cartsRouter=Router()


cartsRouter.get('/',async (req,res)=>{
    const newCart = new CartsManagerMDB()
    try {
        const carts = await newCart.getCarts()
        
            res.send(carts)
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


cartsRouter.post('/', async (req,res)=>{
    
    const newCart = new CartsManagerMDB()
    try {
        const resu = await newCart.addCarts()
        if (resu){
            res.send({status:'Ok',messagge:'se creo un nuevo carrito'})
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

cartsRouter.get('/:cid', async(req,res)=>{
    const {cid}= req.params
    const newCart = new CartsManagerMDB()
    
    try {
        
        const resu = await newCart.getCartById(cid)
        console.log(resu)
        if(!resu){return res.send({aviso:'warning', message:'No existe ese carrito'})}
        
        res.send({status:'Ok',productos:resu})
   
    } catch (error) {
        console.log(error)
        res.send(error)
        
    }

})


cartsRouter.delete('/:cid', async(req,res)=>{
    const {cid}= req.params
    const newCart = new CartsManagerMDB()
    
    try {
        
        const resu = await newCart.deleteCartById(cid)
        //console.log(resu)
        if(!resu){return res.send({aviso:'warning', message:'No existe ese carrito'})}
        
        res.send({status:'Ok',message:'carrito eliminado'})
   
    } catch (error) {
        console.log(error)
        res.send(error)
        
    }

})


cartsRouter.put('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid}=req.params

    const newProd = new ProductsManagerMDB()
    const newCart = new CartsManagerMDB()
    try {
        const producto= await newProd.getProductById(pid)
       
        if(!producto){ return res.send({aviso:'warning', message:'Producto no existe'})}
            const resu = await newCart.addProducttoCart(cid,pid)
        if(resu){
            res.send({status:'ok',message:'Se Agrgego un nuevo Producto'})
        }
    } catch (error) {
        console.log(error)

    }
})


export default cartsRouter