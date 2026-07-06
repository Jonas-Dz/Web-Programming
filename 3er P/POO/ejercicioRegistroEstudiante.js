"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Estudiante2 {
    constructor(nombre, edad, notaFinal) {
        this.nombre = nombre;
        this.edad = edad;
        this._notaFinal = notaFinal;
    }
    get notaFinal() {
        return this._notaFinal;
    }
    set notaFinal(nuevaNota) {
        this._notaFinal = nuevaNota;
    }
    mostrarDatos2() {
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Edad: ${this.edad}`);
        console.log(`Nota Final: ${this._notaFinal}`);
    }
    verificarEstado2() {
        if (this.notaFinal >= 14) {
            return 'Aprobado';
        }
        return 'Reprobado';
    }
}
const estudiante2 = new Estudiante2('Jonathan', 24, 15);
estudiante2.mostrarDatos2();
console.log(`Estado: ${estudiante2.verificarEstado2()}`);
