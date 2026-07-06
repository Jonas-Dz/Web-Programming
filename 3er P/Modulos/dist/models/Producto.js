"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    constructor(codigo, nombre, _precio, _stock) {
        this.codigo = codigo;
        this.nombre = nombre;
        this._precio = _precio;
        this._stock = _stock;
    }
    mostrarProducto() {
        console.log(`Codigo: ${this.codigo}`);
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Precio: ${this._precio}`);
        console.log(`Stock: ${this._stock}`);
    }
    obtenerPrecio() {
        return this._precio;
    }
    obtenerStock() {
        return this._stock;
    }
}
exports.Producto = Producto;
