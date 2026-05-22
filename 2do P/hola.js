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

console.log("Tabla de multiplicar");

let numero = Number(prompt("Ingrese un numero: "));
let factor = 1;

while(factor <= 12){
    console.log(factor + " * " + numero + " = " + (factor * numero));
    factor++;
}

