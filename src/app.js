import express from 'express'
import {Server} from 'socket.io'
import handlebars from 'express-handlebars'

import cartsRouter from './routes/cartsRouter.js'
import productsRouter from './routes/productsRouter.js'
import { ProductsManager } from './clases/ProductsManager.js'



//
const PORT=8000

const app=express()

//
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//motor plantilla

app.engine('handlebars', handlebars.engine())
app.set('views', 'src/views')
app.set('view engine', 'handlebars')
//


//router prueba
app.get('/', (req,res)=>{
    res.render('index')
})


app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

//
const httpServer=app.listen(PORT, ()=>{
    console.log(`Server is listend in port ${PORT}`)
})
let products=[]
const io = new Server(httpServer)


io.on('connection', socket=>{
   // console.log('connection new')


    
    socket.on('msg', async data=>{
    
       const PM=new ProductsManager('./src/storage/products.json')
       products=await PM.getProducts()
       io.emit('messages',products)
    })

    socket.on('msgdel', async data=>{
        //console.log('se elimino un producto')
        const PM=new ProductsManager('./src/storage/products.json')
        products=await PM.getProducts()
        io.emit('messages',products)
     })
   

})