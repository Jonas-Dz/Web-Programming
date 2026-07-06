"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Producto {
    constructor(codigo, nombre, precio, stock) {
        this.codigo = codigo;
        this.nombre = nombre;
        this._precio = precio;
        this._stock = stock;
    }
    get precio() {
        return this._precio;
    }
    set precio(nuevoPrecio) {
        this._precio = nuevoPrecio;
    }
    get stock() {
        return this._stock;
    }
    set stock(nuevoStock) {
        this._stock = nuevoStock;
    }
    mostrarProducto() {
        console.log(`Codigo: ${this.codigo}`);
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Precio: ${this._precio}`);
        console.log(`Stock: ${this._stock}`);
    }
    obtenerPrecio(precio) {
        console.log(`Precio: ${this._precio}`);
    }
    obtenerStock(stock) {
        console.log(`Stock: ${this._stock}`);
    }
    reducirStock(cantidad) {
        if (cantidad <= this._stock) {
            this._stock -= cantidad;
            console.log(`Stock reducido en ${cantidad}. Nuevo stock: ${this._stock}`);
        }
    }
}
class Carrito {
}
