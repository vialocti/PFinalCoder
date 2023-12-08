import fs from 'fs'
import path from 'path'

export class ProductsManager{
    
    constructor(path){
        this.path
    }

    static id=0 //numero de id de cada producto

    //traer todos los productos que se encuentran almacenados en un archivo json 
    // y si no hay archivo array vacio []
    async getProducts (){
        try {
            const datos = await fs.promises.readFile(this.path, 'utf-8') //leemos archivo que se encuentra en la carpeta del path
            return JSON.parse(datos) //convertimos en objeto js
        } catch (error) {//si no se encuentra
            await fs.promises.writeFile(this.path,JSON.stringify([]),'utf-8')//creamos un archivo con array vacio
            return []
        }
    }

    //buscar un producto pr su id
    async getProductById(productID){
        
        if(!productID){return console.log('Numero no valido')}
        try {
            let products = await fs.promises.readFile(this.path,'utf-8')
            let product = products.find(pr=>pr.id===parseInt(productID))
            return product
        } catch (error) {
            return error            
        }

    }


    //adicionar un nuevo producto
    async addProduct(new_product){
        
        if(!new_product.name){
            return
        }
        try{
        let products = await fs.promises.readFile(this.path,'utf-8')
        ProductManager.id++
        new_product.id=ProductManager.id
        products.push(new_product)
        await fs.promises.writeFile(this.path,JSON.stringify(products))
        }catch(error){
            return error
        }
    }

    
    

}