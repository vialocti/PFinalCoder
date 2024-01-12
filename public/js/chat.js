const socket = io()
let chatmsg=null
const mensageschat= async() => {
  
const { value: formValues } = await Swal.fire({
    title: "Ingrese email y mensage",
    html: `
      <input id="swal-input1" class="swal2-input">
      <input id="swal-input2" class="swal2-input">
    `,
    focusConfirm: false,
    preConfirm: () => {
      
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value
      ];
    }
  });

  
  if (formValues) {
    // console.log(formValues)
    //Swal.fire(JSON.stringify(formValues));
    chatmsg={
      userEmail:formValues[0],
      message:formValues[1]
    }
    socket.emit('message',{data:chatmsg}) //enviamos mensaje

  }
}

mensageschat()

socket.on('respuesta', mensage=>{
  console.log(chatmsg)
  if(chatmsg.userEmail!=="" && chatmsg.mensage!==""){

  fetch('/api/messages/', {
    method: "POST", 
    body: JSON.stringify(chatmsg), 
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if(response.status===200){
        Swal.fire("Mensaje Grabado Correctamente");
      }else{console.log(error)}
    });
  } else{
        Swal.fire({
          title:"no puede ser vacio el email o el mensaje",
          confirmButtonText: "Continuar",
  
        }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
              mensageschat()
          }
      
      } );
        
        }
})
