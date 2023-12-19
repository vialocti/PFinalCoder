
const socket=io()
const outputData= document.getElementById("output")
//const b= document.getElementById("btn")
socket.emit('msg','nuevo cliente' )

socket.on('messages', datos=>{
    let productos = '';
    datos.forEach(producto => {
        productos+=`ID:<strong>${producto.id}</strong> -- Producto:<strong>${producto.title}</strong> -- Precio:<strong>${producto.price}</strong> -- Stock:<strong>${producto.stock}</strong><br/>`
    });
    outputData.innerHTML = productos;
})
/*
b.addEventListener('click',()=>{
    socket.emit('msgpost', 1)
})*/

