/*

// Interfaz que representa la estructura de un usuario
//Este ejercicio se imprime mediante consola, el index.html implementa aparte el codigo
interface Usuario {
    id: number;
    name: string;
    username: string;
    email: string;
}

// Consulta todos los usuarios de la API
async function obtenerUsuarios(): Promise<Usuario[]> {
    const respuesta: Response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    // Verificamos si la respuesta HTTP fue correcta
    if (!respuesta.ok) {
        throw new Error(
            `Error al consultar los usuarios. Código: ${respuesta.status}`
        );
    }

    const usuarios: Usuario[] = await respuesta.json();

    return usuarios;
}

// Muestra todos los usuarios en la consola
async function listarUsuarios(): Promise<void> {
    try {
        console.log("Consultando usuarios...");

        const usuarios: Usuario[] = await obtenerUsuarios();

        console.log("\nLISTA DE USUARIOS");

        usuarios.forEach((usuario: Usuario): void => {
            console.log("-------------------------");
            console.log("ID:", usuario.id);
            console.log("Nombre:", usuario.name);
            console.log("Usuario:", usuario.username);
            console.log("Correo:", usuario.email);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Ocurrió un error:", error.message);
        } else {
            console.error("Ocurrió un error desconocido");
        }
    }
}

// Busca un usuario utilizando su ID
async function buscarUsuarioPorId(id: number): Promise<void> {
    try {
        console.log(`\nBuscando usuario con ID ${id}...`);

        const respuesta: Response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!respuesta.ok) {
            throw new Error(
                `No se pudo consultar el usuario. Código: ${respuesta.status}`
            );
        }

        const usuario: Usuario = await respuesta.json();

        // JSONPlaceholder devuelve un objeto vacío cuando el ID no existe
        if (!usuario.id) {
            throw new Error(`No existe un usuario con el ID ${id}`);
        }

        console.log("\nUSUARIO ENCONTRADO");
        console.log("-------------------------");
        console.log("ID:", usuario.id);
        console.log("Nombre:", usuario.name);
        console.log("Usuario:", usuario.username);
        console.log("Correo:", usuario.email);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Ocurrió un error:", error.message);
        } else {
            console.error("Ocurrió un error desconocido");
        }
    }
}

// Función principal para controlar el orden de ejecución
async function main(): Promise<void> {
    await listarUsuarios();

    // Cambia este número para buscar otro usuario
    await buscarUsuarioPorId(5);

    // Ejemplo de un usuario que no existe
    await buscarUsuarioPorId(50);
}

// Ejecutar el programa
main();

*/

interface Usuario {
    id: number;
    name: string;
    username: string;
    email: string;
}

const API_URL: string = "https://jsonplaceholder.typicode.com/users";

async function obtenerUsuarios(): Promise<Usuario[]> {
    const respuesta: Response = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error(`Error al consultar usuarios. Código: ${respuesta.status}`);
    }

    const usuarios: Usuario[] = await respuesta.json();
    return usuarios;
}

async function listarUsuarios(): Promise<void> {
    const contenedorLista = document.getElementById("listaUsuarios");

    if (!contenedorLista) {
        return;
    }

    try {
        const usuarios: Usuario[] = await obtenerUsuarios();

        contenedorLista.innerHTML = "";

        usuarios.forEach((usuario: Usuario): void => {
            contenedorLista.innerHTML += `
                <div class="usuario">
                    <strong>ID:</strong> ${usuario.id}<br>
                    <strong>Nombre:</strong> ${usuario.name}<br>
                    <strong>Usuario:</strong> ${usuario.username}<br>
                    <strong>Correo:</strong> ${usuario.email}
                </div>
            `;
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            contenedorLista.innerHTML = `
                <div class="error">
                    ${error.message}
                </div>
            `;
        } else {
            contenedorLista.innerHTML = `
                <div class="error">
                    Ocurrió un error desconocido al listar usuarios.
                </div>
            `;
        }
    }
}

async function buscarUsuarioPorId(): Promise<void> {
    const inputId = document.getElementById("inputId") as HTMLInputElement;
    const resultadoUsuario = document.getElementById("resultadoUsuario");

    if (!inputId || !resultadoUsuario) {
        return;
    }

    const id: string = inputId.value;

    if (id === "") {
        resultadoUsuario.innerHTML = `
            <div class="error">
                Debe ingresar un ID para buscar.
            </div>
        `;
        return;
    }

    try {
        const respuesta: Response = await fetch(`${API_URL}/${id}`);

        if (!respuesta.ok) {
            throw new Error(`Error al buscar el usuario. Código: ${respuesta.status}`);
        }

        const usuario: Usuario = await respuesta.json();

        if (!usuario.id) {
            resultadoUsuario.innerHTML = `
                <div class="error">
                    No existe un usuario con el ID ${id}.
                </div>
            `;
            return;
        }

        resultadoUsuario.innerHTML = `
            <div class="usuario-encontrado">
                <strong>ID:</strong> ${usuario.id}<br>
                <strong>Nombre:</strong> ${usuario.name}<br>
                <strong>Usuario:</strong> ${usuario.username}<br>
                <strong>Correo:</strong> ${usuario.email}
            </div>
        `;

    } catch (error: unknown) {
        if (error instanceof Error) {
            resultadoUsuario.innerHTML = `
                <div class="error">
                    ${error.message}
                </div>
            `;
        } else {
            resultadoUsuario.innerHTML = `
                <div class="error">
                    Ocurrió un error desconocido al buscar el usuario.
                </div>
            `;
        }
    }
}

const botonBuscar = document.getElementById("btnBuscar");

if (botonBuscar) {
    botonBuscar.addEventListener("click", buscarUsuarioPorId);
}

listarUsuarios();
