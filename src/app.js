import express from 'express'
import cartsRouter from './routes/cartsRouter.js'
import productsRouter from './routes/productsRouter.js'


//
const PORT=8080
const app=express()

//
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use('static',express.static('public))

//
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
//
app.listen(PORT, ()=>{
    console.log(`Server is listend in port ${PORT}`)
})