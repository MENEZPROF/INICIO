document.addEventListener("DOMContentLoaded",function(){
    let contenedor=document.getElementById('tabla')
    fetch('http://127.0.0.1:5000/consultar')



  .then(datos=>datos.json())
  .then(respuesta=>{
    console.log(respuesta)
    for (let i in respuesta){
      contenedor.innerHTML+=`<tr><td>${respuesta[i].nombre}</td>
                                 <td>${respuesta[i].documento}</td>
                                 <td>${respuesta[i].sexo}</td>
                                 <td>${respuesta[i].correo}</td>
                                 <td>${respuesta[i].servicio}</td>
                                 <td>${respuesta[i].pais}</td>
                                 <td>${respuesta[i].mensaje}</td>
                             </tr>`
    }
  
})
})