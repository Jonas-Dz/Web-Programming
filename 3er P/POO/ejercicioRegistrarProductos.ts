class Producto{
    codigo:string;
    nombre:string;
    private _precio:number;
    private _stock:number;

    constructor(codigo:string, nombre:string, precio:number, stock:number){
        this.codigo=codigo;
        this.nombre=nombre;
        this._precio=precio;
        this._stock=stock;
    }

    get precio():number{
        return this._precio;
    }

    set precio(nuevoPrecio:number){
        this._precio = nuevoPrecio;
    }

    get stock():number{
        return this._stock;
    }

    set stock(nuevoStock:number){
        this._stock = nuevoStock;
    }

    mostrarProducto():void{
        console.log(`Codigo: ${this.codigo}`);
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Precio: ${this._precio}`);
        console.log(`Stock: ${this._stock}`);
    }

    obtenerPrecio(precio:number):number{
        console.log(`Precio: ${this._precio}`);
    }

    obtenerStock(stock:number):number{
        console.log(`Stock: ${this._stock}`);
    }

    reducirStock(cantidad:number):void{
        if(cantidad <= this._stock){
            this._stock -= cantidad;
            console.log(`Stock reducido en ${cantidad}. Nuevo stock: ${this._stock}`);
        }
    }
    
}

class Carrito{
    //completar con la clase carrito
}