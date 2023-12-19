
const socket=io()
const outputData= document.getElementById("output")
//const b= document.getElementById("btn")
socket.emit('msg','nuevo cliente' )

socket.on('messages', datos=>{
    let productos = '';
    datos.forEach(producto => {
        productos+=`id:${producto.id} Producto:${producto.title} Precio:${producto.price} Cantidad:${producto.stock} <br />`
    });
    outputData.innerHTML = productos;
})
/*
b.addEventListener('click',()=>{
    socket.emit('msgpost', 1)
})*/

