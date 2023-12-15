import express from 'express'
import {Server} from 'socket.io'
import handlebars from 'express-handlebars'

import cartsRouter from './routes/cartsRouter.js'
import productsRouter from './routes/productsRouter.js'


//
const PORT=8080
const app=express()

//
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

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
app.listen(PORT, ()=>{
    console.log(`Server is listend in port ${PORT}`)
})