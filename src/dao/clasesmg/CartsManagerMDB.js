import { cartsModel } from "../models/carts.models.js"


export class CartsManagerMDB{

    constructor(){
       
    }

    

   //buscar carritos
    async getCarts(){
       
        try {
            const carts = await cartsModel.find().lean()   
            return carts //convertimos en objeto js
        } catch (error) {//si no se encuentra
            console.log(error)
            return error
            
        }
        
    }

    //traer productos  
    async getCartById(cartId){
        
        try {
           const cartProducts=await cartsModel.find({_id:cartId}).lean()

           return cartProducts

        } catch (error) {
           console.log(error)
           return false
          }

    }

    //eliminar productos  
    async deleteCartById(cartId){
        
        try {
           const cartProducts=await cartsModel.deleteOne({_id:cartId})
           if(cartProducts.deletedCount>0){
                return true
           }else{
            return false
           }
           

        } catch (error) {
           console.log(error)
           return false
          }

    }



    //crear un carrito
    async addCarts(newCart){
        
                
        try {
            const cart = await cartsModel.create(newCart)
            return true   
        } catch (error) {
            console.log(error)
            return false
        }

    }

 
   //adicionar un producto al carrito
 
    async addProducttoCart(cartId,productId){
        
        let productsAll=await cartsModel.find({_id:cartId},{products:1,_id:0})
        
        console.log(productsAll)
        let product={
            id_product:productId,
            quantity:1
        }
        
       

        try {
           
            const updateCart= await cartsModel.updateOne( { _id:cartId },
            { $push: { products: product} })  
           console.log(updateCart)
            if(updateCart.modifiedCount>0){
                return true
            }
                return false

        } catch (error) {
            console.log(error)
            return false
        }
    }
    

    

}
