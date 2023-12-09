import fs from 'fs'


export class ProductsManager{
    
    constructor(path){
        this.path=path
    }

    //static id=0 //numero de id de cada producto

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
    async addProduct(allproducts,new_p){
        
      
   
        
        try{
//        let products = await fs.promises.readFile(this.path,'utf-8')
         
        //ProductsManager.id++
        //new_p.id=ProductsManager.id
        new_p.status=true
        
        allproducts.push(new_p)
        await fs.promises.writeFile(this.path,JSON.stringify(allproducts))
        return true
        
        }catch(error){
            console.log(error)
            return error
        }

        
    }

    //modificar producto
    async updateProductById(productId, productUpdate){
        const productos = await this.getProducts()



        let productsupdated = productos.map(pro=>{
            if(pro.id===+productId){
                return {...pro,...productUpdate, id:+productId}
            }
           return pro
        })

        await fs.promises.writeFile(this.path,JSON.stringify(productsupdated))
        return true
    }
    //eliminar un registro

    async deleteProductoById(productId){
        
        let productos =JSON.parse(await fs.promises.readFile(this.path,'utf-8'))

        let productosact= productos.filter(elemento => elemento.id !== +productId)
        await fs.promises.writeFile(this.path,JSON.stringify(productosact))


    }

  
}


