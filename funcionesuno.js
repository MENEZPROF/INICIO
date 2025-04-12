"alert()"
"parseInt()"
"prompt()"

export function suma(){
    let numero1=parseInt(prompt("Digite un numero"))
    let numero2=parseInt(prompt("Digite un numero"))
    let resultado=numero1+numero2
    alert("El resultado de la suma es: " + resultado)
   
}



export function parqueadero(hora,minutos){

    let totalpagar=0;

    if(minutos > 0){
        totalpagar=hora*1500+1500

    }
    else{
        totalpagar=hora*1500
    }
    alert("El total a pagar es de: " +totalpagar)

}


export function calificacion(cal1,cal2,cal3,cal4){
let nota;
cal1=cal1*0.3
cal2=cal2*0.3
cal3=cal3*0.1
cal4=cal4*0.4

nota = (cal1+cal2+cal3+cal4)
alert("La nota final es: " + nota)

}

export function pulsaciones(sexo,edad){
let resultado
    if (sexo === "M"){
        resultado=(210-edad)/10    
    }
    
        else if(sexo === "F"){
        resultado=(220-edad)/10
        }
   
        else{ alert("Elegir una sexo"); return}


    alert("Resultado final para el sexo " + sexo + " es " + resultado)
}

