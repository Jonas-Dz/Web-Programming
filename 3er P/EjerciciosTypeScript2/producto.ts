interface Producto {
    nombre: string;
    categoria: string;
    stock?: number;
    disponible: boolean;
};

function mostrarProducto(producto: Producto): void {
    console.log("Nombre: ", producto.nombre);
    console.log("Categoria: ", producto.categoria);
    console.log("Stock: ", producto.stock);
    console.log("Disponible: ", producto.disponible);
}

function estadoStock(stock?: number): string {
    if (stock === undefined) {
        return "Stock no registrado";
    }
    return stock > 0 
    ? "Disponible" 
    : "Agotado";
};