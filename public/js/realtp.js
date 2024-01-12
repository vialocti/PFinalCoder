

const outputData= document.getElementById("output")
const id_delete= document.getElementById("id_borrar")
const btn_delete= document.getElementById("eliminar")




const actualizar_productos=(datos)=>{
    let productos = '<table class="table"><thead><tr><th>ID</th><th>Producto</th><th>Precio</th><th>Stock</th></tr></thead><tbody>';
    datos.forEach(producto => {
        productos+=`<tr><td>${producto.id}</td><td>${producto.title}</td><td>${producto.price}</td><td>${producto.stock}</td> <tr/>`
    });
    outputData.innerHTML = productos+'</tbody></table>';

}

const traerProductos= async()=>{
   try {
    const resu =await fetch('/api/products/')
    console.log(resu)
   } catch (error) {
    console.log(error)
   }
   

  
  }


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
      //socket.emit('msgdel','producto Eliminado' )
});
//socket.emit('msgdel','producto Eliminado' )


})

traerProductos()

