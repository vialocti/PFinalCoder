import {Router} from 'express'
import {ProductsManager} from '../clases/ProductsManager.js'

const productsRouter=Router()

//traer todos los productos o limitado a u numero

productsRouter.get('/',async (req,res)=>{

    let limit = req.query.limit

    const PManager = new ProductsManager('./src/storage/products.json')
   try {
    if(!limit){
        return res.send(await PManager.getProducts())
    }
    let arraylimit=[]
    
    const allproducts = await PManager.getProducts()
    
    arraylimit=allproducts.slice(0,limit)
    
    res.send(arraylimit)
   } catch (error) {
    return res.send({error:"se ha producido un error"})
   }
    

})
//traer un producto por su id
productsRouter.get('/:pid', async(req,res)=>{
    const {pid} = req.params
    const PManager = new ProductsManager('./src/storage/products.json')
    
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
productsRouter.post('/', async (req,res)=>{

    const new_p = req.body
    const PManager=new ProductsManager('./src/storage/products.json')

    if(!new_p.title || !new_p.description || !new_p.code || !new_p.price || !new_p.stock || !new_p.category || !new_p.thumbnails){
        return res.send({status:"error",descripcion:"datos incompletos"})
    }
        
 
    try {
         const allproducts =  await PManager.getProducts()
         let pid= 0
        
        
        if(allproducts.length > 0){
            let ids= allproducts.map(c=>c.id)
            pid=Math.max(...ids) + 1
        }else{
            pid=1
        }
        new_p.id=pid
            await PManager.addProduct(allproducts,new_p)
        
            res.send({status:"Ok",desctiption:"alta producto"})
        
    } catch (error) {
        console.log(error)
    }

})


//actualizar datos
productsRouter.put('/:pid',async (req,res)=>{
   const {pid} = req.params
   const productupdate = req.body

   const PManager=new ProductsManager('./src/storage/products.json')
   
   try {
        let resu= await PManager.updateProductById(pid, productupdate)    
        
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
    const PManager=new ProductsManager('./src/storage/products.json')
    try {
        const resu = await PManager.deleteProductoById(pid)
        if(resu){
            res.send({status:'Ok', messsage:`Elemento Id:${pid} Eliminado`})
        }else{
            res.send({status:'Ok', messsage:`Elemento ID:${pid} No encontrado`})
        }

    } catch (error) {
        console.log(error)
    }

})





export default productsRouter