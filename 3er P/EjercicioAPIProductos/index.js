import * as readline from "readline";
// Dirección base de la API
const API_URL = "http://10.40.34.138:3001/api/products";
// Configuración para ingresar datos por consola
const consola = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Convierte consola.question en una promesa
function preguntar(mensaje) {
    return new Promise((resolve) => {
        consola.question(mensaje, (respuesta) => {
            resolve(respuesta.trim());
        });
    });
}
// Muestra los datos de un producto
function mostrarProducto(producto) {
    console.log("-----------------------------");
    console.log("ID:", producto.id);
    console.log("Nombre:", producto.name);
    console.log("Descripción:", producto.description);
    console.log("Precio:", producto.price);
    console.log("Stock:", producto.stock);
}
// Manejo general de errores
function manejarError(error) {
    if (error instanceof TypeError) {
        console.error("\nError de conexión. No fue posible conectarse con la API.");
        console.error("Verifique que el servidor esté encendido.");
        return;
    }
    if (error instanceof Error) {
        console.error("\nError:", error.message);
    }
    else {
        console.error("\nOcurrió un error desconocido.");
    }
}
// ======================================================
// GET: obtener todos los productos
// ======================================================
async function obtenerProductos() {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
        throw new Error(`No se pudieron consultar los productos. Código: ${respuesta.status}`);
    }
    const productos = await respuesta.json();
    return productos;
}
// GET: mostrar todos los productos
async function listarProductos() {
    try {
        console.log("\nConsultando productos...");
        const productos = await obtenerProductos();
        console.log("\n=========== PRODUCTOS ===========");
        if (productos.length === 0) {
            console.log("No existen productos registrados.");
            return;
        }
        productos.forEach((producto) => {
            mostrarProducto(producto);
        });
        console.log("-----------------------------");
        console.log(`Total de productos: ${productos.length}`);
    }
    catch (error) {
        manejarError(error);
    }
}
// ======================================================
// GET: buscar producto por ID
// ======================================================
async function buscarProductoPorId(id) {
    try {
        console.log(`\nBuscando producto con ID ${id}...`);
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (respuesta.status === 404) {
            throw new Error(`No existe un producto con el ID ${id}.`);
        }
        if (!respuesta.ok) {
            throw new Error(`No se pudo consultar el producto. Código: ${respuesta.status}`);
        }
        const producto = await respuesta.json();
        console.log("\n======= PRODUCTO ENCONTRADO =======");
        mostrarProducto(producto);
    }
    catch (error) {
        manejarError(error);
    }
}
// ======================================================
// POST: crear un producto
// ======================================================
async function crearProducto(producto) {
    try {
        console.log("\nCreando producto...");
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });
        if (!respuesta.ok) {
            throw new Error(`No se pudo crear el producto. Código: ${respuesta.status}`);
        }
        const productoCreado = await respuesta.json();
        console.log("\n======= PRODUCTO CREADO =======");
        mostrarProducto(productoCreado);
    }
    catch (error) {
        manejarError(error);
    }
}
// Solicita por consola los datos para crear un producto
async function solicitarDatosNuevoProducto() {
    const name = await preguntar("Nombre del producto: ");
    const description = await preguntar("Descripción del producto: ");
    const priceTexto = await preguntar("Precio del producto: ");
    const stockTexto = await preguntar("Stock del producto: ");
    const price = Number(priceTexto);
    const stock = Number(stockTexto);
    if (name === "") {
        console.error("\nEl nombre es obligatorio.");
        return;
    }
    if (description === "") {
        console.error("\nLa descripción es obligatoria.");
        return;
    }
    if (priceTexto === "" || Number.isNaN(price) || price < 0) {
        console.error("\nEl precio debe ser un número válido.");
        return;
    }
    if (stockTexto === "" ||
        Number.isNaN(stock) ||
        stock < 0 ||
        !Number.isInteger(stock)) {
        console.error("\nEl stock debe ser un número entero válido.");
        return;
    }
    const nuevoProducto = {
        name,
        description,
        price,
        stock
    };
    await crearProducto(nuevoProducto);
}
// ======================================================
// PUT: actualizar completamente un producto
// ======================================================
async function actualizarProducto(id, producto) {
    try {
        console.log(`\nActualizando producto con ID ${id}...`);
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });
        if (respuesta.status === 404) {
            throw new Error(`No existe un producto con el ID ${id}.`);
        }
        if (!respuesta.ok) {
            throw new Error(`No se pudo actualizar el producto. Código: ${respuesta.status}`);
        }
        const productoActualizado = await respuesta.json();
        console.log("\n======= PRODUCTO ACTUALIZADO =======");
        mostrarProducto(productoActualizado);
    }
    catch (error) {
        manejarError(error);
    }
}
// Solicita por consola los datos para actualizar un producto
async function solicitarDatosActualizarProducto() {
    const idTexto = await preguntar("Ingrese el ID del producto que desea actualizar: ");
    const id = Number(idTexto);
    if (idTexto === "" ||
        Number.isNaN(id) ||
        id <= 0 ||
        !Number.isInteger(id)) {
        console.error("\nDebe ingresar un ID válido.");
        return;
    }
    const name = await preguntar("Nuevo nombre: ");
    const description = await preguntar("Nueva descripción: ");
    const priceTexto = await preguntar("Nuevo precio: ");
    const stockTexto = await preguntar("Nuevo stock: ");
    const price = Number(priceTexto);
    const stock = Number(stockTexto);
    if (name === "") {
        console.error("\nEl nombre es obligatorio.");
        return;
    }
    if (description === "") {
        console.error("\nLa descripción es obligatoria.");
        return;
    }
    if (priceTexto === "" || Number.isNaN(price) || price < 0) {
        console.error("\nEl precio debe ser un número válido.");
        return;
    }
    if (stockTexto === "" ||
        Number.isNaN(stock) ||
        stock < 0 ||
        !Number.isInteger(stock)) {
        console.error("\nEl stock debe ser un número entero válido.");
        return;
    }
    const productoActualizado = {
        name,
        description,
        price,
        stock
    };
    await actualizarProducto(id, productoActualizado);
}
// ======================================================
// DELETE: eliminar un producto
// ======================================================
async function eliminarProducto(id) {
    try {
        console.log(`\nEliminando producto con ID ${id}...`);
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        if (respuesta.status === 404) {
            throw new Error(`No existe un producto con el ID ${id}.`);
        }
        if (!respuesta.ok) {
            throw new Error(`No se pudo eliminar el producto. Código: ${respuesta.status}`);
        }
        console.log(`\nEl producto con ID ${id} fue eliminado correctamente.`);
    }
    catch (error) {
        manejarError(error);
    }
}
// Solicita el ID y confirma antes de eliminar
async function solicitarEliminarProducto() {
    const idTexto = await preguntar("Ingrese el ID del producto que desea eliminar: ");
    const id = Number(idTexto);
    if (idTexto === "" ||
        Number.isNaN(id) ||
        id <= 0 ||
        !Number.isInteger(id)) {
        console.error("\nDebe ingresar un ID válido.");
        return;
    }
    const confirmacion = await preguntar(`¿Está seguro de eliminar el producto ${id}? Escriba S para confirmar: `);
    if (confirmacion.toUpperCase() !== "S") {
        console.log("\nEliminación cancelada.");
        return;
    }
    await eliminarProducto(id);
}
// ======================================================
// Menú principal
// ======================================================
function mostrarOpciones() {
    console.log("\n====================================");
    console.log("       SISTEMA DE PRODUCTOS");
    console.log("====================================");
    console.log("1. Listar todos los productos GET");
    console.log("2. Buscar producto por ID GET");
    console.log("3. Crear producto POST");
    console.log("4. Actualizar producto PUT");
    console.log("5. Eliminar producto DELETE");
    console.log("6. Salir");
    console.log("====================================");
}
async function mostrarMenu() {
    let opcion = "";
    while (opcion !== "6") {
        mostrarOpciones();
        opcion = await preguntar("Seleccione una opción: ");
        switch (opcion) {
            case "1":
                await listarProductos();
                break;
            case "2": {
                const idTexto = await preguntar("Ingrese el ID del producto: ");
                const id = Number(idTexto);
                if (idTexto === "" ||
                    Number.isNaN(id) ||
                    id <= 0 ||
                    !Number.isInteger(id)) {
                    console.error("\nDebe ingresar un ID válido.");
                    break;
                }
                await buscarProductoPorId(id);
                break;
            }
            case "3":
                await solicitarDatosNuevoProducto();
                break;
            case "4":
                await solicitarDatosActualizarProducto();
                break;
            case "5":
                await solicitarEliminarProducto();
                break;
            case "6":
                console.log("\nPrograma finalizado.");
                break;
            default:
                console.error("\nOpción incorrecta. Seleccione una opción del 1 al 6.");
        }
    }
}
// Función principal
async function main() {
    try {
        await mostrarMenu();
    }
    finally {
        consola.close();
    }
}
// Ejecutar el programa
main();
