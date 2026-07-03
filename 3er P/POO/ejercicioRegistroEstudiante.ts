class Estudiante2{
    nombre:string;
    edad:number;
    private _notaFinal:number;

    constructor(nombre:string, edad:number, notaFinal:number){
        this.nombre=nombre;
        this.edad=edad;
        this._notaFinal=notaFinal;
    }

    get notaFinal():number{
        return this._notaFinal;
    }

    set notaFinal(nuevaNota:number){
        this._notaFinal = nuevaNota;
    }

    mostrarDatos2():void{
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Edad: ${this.edad}`);
        console.log(`Nota Final: ${this._notaFinal}`);
    }

    verificarEstado2():string{
        if(this.notaFinal >= 14){
            return 'Aprobado';
        }
        return 'Reprobado';
    }
}

const estudiante2 = new Estudiante2('Jonathan', 24, 15);
estudiante2.mostrarDatos2();
console.log(`Estado: ${estudiante2.verificarEstado2()}`);