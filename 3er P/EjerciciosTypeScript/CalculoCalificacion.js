"use strict";
/*
console.log("======= USANDO FUNCIONES NORMALES ========");

function calcularNotaFinal(
    nota1: number,
    nota2: number,
    nota3: number
):number{
    return((nota1 + nota2 + nota3) / 3);
}

function verificarAprobacion(promedio: number):string{
    if(promedio>=14){
        return "Aprobado";
    }
    return "Reprobado"
}

let promedio: number = calcularNotaFinal(15, 12, 15);
let estado: string = verificarAprobacion(promedio);

console.log("Promedio: ", promedio);
console.log("Estado: ", estado);

*/
console.log("======= USANDO FUNCIONES FLECHA ========");
const calcularNotaFinal = (nota1, nota2, nota3) => {
    return (nota1 + nota2 + nota3) / 3;
};
const verificarAprobacion = (promedio) => {
    if (promedio >= 14) {
        return "Aprobado";
    }
    return "Reprobado";
};
let promedio = calcularNotaFinal(15, 12, 15);
let estado = verificarAprobacion(promedio);
console.log("Promedio:", promedio);
console.log("Estado:", estado);
