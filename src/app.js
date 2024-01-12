import express from 'express'
import {Server} from 'socket.io'
import handlebars from 'express-handlebars'

import productsRouter from './routes/productsRouter.js'
import cartsRouter from './routes/cartsRouter.js'



import mongoose  from 'mongoose'
import viwesRoutes from './routes/viewsRouter.js'
import messagesRoutes from './routes/messages.routes.js'


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



app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/messages', messagesRoutes)
app.use('/',viwesRoutes)
//

//connect a db mongoAtlas
const httpServer=app.listen(PORT, ()=>{
    console.log(`Server is listend in port ${PORT}`)
})

mongoose.connect('mongodb+srv://api-directo:FTtayuVRLQw3y70i@cluster0.7tefz.mongodb.net/ecommerce?retryWrites=true&w=majority')
.then(()=>{console.log('Connectado')})
.catch(error=>{console.log(error)})

const io = new Server(httpServer)

io.on('connect', socket=>{
    console.log('nueva coneccion')

    socket.on('message',data=>{
        
        
        io.emit('respuesta',{mensage:'enviado correctamente'})
        
    })

})


