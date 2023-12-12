import {Router} from 'express'
import {CartsManager}  from '../clases/CartsManager.js'
import { ProductsManager } from '../clases/ProductsManager.js'

const cartsRouter=Router()


cartsRouter.post('/', async (req,res)=>{
    
    const newCart = new CartsManager('./src/storage/carts.json')
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
    const newCart = new CartsManager('./src/storage/carts.json')
    
    try {
        
        const resu = await newCart.getCartById(cid)
        if(!resu){return res.send({aviso:'warning', message:'No existe ese carrito'})}
        
        res.send({status:'Ok',productos:resu})
   
    } catch (error) {
        console.log(error)
        res.send(error)
        
    }

})

cartsRouter.post('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid}=req.params

    const newProd = new ProductsManager('./src/storage/products.json')
    const newCart = new CartsManager('./src/storage/carts.json')
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