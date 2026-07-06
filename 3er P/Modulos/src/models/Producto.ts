export class Producto {
    constructor(
        public codigo: string,
        public nombre: string,
        private _precio: number,
        private _stock: number
    ){}

    mostrarProducto(): void {
        console.log(`Codigo: ${this.codigo}`);
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Precio: ${this._precio}`);
        console.log(`Stock: ${this._stock}`);
    }

    obtenerPrecio(): number {
        return this._precio;
    }

    obtenerStock(): number {
        return this._stock;
    }
}
