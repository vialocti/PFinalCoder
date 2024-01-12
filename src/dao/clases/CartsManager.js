import fs from 'fs'
export class CartsManager{

    constructor(path){
        this.path=path
    }

    


    

    //buscar carritos
    async #getCarts(){

        try {
            const datos = await fs.promises.readFile(this.path, 'utf-8') //leemos archivo que se encuentra en la carpeta del path
            return JSON.parse(datos) //convertimos en objeto js
        } catch (error) {//si no se encuentra
            await fs.promises.writeFile(this.path,JSON.stringify([]),'utf-8')//creamos un archivo con array vacio
            return []
        }
        
    }

    //traer productos  
    async getCartById(cartId){
        
        try {
           let carts =await this.#getCarts()
           let cart = carts.find(c => c.id === +cartId)
           if(!cart){return false}
           return cart.products 

        } catch (error) {
           console.log(error)
           return false
          }

    }


    //crear un carrito
    async addCarts(){
        
        let idc= 0
        let carts= await this.#getCarts()
        
        if(carts.length > 0){
        let ids= carts.map(c=>c.id)
        
        idc=Math.max(...ids) +1
        }else{
            idc=1
        }

        let cart ={
            id:idc,
            products:[]
        }
        carts.push(cart)
        
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(carts),'utf-8') 
            return true   
        } catch (error) {
            console.log(error)
            return false
        }

    }

 
   //adicionar un producto al carrito
 
    async addProducttoCart(cartId,productId){
        
        
        try {
           

            let carts = await this.#getCarts()
            let cart =carts.find(c => c.id === +cartId)
                 
           
            let productsc = cart.products
            let prod= productsc.find(p=>p.id === +productId)
           // console.log(prod)
            
            if(prod){
                     //console.log(prod)
                     let productfind=prod;
                     let cantidad = productfind.quantity+1
                     productfind = {...productfind, quantity:cantidad}
                     let productsN = productsc.filter(p=>p.id !== +productId)
                     productsN.push(productfind)
                     //console.log(productsN)
                     cart.products=null
                     cart.products=productsN
                     //console.log(cart)
                     let cartsN = carts.filter(c => c.id !== +cartId)
                     
                    cartsN.push(cart)
                     await fs.promises.writeFile(this.path,JSON.stringify(carts))
                     return true
                     
            }else{
                cart.products.push({id:+productId, quantity:1})
                           
               
                let cartsN = carts.filter(c => c.id !== +cartId)
               
                cartsN.push(cart)
                
        //
                await fs.promises.writeFile(this.path,JSON.stringify(carts))
                return true
            }
        
            

           

        } catch (error) {
            console.log(error)
            return false
        }
    }
    

    

}
