"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Persona {
    constructor(nombre) {
        this.nombre = nombre;
    }
}
class Docente extends Persona {
    mostrarNombre() {
        console.log(`Docente: ${this.nombre}`);
    }
}
const docente = new Docente('Juan');
docente.mostrarNombre();
console.log(docente.nombre);
