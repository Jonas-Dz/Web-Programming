"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function mostrarProducto(producto) {
    console.log("Nombre: ", producto.nombre);
    console.log("Categoria: ", producto.categoria);
    console.log("Stock: ", producto.stock);
    console.log("Disponible: ", producto.disponible);
}
function estadoStock(stock) {
    if (stock === undefined) {
        return "Stock no registrado";
    }
    return stock > 0
        ? "Disponible"
        : "Agotado";
}
;
