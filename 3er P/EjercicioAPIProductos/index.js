"use strict";
// Obtener todos los productos
async function obtenerProductos() {
    const respuesta = await fetch("http://10.40.26.191:3001/api/products");
    const productos = await respuesta.json();
    return productos;
}
// Mostrar todos los productos
async function listarProductos() {
    const productos = await obtenerProductos();
    console.log("----------- PRODUCTOS -----------");
    productos.forEach((producto) => {
        console.log("-----------------------------");
        console.log("ID:", producto.id);
        console.log("Nombre:", producto.name);
        console.log("Descripción:", producto.description);
        console.log("Precio:", producto.price);
        console.log("Stock:", producto.stock);
    });
}
// Buscar producto por ID
async function buscarProductoPorId(id) {
    try {
        const respuesta = await fetch(`http://10.40.26.191:3001/api/products/${id}`);
        if (!respuesta.ok) {
            throw new Error("Producto no encontrado.");
        }
        const producto = await respuesta.json();
        console.log("----------- PRODUCTO -----------");
        console.log("ID:", producto.id);
        console.log("Nombre:", producto.name);
        console.log("Descripción:", producto.description);
        console.log("Precio:", producto.price);
        console.log("Stock:", producto.stock);
    }
    catch (error) {
        console.error("Error:", error);
    }
}
// Ejecutar
listarProductos();
// Buscar un producto específico
buscarProductoPorId(1);
