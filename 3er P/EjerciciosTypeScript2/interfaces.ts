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

/*
//PROPIEDADES OPCIONALES

interface Docente{
    nombre:string,
    asignatura:string,
    horas?:number,  //si no se define, se asume que es undefined
    activo:boolean
};

const docente1:Docente = {
    nombre: "Juan",
    asignatura: "Matemáticas",
    activo: true
};

const docente2:Docente = {
    nombre: "Andy",
    asignatura: "BDD",
    horas: 10,
    activo: true
};
*/

//Si las joras son mayores o iguales a 8 {es tiempo completo} sino {es tiempo parcial}

console.log(docente1.nombre);
console.log(docente1.horas);

console.log(docente2.nombre);
console.log(docente2.horas);

console.log(docente1.horas >= 8 ? "Tiempo completo" : "Tiempo parcial");