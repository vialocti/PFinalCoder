
const socket=io()
const outputData= document.getElementById("output")
const id_delete= document.getElementById("id_borrar")
const btn_delete= document.getElementById("eliminar")
socket.emit('msg','nuevo cliente' )

socket.on('messages', datos=>{
    let productos = '';
    datos.forEach(producto => {
        productos+=`ID:<strong>${producto.id}</strong> -- Producto:<strong>${producto.title}</strong> -- Precio:<strong>${producto.price}</strong> -- Stock:<strong>${producto.stock}</strong> <br/>`
    });
    outputData.innerHTML = productos;
})


id_delete.addEventListener('change',(event)=>{
    id_delete.value = event.target.value
})

btn_delete.addEventListener('click',(event)=>{
event.preventDefault()
alert(`se eliminar el producto ID:${id_delete.value}`)

     fetch(`/api/products/${id_delete.value}`, {
      method: 'DELETE',
})
.then(res => res.json())
.then(res=> {
      //console.log(res);
      socket.emit('msgdel','producto Eliminado' )
});
//socket.emit('msgdel','producto Eliminado' )


})

