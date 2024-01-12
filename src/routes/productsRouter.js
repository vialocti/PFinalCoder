import {Router} from 'express'
import { uploader } from '../utils/multer.js'

import {ProductsManagerMDB} from '../dao/clasesmg/ProductsManagerMDB.js'





const productsRouter=Router()


//traer todos los productos o limitado a u numero


// traer todos los productos o una cantidad limitada

productsRouter.get('/',async (req,res)=>{

    let limit = req.query.limit
    let productos=[]

    const PManager = new ProductsManagerMDB()
   try {
    if(!limit){
        productos= await PManager.getProducts()
        
        return  res.render('home',{productos, title:'Productos'})
        //return res.send(productos)
    }
    
    
    const allproducts = await PManager.getProducts()
    
    productos=allproducts.slice(0,limit)
    //console.log(arraylimit)
     res.render('home',{productos, title:'Productos'})
    //res.send(productos)
    
   } catch (error) {
    return res.send({error:"se ha producido un error"})
   }
    

})

//traer un producto por su id

productsRouter.get('/:pid', async(req,res)=>{
    const {pid} = req.params
    const PManager = new ProductsManagerMDB()
    
    try {
        const product=await PManager.getProductById(pid)
        
        if(!product){
            res.send({status:'Ok', message:'NO encontrado el Producto con ese id'})
        }else{
        return res.send(product)
        }
    } catch (error) {

        return res.send({error:"se ha producido un error"})
    }

})




//grabar un producto en el archivo
productsRouter.post('/', uploader.single('file'), async (req,res)=>{
   

    const new_p = req.body
    const path = req.file.path.split('public').join('')
    //console.log(req.file.path)
    
    
    const PManager=new ProductsManagerMDB()

    if(!new_p.title || !new_p.description || !new_p.code || !new_p.price || !new_p.stock || !new_p.category){
        return res.send({status:"error",descripcion:"datos incompletos"})
    }
        
 
    try {
         
            const result = await PManager.addProduct({...new_p,thumbnails:path})
             if(result.index===0){
                return res.send({status:"Error",desctiption:"datos producto mal"})
             }
             res.send({status:"Ok",desctiption:"alta producto"})
           
              //res.redirect('/api/products/realtimeproducts')
    } catch (error) {
        console.log(error)
    }

})


//actualizar datos
productsRouter.put('/:pid',async (req,res)=>{
   const {pid} = req.params
   const productupdate = req.body

   const PManager=new ProductsManagerMDB()
   
   try {
        const resu =PManager.updateProductById(pid,productupdate)
        
        if(resu){res.send({status:'Ok', messsage:'Actualizado'})
    }else{
       
        res.send({status:'Ok', messsage:'No encontrado'}) 
    }
    } catch (error) {
       console.log(error)
   }

})

//borrar un producto
productsRouter.delete('/:pid', async(req,res)=>{
    const {pid} = req.params

    const PManager=new ProductsManagerMDB()
   
    
    try {
        const resu = await PManager.deleteProductoById(pid)
        console.log(resu)
        if(resu){
            res.send({status:'Ok', messsage:`Elemento Id:${pid} Eliminado`})
            
            
        }else{
            res.send({status:'Ok', messsage:`Elemento ID:${pid} No encontrado`})
        }
       
    } catch (error) {
        console.log(error)
    }finally{
        // res.redirect('/api/products/realtimeproducts')
    }

})

//////







export default productsRouter