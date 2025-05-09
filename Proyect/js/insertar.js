document.addEventListener("DOMContentLoaded",function(){


    document.getElementById("frm").addEventListener('submit',async function(event){
     event.preventDefault()
     let nombre=document.getElementById("nombre").value
     let documento=document.getElementById("documento").value
     let correo=document.getElementById("correo").value 
     let servicio=document.getElementById("Servicio").value 
     let pais = document.getElementById("pais").value
     let mensaje = document.getElementById("mensaje").value
    
    
     let respuesta=await fetch('http://127.0.0.1:5000/insertar',{
    
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({nombre,documento,correo,servicio,pais,mensaje})
     })
     console.log("La respuesta "+ respuesta)
     let data=await respuesta.json()
     console.log(data)
     if (data.mensaje=="ok")
        Swal.fire({
        title:"Registro de clientes",
        text:"Registro exitoso",
        icon:"success"
       })
    
    })
    })