"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Curso {
    constructor(nombre) {
        this._nombre = nombre;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(nuevoNombre) {
        if (nuevoNombre.length > 0) {
            this._nombre = nuevoNombre;
        }
    }
}
const curso = new Curso('TypeScript Basico');
console.log(curso.nombre);
curso.nombre = 'TypeScript Intermedio';
console.log(curso.nombre);
