interface Docente{
    nombre:string,
    asignatura:string,
    horas:number,
    activo:boolean
};

let docente1:Docente = {
    nombre: "Juan",
    asignatura: "Matemáticas",
    horas: 20,
    activo: true
};

let docente2:Docente = {
    nombre: "Andy",
    asignatura: "BDD",
    horas: 10,
    activo: true
};

console.log(docente1.nombre);
console.log(docente2.nombre);