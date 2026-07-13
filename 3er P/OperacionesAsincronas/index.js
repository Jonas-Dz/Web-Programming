"use strict";
//Simular una operacion con demora usando promesas
function obtenerDatos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Datos obtenidos correctamente");
        }, 2000); //2000 milisegundos = 2 segundos
    });
}
console.log("Inicio");
obtenerDatos().then((respuesta) => {
    console.log(respuesta);
});
console.log("Fin");
