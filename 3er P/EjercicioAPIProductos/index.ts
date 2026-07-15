interface Products {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}

// Obtener todos los productos
async function obtenerProductos(): Promise<Products[]> {
    const respuesta = await fetch("http://10.40.26.191:3001/api/products");
    const productos: Products[]=await respuesta.json();
    return productos;
}

// Mostrar todos los productos
async function listarProductos(): Promise<void> {
    const productos = await obtenerProductos();
    console.log("----------- PRODUCTOS -----------");
    productos.forEach((producto: Products) => {
        console.log("-----------------------------");
        console.log("ID:", producto.id);
        console.log("Nombre:", producto.name);
        console.log("Descripción:", producto.description);
        console.log("Precio:", producto.price);
        console.log("Stock:", producto.stock);
    });
}

// Buscar producto por ID
async function buscarProductoPorId(id: number): Promise<void> {
    try {
        const respuesta = await fetch(`http://10.40.26.191:3001/api/products/${id}`);
        if (!respuesta.ok) {
            throw new Error("Producto no encontrado.");
        }

        const producto: Products = await respuesta.json();

        console.log("----------- PRODUCTO -----------");
        console.log("ID:", producto.id);
        console.log("Nombre:", producto.name);
        console.log("Descripción:", producto.description);
        console.log("Precio:", producto.price);
        console.log("Stock:", producto.stock);

    } catch (error) {
        console.error("Error:", error);
    }
}

// Ejecutar
listarProductos();

// Buscar un producto específico
buscarProductoPorId(1);