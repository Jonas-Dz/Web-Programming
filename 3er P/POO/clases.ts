class Persona{
    nombre:string;
    constructor(nombre:string){
        this.nombre=nombre;
    }
}

class Docente extends Persona{
    mostrarNombre():void{
        console.log(`Docente: ${this.nombre}`)
    }
}

const docente = new Docente('Juan');
docente.mostrarNombre();

console.log(docente.nombre);