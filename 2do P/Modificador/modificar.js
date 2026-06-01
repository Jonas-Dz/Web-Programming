function cambio(){
    let titulo = document.getElementById("titulo");
    
    titulo.textContent = "Cambio de titulo";
    titulo.style.color = "gray";
}

function resaltar(){
    let titulo = document.getElementById("titulo");

    titulo.style.backgroundColor = "yellow";
}

function restablecer(){
    let titulo = document.getElementById("titulo");

    titulo.textContent = "Registro 1";
    titulo.style.backgroundColor = "white";
}

function imagen1(){
    let imagen = document.getElementById("imagen");    
    imagen.src = "../Imagenes/perro.jpg";
}

function imagen2(){
    let imagen = document.getElementById("imagen");    
    imagen.src = "../Imagenes/dormido.jpg";
}