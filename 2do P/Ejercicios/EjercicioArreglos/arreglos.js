let estudiantes = [];

estudiantes.push("Juan");
estudiantes.push("Maria");
estudiantes.push("Luis");

//Para agregar elementos
for(let i = 0; i < estudiantes.length; i++){
    console.log(estudiantes[i]);
}

//Ordenar
estudiantes.sort();
console.log("Despues de ordenar");
console.log(estudiantes);

//otra manera de mostrar
console.log("Usando for each")
estudiantes.forEach(estudiantes => {
    console.log(estudiantes);
});

//Revertir el orden
estudiantes.reverse();
console.log("Despues de revertir el orden");
console.log(estudiantes);

//Existe elemento
let existe = estudiantes.includes("Luis");
console.log("Existe Luis? " + existe);
let posicion = estudiantes.indexOf("Luis");
console.log("Posicion de Luis: " + posicion);

//Para eliminar elementos
for(let i = 0; i < estudiantes.length; i++){
    //Elimina el primero
    estudiantes.pop(estudiantes[i]);
}

//otra manera de eliminar
/*
console.log("Usando for each")
estudiantes.forEach(estudiantes => {
    //Elimina el ultimo
    estudiantes.pop(estudiantes);

    //Elimina el primero
    estudiantes.shift(estudiantes);
});
*/

