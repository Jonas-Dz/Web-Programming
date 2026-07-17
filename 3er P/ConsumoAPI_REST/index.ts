"use strict";

interface Publicacion {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface NuevaPublicacion {
    userId: number;
    title: string;
    body: string;
}

type TipoMensaje = "info" | "exito" | "error";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const TIEMPO_LIMITE_MS = 10000;

function obtenerElemento<T extends HTMLElement>(id: string): T {
    const elemento = document.getElementById(id);

    if (!elemento) {
        throw new Error(`No se encontró el elemento HTML con ID "${id}".`);
    }

    return elemento as T;
}

const mensaje = obtenerElemento<HTMLDivElement>("mensaje");
const tablaPublicaciones = obtenerElemento<HTMLTableSectionElement>("tablaPublicaciones");
const contadorPublicaciones = obtenerElemento<HTMLDivElement>("contadorPublicaciones");

function escaparHTML(valor: unknown): string {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function mostrarMensaje(texto: string, tipo: TipoMensaje = "info"): void {
    mensaje.textContent = texto;
    mensaje.className = `mensaje visible ${tipo}`;
    mensaje.scrollIntoView({ behavior: "smooth", block: "start" });
}

function limpiarMensaje(): void {
    mensaje.textContent = "";
    mensaje.className = "mensaje";
}

function validarEnteroPositivo(valor: string, nombreCampo: string): number {
    const numero = Number(valor);

    if (
        valor === "" ||
        Number.isNaN(numero) ||
        !Number.isInteger(numero) ||
        numero <= 0
    ) {
        throw new Error(`${nombreCampo} debe ser un número entero mayor que cero.`);
    }

    return numero;
}

function validarTexto(valor: string, nombreCampo: string): string {
    const texto = valor.trim();

    if (texto === "") {
        throw new Error(`${nombreCampo} es obligatorio.`);
    }

    return texto;
}

async function solicitar<T>(
    url: string,
    opciones: RequestInit = {},
    mensajeError = "La solicitud no pudo completarse."
): Promise<T> {
    const controlador = new AbortController();
    const temporizador = window.setTimeout(
        () => controlador.abort(),
        TIEMPO_LIMITE_MS
    );

    try {
        const respuesta = await fetch(url, {
            ...opciones,
            signal: controlador.signal,
            headers: {
                Accept: "application/json",
                ...(opciones.body ? { "Content-Type": "application/json" } : {}),
                ...(opciones.headers ?? {})
            }
        });

        const textoRespuesta = await respuesta.text();
        let datos: unknown = null;

        if (textoRespuesta !== "") {
            try {
                datos = JSON.parse(textoRespuesta) as unknown;
            } catch {
                datos = textoRespuesta;
            }
        }

        if (!respuesta.ok) {
            let detalle: string | null = null;

            if (typeof datos === "object" && datos !== null) {
                const objetoError = datos as Record<string, unknown>;
                const mensajeApi = objetoError.message ?? objetoError.error;

                if (typeof mensajeApi === "string") {
                    detalle = mensajeApi;
                }
            }

            throw new Error(
                detalle ||
                `${mensajeError} HTTP ${respuesta.status} ${respuesta.statusText}.`
            );
        }

        return datos as T;
    } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("La solicitud tardó demasiado y fue cancelada.");
        }

        if (error instanceof TypeError) {
            throw new Error(
                "No fue posible conectarse con la API. Verifique su conexión a Internet."
            );
        }

        throw error;
    } finally {
        window.clearTimeout(temporizador);
    }
}

function manejarError(error: unknown): void {
    console.error(error);
    mostrarMensaje(
        error instanceof Error ? error.message : "Ocurrió un error desconocido.",
        "error"
    );
}

function configurarBoton(
    boton: HTMLButtonElement,
    cargando: boolean,
    textoNormal: string,
    textoCargando: string
): void {
    boton.disabled = cargando;
    boton.textContent = cargando ? textoCargando : textoNormal;
}

function dibujarTabla(
    publicaciones: Publicacion[],
    descripcion = ""
): void {
    tablaPublicaciones.innerHTML = "";
    contadorPublicaciones.textContent = "";

    if (!Array.isArray(publicaciones) || publicaciones.length === 0) {
        tablaPublicaciones.innerHTML = `
            <tr>
                <td colspan="4">No se encontraron publicaciones.</td>
            </tr>
        `;
        contadorPublicaciones.textContent = descripcion;
        return;
    }

    for (const publicacion of publicaciones) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${escaparHTML(publicacion.id)}</td>
            <td>${escaparHTML(publicacion.userId)}</td>
            <td>${escaparHTML(publicacion.title)}</td>
            <td>${escaparHTML(publicacion.body)}</td>
        `;

        tablaPublicaciones.appendChild(fila);
    }

    contadorPublicaciones.textContent =
        `${descripcion ? `${descripcion} — ` : ""}` +
        `Total: ${publicaciones.length} publicación(es).`;
}

function mostrarPublicacion(
    contenedorId: string,
    tituloResultado: string,
    publicacion: Publicacion
): void {
    const contenedor = obtenerElemento<HTMLDivElement>(contenedorId);

    contenedor.innerHTML = `
        <h3>${escaparHTML(tituloResultado)}</h3>
        <p><strong>ID de la publicación:</strong> ${escaparHTML(publicacion.id)}</p>
        <p><strong>ID del usuario:</strong> ${escaparHTML(publicacion.userId)}</p>
        <p><strong>Título:</strong> ${escaparHTML(publicacion.title)}</p>
        <p><strong>Contenido:</strong> ${escaparHTML(publicacion.body)}</p>
    `;

    contenedor.classList.add("visible");
}

function ocultarResultado(contenedorId: string): void {
    const contenedor = obtenerElemento<HTMLDivElement>(contenedorId);
    contenedor.innerHTML = "";
    contenedor.classList.remove("visible");
}

async function listarPublicaciones(): Promise<void> {
    const boton = obtenerElemento<HTMLButtonElement>("btnListar");
    limpiarMensaje();
    configurarBoton(boton, true, "Consultar todas", "Consultando...");

    try {
        const publicaciones = await solicitar<Publicacion[]>(
            API_URL,
            {},
            "No se pudieron obtener las publicaciones."
        );

        dibujarTabla(publicaciones, "Todas las publicaciones");
        mostrarMensaje("Publicaciones obtenidas correctamente.", "exito");
    } catch (error: unknown) {
        dibujarTabla([], "Error durante la consulta");
        manejarError(error);
    } finally {
        configurarBoton(boton, false, "Consultar todas", "Consultando...");
    }
}

async function filtrarPublicacionesPorUsuario(userId: number): Promise<void> {
    const boton = obtenerElemento<HTMLButtonElement>("btnFiltrar");
    limpiarMensaje();
    configurarBoton(boton, true, "Filtrar por usuario", "Filtrando...");

    try {
        const url = `${API_URL}?userId=${encodeURIComponent(userId)}`;
        const publicaciones = await solicitar<Publicacion[]>(
            url,
            {},
            `No se pudieron obtener las publicaciones del usuario ${userId}.`
        );

        dibujarTabla(publicaciones, `Filtro aplicado: usuario ${userId}`);

        if (publicaciones.length === 0) {
            mostrarMensaje(
                `No se encontraron publicaciones para el usuario ${userId}.`,
                "info"
            );
        } else {
            mostrarMensaje(
                `Se encontraron ${publicaciones.length} publicaciones del usuario ${userId}.`,
                "exito"
            );
        }
    } catch (error: unknown) {
        dibujarTabla([], `Filtro: usuario ${userId}`);
        manejarError(error);
    } finally {
        configurarBoton(boton, false, "Filtrar por usuario", "Filtrando...");
    }
}

async function buscarPublicacionPorId(id: number): Promise<void> {
    const boton = obtenerElemento<HTMLButtonElement>("btnBuscar");
    limpiarMensaje();
    ocultarResultado("resultadoBuscar");
    configurarBoton(boton, true, "Buscar publicación", "Buscando...");

    try {
        const publicacion = await solicitar<Publicacion>(
            `${API_URL}/${id}`,
            {},
            `No se pudo consultar la publicación ${id}.`
        );

        mostrarPublicacion("resultadoBuscar", "Publicación encontrada", publicacion);
        mostrarMensaje(`Publicación ${id} encontrada correctamente.`, "exito");
    } catch (error: unknown) {
        manejarError(error);
    } finally {
        configurarBoton(boton, false, "Buscar publicación", "Buscando...");
    }
}

async function crearPublicacion(publicacion: NuevaPublicacion): Promise<void> {
    const boton = obtenerElemento<HTMLButtonElement>("btnCrear");
    limpiarMensaje();
    ocultarResultado("resultadoCrear");
    configurarBoton(boton, true, "Crear publicación", "Creando...");

    try {
        const publicacionCreada = await solicitar<Publicacion>(
            API_URL,
            {
                method: "POST",
                body: JSON.stringify(publicacion)
            },
            "No se pudo crear la publicación."
        );

        mostrarPublicacion(
            "resultadoCrear",
            "Publicación creada por la API",
            publicacionCreada
        );
        mostrarMensaje(
            `Publicación creada correctamente con el ID simulado ${publicacionCreada.id}.`,
            "exito"
        );
        obtenerElemento<HTMLFormElement>("formCrear").reset();
    } catch (error: unknown) {
        manejarError(error);
    } finally {
        configurarBoton(boton, false, "Crear publicación", "Creando...");
    }
}

async function actualizarTitulo(id: number, nuevoTitulo: string): Promise<void> {
    const boton = obtenerElemento<HTMLButtonElement>("btnActualizar");
    limpiarMensaje();
    ocultarResultado("resultadoActualizar");
    configurarBoton(boton, true, "Actualizar título", "Actualizando...");

    try {
        const publicacionOriginal = await solicitar<Publicacion>(
            `${API_URL}/${id}`,
            {},
            `No se pudo consultar la publicación ${id} antes de actualizarla.`
        );

        const respuestaPatch = await solicitar<Partial<Publicacion>>(
            `${API_URL}/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify({ title: nuevoTitulo })
            },
            `No se pudo actualizar el título de la publicación ${id}.`
        );

        const publicacionActualizada: Publicacion = {
            ...publicacionOriginal,
            ...respuestaPatch,
            id,
            title: nuevoTitulo
        };

        mostrarPublicacion(
            "resultadoActualizar",
            "Publicación actualizada por la API",
            publicacionActualizada
        );
        mostrarMensaje(
            `El título de la publicación ${id} fue actualizado correctamente.`,
            "exito"
        );
        obtenerElemento<HTMLFormElement>("formActualizar").reset();
    } catch (error: unknown) {
        manejarError(error);
    } finally {
        configurarBoton(boton, false, "Actualizar título", "Actualizando...");
    }
}

async function eliminarPublicacion(id: number): Promise<void> {
    const boton = obtenerElemento<HTMLButtonElement>("btnEliminar");
    limpiarMensaje();

    const confirmado = window.confirm(
        `¿Está seguro de simular la eliminación de la publicación ${id}?`
    );

    if (!confirmado) {
        mostrarMensaje("Eliminación cancelada.", "info");
        return;
    }

    configurarBoton(boton, true, "Eliminar publicación", "Eliminando...");

    try {
        await solicitar<Record<string, never>>(
            `${API_URL}/${id}`,
            { method: "DELETE" },
            `No se pudo eliminar la publicación ${id}.`
        );

        mostrarMensaje(
            `La eliminación de la publicación ${id} fue simulada correctamente.`,
            "exito"
        );
        obtenerElemento<HTMLFormElement>("formEliminar").reset();
    } catch (error: unknown) {
        manejarError(error);
    } finally {
        configurarBoton(boton, false, "Eliminar publicación", "Eliminando...");
    }
}

obtenerElemento<HTMLButtonElement>("btnListar").addEventListener(
    "click",
    () => void listarPublicaciones()
);

obtenerElemento<HTMLButtonElement>("btnQuitarFiltro").addEventListener(
    "click",
    () => {
        obtenerElemento<HTMLFormElement>("formFiltrar").reset();
        void listarPublicaciones();
    }
);

obtenerElemento<HTMLFormElement>("formFiltrar").addEventListener(
    "submit",
    (evento: SubmitEvent) => {
        evento.preventDefault();

        try {
            const userId = validarEnteroPositivo(
                obtenerElemento<HTMLInputElement>("filtrarUserId").value,
                "El ID del usuario"
            );
            void filtrarPublicacionesPorUsuario(userId);
        } catch (error: unknown) {
            manejarError(error);
        }
    }
);

obtenerElemento<HTMLFormElement>("formBuscar").addEventListener(
    "submit",
    (evento: SubmitEvent) => {
        evento.preventDefault();

        try {
            const id = validarEnteroPositivo(
                obtenerElemento<HTMLInputElement>("buscarId").value,
                "El ID de la publicación"
            );
            void buscarPublicacionPorId(id);
        } catch (error: unknown) {
            manejarError(error);
        }
    }
);

obtenerElemento<HTMLFormElement>("formCrear").addEventListener(
    "submit",
    (evento: SubmitEvent) => {
        evento.preventDefault();

        try {
            const publicacion: NuevaPublicacion = {
                userId: validarEnteroPositivo(
                    obtenerElemento<HTMLInputElement>("crearUserId").value,
                    "El ID del usuario"
                ),
                title: validarTexto(
                    obtenerElemento<HTMLInputElement>("crearTitle").value,
                    "El título"
                ),
                body: validarTexto(
                    obtenerElemento<HTMLTextAreaElement>("crearBody").value,
                    "El contenido"
                )
            };

            void crearPublicacion(publicacion);
        } catch (error: unknown) {
            manejarError(error);
        }
    }
);

obtenerElemento<HTMLFormElement>("formActualizar").addEventListener(
    "submit",
    (evento: SubmitEvent) => {
        evento.preventDefault();

        try {
            const id = validarEnteroPositivo(
                obtenerElemento<HTMLInputElement>("actualizarId").value,
                "El ID de la publicación"
            );
            const nuevoTitulo = validarTexto(
                obtenerElemento<HTMLInputElement>("actualizarTitle").value,
                "El nuevo título"
            );

            void actualizarTitulo(id, nuevoTitulo);
        } catch (error: unknown) {
            manejarError(error);
        }
    }
);

obtenerElemento<HTMLFormElement>("formEliminar").addEventListener(
    "submit",
    (evento: SubmitEvent) => {
        evento.preventDefault();

        try {
            const id = validarEnteroPositivo(
                obtenerElemento<HTMLInputElement>("eliminarId").value,
                "El ID de la publicación"
            );
            void eliminarPublicacion(id);
        } catch (error: unknown) {
            manejarError(error);
        }
    }
);

window.addEventListener("DOMContentLoaded", () => {
    void listarPublicaciones();
});
