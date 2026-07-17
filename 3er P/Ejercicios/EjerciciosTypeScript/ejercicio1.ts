/*
Corregir el siguiente codigo aplicando tipos adecuados
let nombre = 25;
let edad = "Juan";
let activo = "true";

function sumar(a,b){
    return a+b;
}
*/

//Solucion
let nombre1:string = "Juan";
let edad1:number = 25;
let activo1:boolean = true;

function sumar1(a1:number, b1:number):number{
    return a + b;
}

let a1:number = 5;
let b1:number = 6;

console.log(sumar1(a1,b1))