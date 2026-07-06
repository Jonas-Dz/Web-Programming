"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    saludar() {
        console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años`);
    }
}
class Estudiante extends Persona {
    constructor(nombre, edad, carrera) {
        super(nombre, edad);
        this.carrera = carrera;
    }
    mostrarCarrera() {
        console.log(`Estudio ${this.carrera}`);
    }
}
const estudiante = new Estudiante('Jonathan', 24, 'Software');
estudiante.saludar();
estudiante.mostrarCarrera();
