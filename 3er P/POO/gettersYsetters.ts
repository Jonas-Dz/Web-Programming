class Curso{
    private _nombre:string;

    constructor(nombre:string){
        this._nombre=nombre;
    }

    get nombre():string{
        return this._nombre;
    }

    set nombre(nuevoNombre:string){
        if(nuevoNombre.length > 0){
            this._nombre=nuevoNombre;
        }
    }
}

const curso = new Curso('TypeScript Basico');
console.log(curso.nombre);
curso.nombre = 'TypeScript Intermedio';
console.log(curso.nombre);