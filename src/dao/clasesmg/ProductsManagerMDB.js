import {productsModel} from '../models/products.models.js'


export class ProductsManagerMDB{
    
    constructor(){
        
    }

    //static id=0 //numero de id de cada producto

    
    
    async getProducts (){
        
        try {
           const products = await productsModel.find().lean()
           //console.log(products)
           return products

        } catch (error) {//si no se encuentra
           console.log(error)
           res.status(400).json({message:'error al buscar productos'})
        }
    }

    //buscar un producto pr su id
    async getProductById(productID){
        
        if(!productID){return console.log('Numero no valido')}
        try {
          const product = await productsModel.findOne({_id:productID}).lean()
          return product

        } catch (error) {
            console.log(error)
            return error            
        }

    }


    //adicionar un nuevo producto
    async addProduct(new_p){
        
             
        try{
       
        const resu = await productsModel.create(new_p)
        return resu
        
        }catch(error){
            console.log(error)
            return error
        }

        
    }

    //modificar producto
    async updateProductById(productId, productUpdate){
     
                   
        try{
         const updateproduct = await productsModel.updateOne({_id:productId},productUpdate)
        
         if(updateproduct.modifiedCount>0){
            return true
         }
         return resu          
        
        
        }catch(error){
            console.log(error)
            return error
        }
    }


    //eliminar un registro

    async deleteProductoById(productId){
        
        

        try {
        
            const deleteProduct = await productsModel.deleteOne({_id:productId})
            
            console.log(deleteProduct)
            if(deleteProduct.deletedCount>0){
            
                return true
            
            }
                   
            return false

        } catch (error) {
            console.log(error)
            return error
            
        }
        
        

    }

  
}


