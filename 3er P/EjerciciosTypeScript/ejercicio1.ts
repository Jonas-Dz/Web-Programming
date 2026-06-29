/*
Corregir el siguiente codigo aplicando tipos adecuados
let nombre = 25;
let edad = "Juan";
let activo = "true";

function sumar(a,b){
    return a+b;
}
*/

let nombre:string = "Juan";
let edad:number = 25;
let activo:boolean = true;

function sumar(a:number, b:number){
    return a + b;
}

let a:number = 5;
let b:number = 6;

sumar(a,b);