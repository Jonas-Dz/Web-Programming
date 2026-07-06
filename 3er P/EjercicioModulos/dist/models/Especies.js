"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Especies = void 0;
class Especies {
    constructor(nombre, nombreCientifico) {
        this.nombre = nombre;
        this.nombreCientifico = nombreCientifico;
    }
    mostrarEspecie() {
        console.log("Nombre:", this.nombre);
        console.log("Nombre Cientifico:", this.nombreCientifico);
    }
}
exports.Especies = Especies;
