document.addEventListener("DOMContentLoaded", function () {
   document.getElementById("formulario").addEventListener("submit", async function (event) {
     event.preventDefault();
 
     let nombre = document.getElementById("nombre").value;
     let documento = document.getElementById("documento").value;
     let sexo = document.getElementById("sexo").value;
     let correo = document.getElementById("correo").value;
     let servicio = document.getElementById("servicio").value;
     let pais = document.getElementById("pais").value;
     let mensaje = document.getElementById("mensaje").value;
 
     let datos = { nombre, documento,sexo, correo, servicio, pais, mensaje };
 
     let respuesta = await fetch("http://127.0.0.1:5000/insertar", {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(datos)
     });
 
     let data = await respuesta.json();
     console.log(data);
 
     if (data.mensaje === "ok") {
       Swal.fire({
         title: "Registro de clientes",
         text: "Registro exitoso",
         icon: "success"
       });
 
       // Descargar JSON
       const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
       const url = URL.createObjectURL(blob);
       const a = document.createElement("a");
       a.href = url;
       a.download = "formulario.json";
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       URL.revokeObjectURL(url);
     }
   });
 });
