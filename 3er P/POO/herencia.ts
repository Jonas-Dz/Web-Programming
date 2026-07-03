class Persona{
    nombre:string;
    edad:number;

    constructor(nombre:string, edad:number){
        this.nombre=nombre;
        this.edad=edad;
    }

    saludar():void{
        console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años`); 
    }
}

class Estudiante extends Persona{
    carrera:string;

    constructor(nombre:string, edad:number, carrera:string){
        super(nombre, edad);
        this.carrera=carrera;
    }

    mostrarCarrera():void{
        console.log(`Estudio ${this.carrera}`);
    }
}

const estudiante = new Estudiante('Jonathan', 24, 'Software');
estudiante.saludar();
estudiante.mostrarCarrera();