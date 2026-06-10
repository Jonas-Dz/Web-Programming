try{
    let usuario = "Jonathan";
    console.log(usuario);

} catch(error){
    console.log(error.name);
    console.log(error.message);
} finally{
    console.log("Fin del proceso");
}

/*
//Ejercicio validar edad
let edad = Number(prompt("Ingrese su edad: "));

function validarEdad(edad){
    if(edad < 18){
        throw "Edad no valida"; 
    } else {
        console.log("Edad valida");
    }
}

try {
    validarEdad(edad);
} catch(error) {
    console.log(error);
}
*/

/*
Ejercicio 1
Crear una funcion que valide una nota.

Reglas:
- 0 a 10 valido
- Menor a 0 error
- Mayor a 10 error

Salida:
Notas entre 0 y 10: Nota valida
Notas menores a 0 y mayores a 10: Nota invalida


let nota = Number(prompt("Ingrese una nota: "));

function validarNota(nota){
    if(nota < 0 || nota > 10){
        throw"Nota invalida";
    } else {
        console.log("Nota valida");
    }
}

try {
    validarNota(nota);
} catch (error) {
    console.log(error);
}

*/

/*
Ejercicio 2
Validar una contraseña

Reglas:
- minimo 8 caracteres
- al menos 1 numero

Mostrar error usando:
throw new Error();
*/

let contrasena = prompt("Ingrese su contraseña: ");

function validarContrasena(contrasena){
    if(contrasena.length < 8){
        throw new Error("La contraseña debe tener 8 caracteres minimo");
    } else if((/\d/.test(contrasena)) === false){
        throw new Error("La contraseña debe contener al menos 1 numero");
    } else {
        console.log("Contraseña valida");
    }
}

try {
    validarContrasena(contrasena);
} catch (error) {
    console.log(error.message);
}