import {Router} from 'express'
import {CartsManager}  from '../clases/CartsManager.js'


const cartsRouter=Router()


cartsRouter.post('/', async (req,res)=>{
    
    const newCart = new CartsManager('./src/storage/carts.json')
    try {
        const resu = await newCart.addCarts()
        if (resu){
            res.send({status:'Ok'})
        }
    } catch (error) {
        res.send(error)
    }

})

cartsRouter.get('/:cid', async(req,res)=>{
    const {cid}= req.params
    const newCart = new CartsManager('./src/storage/carts.json')
    
    try {
        
        const resu = await newCart.getCartById(cid)
        res.send({status:'Ok',payload:resu})
    } catch (error) {
        
    }

})

cartsRouter.post('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid}=req.params
    const newCart = new CartsManager('./src/storage/carts.json')
    try {
        const resu = await newCart.addProducttoCart(cid,pid)
        if(resu){
            res.send({status:'ok'})
        }
    } catch (error) {
        
    }
})


export default cartsRouter