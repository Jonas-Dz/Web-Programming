//Simular una operacion con demora usando promesas

/*
function obtenerDatos(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Datos obtenidos correctamente");
        }, 2000);   //2000 milisegundos = 2 segundos
    });
}

console.log("Inicio");
obtenerDatos().then((
    respuesta:string) =>{
        console.log(respuesta);
    }
);

console.log("Fin");

*/

interface Usuario {
    id: number;
    nombre: string;
    usuario: string;
    email: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    const usuarios: Usuario[] = await respuesta.json();
    return usuarios;
}

async function listarUsuarios(): Promise<void> {
    const usuarios: Usuario[] = await obtenerUsuarios();
    usuarios.forEach((usuarios:Usuario):void => {
        console.log("-------------------------");
        console.log("ID: ", usuarios.id);
        console.log("Nombre: ", usuarios.nombre);
        console.log("Usuario: ", usuarios.usuario);
        console.log("Correo: ", usuarios.email);
    }
    );
}

listarUsuarios();