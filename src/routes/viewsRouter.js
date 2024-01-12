import {Router} from 'express'


const viwesRoutes=Router()

viwesRoutes.get('/product', (req,res)=>{
    res.render('cargarProducto')
})

viwesRoutes.get('/messages',(req,res)=>{
    res.render('chat')
})


export default viwesRoutes