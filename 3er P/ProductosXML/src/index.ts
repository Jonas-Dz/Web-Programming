import { readFileSync } from "fs";
import { parseString } from "xml2js";

// Interface
interface Producto {
    codigo: string;
    nombre: string;
    precio: number;
    stock: number;
}

// Leer archivo XML
const xml = readFileSync("./src/productos.xml", "utf-8");

// Convertir XML a objeto
parseString(xml, (error, resultado) => {

    if (error) {
        console.log("Error al leer el XML");
        return;
    }

    const productos: Producto[] = resultado.productos.producto.map((p: any) => ({
        codigo: p.codigo[0],
        nombre: p.nombre[0],
        precio: Number(p.precio[0]),
        stock: Number(p.stock[0])
    }));

    console.log("=== LISTA DE PRODUCTOS ===");

    productos.forEach(producto => {
        console.log("-------------------------");
        console.log(`Código : ${producto.codigo}`);
        console.log(`Nombre : ${producto.nombre}`);
        console.log(`Precio : $${producto.precio}`);
        console.log(`Stock  : ${producto.stock}`);
    });

});