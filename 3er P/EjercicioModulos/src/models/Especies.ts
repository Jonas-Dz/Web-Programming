export class Especies{
    constructor(
        public nombre: string,
        public nombreCientifico: string,
    ){}

    mostrarEspecie(): void {
        console.log("Nombre:", this.nombre);
        console.log("Nombre Cientifico:", this.nombreCientifico);
    }
}
