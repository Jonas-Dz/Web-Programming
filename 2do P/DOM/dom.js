//let elemento = document.getElementById("titulo");

//console.log(elemento);

let elemento = document.getElementById("titulo").textContent = "prueba";

console.log(elemento);

//Selector de etiqueta
let parrafos = document.getElementsByTagName("p");

console.log(parrafos[0]);

parrafos[1].textContent = "DOM 1";

//Selector de clase
let elementos = document.getElementsByClassName("parrafo3");

console.log(elementos[0]);

//Selector de querySelector
let titulo = document.querySelector("#titulo");
console.log(titulo);
let mensaje = document.querySelector(".parrafo3");
console.log(mensaje);
let parrafo = document.querySelector("p");
console.log(parrafo);

//Selector de querySelectorAll
let resultados = document.querySelectorAll("p");

resultados.forEach( p =>{
    console.log(p.textContent);
});

//Modificar HTML
resultados.forEach( p =>{
    p.innerHTML = "<strong>Modificar HTML Interno</strong>";
});