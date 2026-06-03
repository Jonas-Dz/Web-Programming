let estudiante = {
    nombre: "Juan",
    edad: 20
};

let estudiantes = [
    {nombre: "Juan", edad: 20},
    {nombre: "Jorge", edad: 21},
    {nombre: "Ana", edad: 22}
];

//Imprimir nombre
console.log(estudiante.nombre);

//Imprimir edad
console.log(estudiante.edad);

//Promedio usando for
sumaEdad = 0;
for(let i = 0; i < estudiantes.length; i++) {
    sumaEdad += estudiantes[i].edad;
}
console.log("Promedio edad: " + (sumaEdad / estudiantes.length));
/*
//Usando foreach
estudiantes.forEach(estudiantes => {
    console.log("Promedio edad:");
});
*/
