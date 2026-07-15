import * as readline from "readline";

// Interfaz que representa un producto
interface Products {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}

// Datos necesarios para crear un producto.
// No se incluye el ID porque normalmente lo genera la API.
interface NuevoProducto {
    name: string;
    description: string;
    price: number;
    stock: number;
}

// Dirección base de la API
const API_URL: string = "http://10.40.26.191:3001/api/products";

// Configuración para ingresar datos por consola
const consola = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Convierte consola.question en una promesa
function preguntar(mensaje: string): Promise<string> {
    return new Promise((resolve) => {
        consola.question(mensaje, (respuesta: string) => {
            resolve(respuesta.trim());
        });
    });
}

// Muestra los datos de un producto
function mostrarProducto(producto: Products): void {
    console.log("-----------------------------");
    console.log("ID:", producto.id);
    console.log("Nombre:", producto.name);
    console.log("Descripción:", producto.description);
    console.log("Precio:", producto.price);
    console.log("Stock:", producto.stock);
}

// Manejo general de errores
function manejarError(error: unknown): void {
    if (error instanceof TypeError) {
        console.error(
            "\nError de conexión. No fue posible conectarse con la API."
        );
        console.error("Verifique que el servidor esté encendido.");
        return;
    }

    if (error instanceof Error) {
        console.error("\nError:", error.message);
    } else {
        console.error("\nOcurrió un error desconocido.");
    }
}

// ======================================================
// GET: obtener todos los productos
// ======================================================

async function obtenerProductos(): Promise<Products[]> {
    const respuesta: Response = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error(
            `No se pudieron consultar los productos. Código: ${respuesta.status}`
        );
    }

    const productos: Products[] = await respuesta.json();

    return productos;
}

// GET: mostrar todos los productos
async function listarProductos(): Promise<void> {
    try {
        console.log("\nConsultando productos...");

        const productos: Products[] = await obtenerProductos();

        console.log("\n=========== PRODUCTOS ===========");

        if (productos.length === 0) {
            console.log("No existen productos registrados.");
            return;
        }

        productos.forEach((producto: Products): void => {
            mostrarProducto(producto);
        });

        console.log("-----------------------------");
        console.log(`Total de productos: ${productos.length}`);
    } catch (error: unknown) {
        manejarError(error);
    }
}

// ======================================================
// GET: buscar producto por ID
// ======================================================

async function buscarProductoPorId(id: number): Promise<void> {
    try {
        console.log(`\nBuscando producto con ID ${id}...`);

        const respuesta: Response = await fetch(`${API_URL}/${id}`);

        if (respuesta.status === 404) {
            throw new Error(`No existe un producto con el ID ${id}.`);
        }

        if (!respuesta.ok) {
            throw new Error(
                `No se pudo consultar el producto. Código: ${respuesta.status}`
            );
        }

        const producto: Products = await respuesta.json();

        console.log("\n======= PRODUCTO ENCONTRADO =======");
        mostrarProducto(producto);
    } catch (error: unknown) {
        manejarError(error);
    }
}

// ======================================================
// POST: crear un producto
// ======================================================

async function crearProducto(producto: NuevoProducto): Promise<void> {
    try {
        console.log("\nCreando producto...");

        const respuesta: Response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        if (!respuesta.ok) {
            throw new Error(
                `No se pudo crear el producto. Código: ${respuesta.status}`
            );
        }

        const productoCreado: Products = await respuesta.json();

        console.log("\n======= PRODUCTO CREADO =======");
        mostrarProducto(productoCreado);
    } catch (error: unknown) {
        manejarError(error);
    }
}

// Solicita por consola los datos para crear un producto
async function solicitarDatosNuevoProducto(): Promise<void> {
    const name: string = await preguntar("Nombre del producto: ");
    const description: string = await preguntar(
        "Descripción del producto: "
    );

    const priceTexto: string = await preguntar("Precio del producto: ");
    const stockTexto: string = await preguntar("Stock del producto: ");

    const price: number = Number(priceTexto);
    const stock: number = Number(stockTexto);

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

    if (
        stockTexto === "" ||
        Number.isNaN(stock) ||
        stock < 0 ||
        !Number.isInteger(stock)
    ) {
        console.error("\nEl stock debe ser un número entero válido.");
        return;
    }

    const nuevoProducto: NuevoProducto = {
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

async function actualizarProducto(
    id: number,
    producto: NuevoProducto
): Promise<void> {
    try {
        console.log(`\nActualizando producto con ID ${id}...`);

        const respuesta: Response = await fetch(`${API_URL}/${id}`, {
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
            throw new Error(
                `No se pudo actualizar el producto. Código: ${respuesta.status}`
            );
        }

        const productoActualizado: Products = await respuesta.json();

        console.log("\n======= PRODUCTO ACTUALIZADO =======");
        mostrarProducto(productoActualizado);
    } catch (error: unknown) {
        manejarError(error);
    }
}

// Solicita por consola los datos para actualizar un producto
async function solicitarDatosActualizarProducto(): Promise<void> {
    const idTexto: string = await preguntar(
        "Ingrese el ID del producto que desea actualizar: "
    );

    const id: number = Number(idTexto);

    if (
        idTexto === "" ||
        Number.isNaN(id) ||
        id <= 0 ||
        !Number.isInteger(id)
    ) {
        console.error("\nDebe ingresar un ID válido.");
        return;
    }

    const name: string = await preguntar("Nuevo nombre: ");
    const description: string = await preguntar("Nueva descripción: ");
    const priceTexto: string = await preguntar("Nuevo precio: ");
    const stockTexto: string = await preguntar("Nuevo stock: ");

    const price: number = Number(priceTexto);
    const stock: number = Number(stockTexto);

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

    if (
        stockTexto === "" ||
        Number.isNaN(stock) ||
        stock < 0 ||
        !Number.isInteger(stock)
    ) {
        console.error("\nEl stock debe ser un número entero válido.");
        return;
    }

    const productoActualizado: NuevoProducto = {
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

async function eliminarProducto(id: number): Promise<void> {
    try {
        console.log(`\nEliminando producto con ID ${id}...`);

        const respuesta: Response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (respuesta.status === 404) {
            throw new Error(`No existe un producto con el ID ${id}.`);
        }

        if (!respuesta.ok) {
            throw new Error(
                `No se pudo eliminar el producto. Código: ${respuesta.status}`
            );
        }

        console.log(
            `\nEl producto con ID ${id} fue eliminado correctamente.`
        );
    } catch (error: unknown) {
        manejarError(error);
    }
}

// Solicita el ID y confirma antes de eliminar
async function solicitarEliminarProducto(): Promise<void> {
    const idTexto: string = await preguntar(
        "Ingrese el ID del producto que desea eliminar: "
    );

    const id: number = Number(idTexto);

    if (
        idTexto === "" ||
        Number.isNaN(id) ||
        id <= 0 ||
        !Number.isInteger(id)
    ) {
        console.error("\nDebe ingresar un ID válido.");
        return;
    }

    const confirmacion: string = await preguntar(
        `¿Está seguro de eliminar el producto ${id}? Escriba S para confirmar: `
    );

    if (confirmacion.toUpperCase() !== "S") {
        console.log("\nEliminación cancelada.");
        return;
    }

    await eliminarProducto(id);
}

// ======================================================
// Menú principal
// ======================================================

function mostrarOpciones(): void {
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

async function mostrarMenu(): Promise<void> {
    let opcion: string = "";

    while (opcion !== "6") {
        mostrarOpciones();

        opcion = await preguntar("Seleccione una opción: ");

        switch (opcion) {
            case "1":
                await listarProductos();
                break;

            case "2": {
                const idTexto: string = await preguntar(
                    "Ingrese el ID del producto: "
                );

                const id: number = Number(idTexto);

                if (
                    idTexto === "" ||
                    Number.isNaN(id) ||
                    id <= 0 ||
                    !Number.isInteger(id)
                ) {
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
                console.error(
                    "\nOpción incorrecta. Seleccione una opción del 1 al 6."
                );
        }
    }
}

// Función principal
async function main(): Promise<void> {
    try {
        await mostrarMenu();
    } finally {
        consola.close();
    }
}

// Ejecutar el programa
main();