//Ejercicio 1

/*console.log("hola");
let num1 = Number(prompt("ingrese número: "));
let num2 = Number(prompt("ingrese número: "));
console.log("La suma es: " + (num1 + num2));
console.log("La resta es: " + (num1 - num2));
console.log("La multiplicación es: " + (num1 * num2));
console.log("La división es: " + (num1 / num2)));

let base = Number(prompt("Ingrese la base del triángulo: "));
let altura = Number(prompt("Ingrese la altura del triángulo: "));
console.log("El área del triángulo es: " + (0.5 * base * altura));
let lado1 = Number(prompt("Ingrese el primer lado del triángulo: "));
let lado2 = Number(prompt("Ingrese el segundo lado del triángulo: "));
let lado3 = Number(prompt("Ingrese el tercer lado del triángulo: "));
let perimetro = lado1 + lado2 + lado3;
console.log("El perímetro del triángulo es: " + perimetro);


let nombre = prompt("Ingrese su nombre: ");
let peso = Number(prompt("Ingrese su peso en kg: "));
let altura = Number(prompt("Ingrese su altura en metros: "));
let imc = peso / (altura * altura);
console.log("Nombre: " + nombre);
console.log("Peso: " + peso + " kg");
console.log("Altura: " + altura + " m");
console.log("Índice de masa corporal: " + imc.toFixed(2));
if (imc < 18.5) {
    console.log("Categoría: Bajo peso");
} else if (imc >= 18.5 && imc < 25) {
    console.log("Categoría: Peso normal");
} else if (imc >= 25 && imc < 30) {
    console.log("Categoría: Sobrepeso");
} else {
    console.log("Categoría: Obesidad");
}
*/

//Ejercicio 2

/*
console.log("Clasificacion de edad");

let edad = Number(prompt("Ingrese la edad: "));

if(isNaN(edad) || edad < 0){
    console.log("Edad no invalida");
} else if(edad < 12){
    console.log("Niño");
} else if(edad >= 12 && edad <= 17){
    console.log("Adolescente");
} else if(edad >= 18 && edad <= 64){
    console.log("Adulto");
} else if(edad >= 65){
    console.log("Adulto mayor");
}
console.log("Edad: " + edad);

*/

//Ejercicio 3
/* 
console.log("Tabla de multiplicar");

let numero = Number(prompt("Ingrese un numero: "));
let factor = 1;

while(factor <= 12){
    console.log(factor + " * " + numero + " = " + (factor * numero));
    factor++;
}

*/

//Ejercicio 4 Fibonacci

//Ejercicio 4 Fibonacci

alert("Secuencia de Fibonacci");

let n = Number(prompt("Ingrese la cantidad de términos: "));

let num1 = 0;
let num2 = 1;
let contador = 1;

while(contador <= n){

    console.log(num1);

    let siguiente = fibonacci(num1, num2);

    num1 = num2;
    num2 = siguiente;

    contador++;
}

function fibonacci(a, b){
    return a + b;
}

//Funciones anonimas
const multiplicar = function(a, b){
    return a * b;
}

console.log(multiplicar(5, 3));

//Funcion flecha
const restar = (a, b) =>{
    return a - b;
}

console.log(restar(10, 4));

//Funcion cuadrado mediante flecha
const cuadrado = numero => {
    return numero * numero;
}

console.log(cuadrado(5));

//Documentar
/**
 * Calcular el promedio de tres números
 * @param {number} n1 - El primer número
 * @param {number} n2 - El segundo número
 * @param {number} n3 - El tercer número
 * @returns {number} El promedio de los tres números
 */

function calcularPromedio(n1, n2, n3){
    return (n1,n2,n3)/3;
}