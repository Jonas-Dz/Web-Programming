"use strict";
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const TIEMPO_LIMITE_MS = 10000;
function obtenerElemento(id) {
    const elemento = document.getElementById(id);
    if (!elemento) {
        throw new Error(`No se encontró el elemento HTML con ID "${id}".`);
    }
    return elemento;
}
const mensaje = obtenerElemento("mensaje");
const tablaPublicaciones = obtenerElemento("tablaPublicaciones");
const contadorPublicaciones = obtenerElemento("contadorPublicaciones");
function escaparHTML(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function mostrarMensaje(texto, tipo = "info") {
    mensaje.textContent = texto;
    mensaje.className = `mensaje visible ${tipo}`;
    mensaje.scrollIntoView({ behavior: "smooth", block: "start" });
}
function limpiarMensaje() {
    mensaje.textContent = "";
    mensaje.className = "mensaje";
}
function validarEnteroPositivo(valor, nombreCampo) {
    const numero = Number(valor);
    if (valor === "" ||
        Number.isNaN(numero) ||
        !Number.isInteger(numero) ||
        numero <= 0) {
        throw new Error(`${nombreCampo} debe ser un número entero mayor que cero.`);
    }
    return numero;
}
function validarTexto(valor, nombreCampo) {
    const texto = valor.trim();
    if (texto === "") {
        throw new Error(`${nombreCampo} es obligatorio.`);
    }
    return texto;
}
async function solicitar(url, opciones = {}, mensajeError = "La solicitud no pudo completarse.") {
    const controlador = new AbortController();
    const temporizador = window.setTimeout(() => controlador.abort(), TIEMPO_LIMITE_MS);
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
        let datos = null;
        if (textoRespuesta !== "") {
            try {
                datos = JSON.parse(textoRespuesta);
            }
            catch {
                datos = textoRespuesta;
            }
        }
        if (!respuesta.ok) {
            let detalle = null;
            if (typeof datos === "object" && datos !== null) {
                const objetoError = datos;
                const mensajeApi = objetoError.message ?? objetoError.error;
                if (typeof mensajeApi === "string") {
                    detalle = mensajeApi;
                }
            }
            throw new Error(detalle ||
                `${mensajeError} HTTP ${respuesta.status} ${respuesta.statusText}.`);
        }
        return datos;
    }
    catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("La solicitud tardó demasiado y fue cancelada.");
        }
        if (error instanceof TypeError) {
            throw new Error("No fue posible conectarse con la API. Verifique su conexión a Internet.");
        }
        throw error;
    }
    finally {
        window.clearTimeout(temporizador);
    }
}
function manejarError(error) {
    console.error(error);
    mostrarMensaje(error instanceof Error ? error.message : "Ocurrió un error desconocido.", "error");
}
function configurarBoton(boton, cargando, textoNormal, textoCargando) {
    boton.disabled = cargando;
    boton.textContent = cargando ? textoCargando : textoNormal;
}
function dibujarTabla(publicaciones, descripcion = "") {
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
function mostrarPublicacion(contenedorId, tituloResultado, publicacion) {
    const contenedor = obtenerElemento(contenedorId);
    contenedor.innerHTML = `
        <h3>${escaparHTML(tituloResultado)}</h3>
        <p><strong>ID de la publicación:</strong> ${escaparHTML(publicacion.id)}</p>
        <p><strong>ID del usuario:</strong> ${escaparHTML(publicacion.userId)}</p>
        <p><strong>Título:</strong> ${escaparHTML(publicacion.title)}</p>
        <p><strong>Contenido:</strong> ${escaparHTML(publicacion.body)}</p>
    `;
    contenedor.classList.add("visible");
}
function ocultarResultado(contenedorId) {
    const contenedor = obtenerElemento(contenedorId);
    contenedor.innerHTML = "";
    contenedor.classList.remove("visible");
}
async function listarPublicaciones() {
    const boton = obtenerElemento("btnListar");
    limpiarMensaje();
    configurarBoton(boton, true, "Consultar todas", "Consultando...");
    try {
        const publicaciones = await solicitar(API_URL, {}, "No se pudieron obtener las publicaciones.");
        dibujarTabla(publicaciones, "Todas las publicaciones");
        mostrarMensaje("Publicaciones obtenidas correctamente.", "exito");
    }
    catch (error) {
        dibujarTabla([], "Error durante la consulta");
        manejarError(error);
    }
    finally {
        configurarBoton(boton, false, "Consultar todas", "Consultando...");
    }
}
async function filtrarPublicacionesPorUsuario(userId) {
    const boton = obtenerElemento("btnFiltrar");
    limpiarMensaje();
    configurarBoton(boton, true, "Filtrar por usuario", "Filtrando...");
    try {
        const url = `${API_URL}?userId=${encodeURIComponent(userId)}`;
        const publicaciones = await solicitar(url, {}, `No se pudieron obtener las publicaciones del usuario ${userId}.`);
        dibujarTabla(publicaciones, `Filtro aplicado: usuario ${userId}`);
        if (publicaciones.length === 0) {
            mostrarMensaje(`No se encontraron publicaciones para el usuario ${userId}.`, "info");
        }
        else {
            mostrarMensaje(`Se encontraron ${publicaciones.length} publicaciones del usuario ${userId}.`, "exito");
        }
    }
    catch (error) {
        dibujarTabla([], `Filtro: usuario ${userId}`);
        manejarError(error);
    }
    finally {
        configurarBoton(boton, false, "Filtrar por usuario", "Filtrando...");
    }
}
async function buscarPublicacionPorId(id) {
    const boton = obtenerElemento("btnBuscar");
    limpiarMensaje();
    ocultarResultado("resultadoBuscar");
    configurarBoton(boton, true, "Buscar publicación", "Buscando...");
    try {
        const publicacion = await solicitar(`${API_URL}/${id}`, {}, `No se pudo consultar la publicación ${id}.`);
        mostrarPublicacion("resultadoBuscar", "Publicación encontrada", publicacion);
        mostrarMensaje(`Publicación ${id} encontrada correctamente.`, "exito");
    }
    catch (error) {
        manejarError(error);
    }
    finally {
        configurarBoton(boton, false, "Buscar publicación", "Buscando...");
    }
}
async function crearPublicacion(publicacion) {
    const boton = obtenerElemento("btnCrear");
    limpiarMensaje();
    ocultarResultado("resultadoCrear");
    configurarBoton(boton, true, "Crear publicación", "Creando...");
    try {
        const publicacionCreada = await solicitar(API_URL, {
            method: "POST",
            body: JSON.stringify(publicacion)
        }, "No se pudo crear la publicación.");
        mostrarPublicacion("resultadoCrear", "Publicación creada por la API", publicacionCreada);
        mostrarMensaje(`Publicación creada correctamente con el ID simulado ${publicacionCreada.id}.`, "exito");
        obtenerElemento("formCrear").reset();
    }
    catch (error) {
        manejarError(error);
    }
    finally {
        configurarBoton(boton, false, "Crear publicación", "Creando...");
    }
}
async function actualizarTitulo(id, nuevoTitulo) {
    const boton = obtenerElemento("btnActualizar");
    limpiarMensaje();
    ocultarResultado("resultadoActualizar");
    configurarBoton(boton, true, "Actualizar título", "Actualizando...");
    try {
        const publicacionOriginal = await solicitar(`${API_URL}/${id}`, {}, `No se pudo consultar la publicación ${id} antes de actualizarla.`);
        const respuestaPatch = await solicitar(`${API_URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ title: nuevoTitulo })
        }, `No se pudo actualizar el título de la publicación ${id}.`);
        const publicacionActualizada = {
            ...publicacionOriginal,
            ...respuestaPatch,
            id,
            title: nuevoTitulo
        };
        mostrarPublicacion("resultadoActualizar", "Publicación actualizada por la API", publicacionActualizada);
        mostrarMensaje(`El título de la publicación ${id} fue actualizado correctamente.`, "exito");
        obtenerElemento("formActualizar").reset();
    }
    catch (error) {
        manejarError(error);
    }
    finally {
        configurarBoton(boton, false, "Actualizar título", "Actualizando...");
    }
}
async function eliminarPublicacion(id) {
    const boton = obtenerElemento("btnEliminar");
    limpiarMensaje();
    const confirmado = window.confirm(`¿Está seguro de simular la eliminación de la publicación ${id}?`);
    if (!confirmado) {
        mostrarMensaje("Eliminación cancelada.", "info");
        return;
    }
    configurarBoton(boton, true, "Eliminar publicación", "Eliminando...");
    try {
        await solicitar(`${API_URL}/${id}`, { method: "DELETE" }, `No se pudo eliminar la publicación ${id}.`);
        mostrarMensaje(`La eliminación de la publicación ${id} fue simulada correctamente.`, "exito");
        obtenerElemento("formEliminar").reset();
    }
    catch (error) {
        manejarError(error);
    }
    finally {
        configurarBoton(boton, false, "Eliminar publicación", "Eliminando...");
    }
}
obtenerElemento("btnListar").addEventListener("click", () => void listarPublicaciones());
obtenerElemento("btnQuitarFiltro").addEventListener("click", () => {
    obtenerElemento("formFiltrar").reset();
    void listarPublicaciones();
});
obtenerElemento("formFiltrar").addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
        const userId = validarEnteroPositivo(obtenerElemento("filtrarUserId").value, "El ID del usuario");
        void filtrarPublicacionesPorUsuario(userId);
    }
    catch (error) {
        manejarError(error);
    }
});
obtenerElemento("formBuscar").addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
        const id = validarEnteroPositivo(obtenerElemento("buscarId").value, "El ID de la publicación");
        void buscarPublicacionPorId(id);
    }
    catch (error) {
        manejarError(error);
    }
});
obtenerElemento("formCrear").addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
        const publicacion = {
            userId: validarEnteroPositivo(obtenerElemento("crearUserId").value, "El ID del usuario"),
            title: validarTexto(obtenerElemento("crearTitle").value, "El título"),
            body: validarTexto(obtenerElemento("crearBody").value, "El contenido")
        };
        void crearPublicacion(publicacion);
    }
    catch (error) {
        manejarError(error);
    }
});
obtenerElemento("formActualizar").addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
        const id = validarEnteroPositivo(obtenerElemento("actualizarId").value, "El ID de la publicación");
        const nuevoTitulo = validarTexto(obtenerElemento("actualizarTitle").value, "El nuevo título");
        void actualizarTitulo(id, nuevoTitulo);
    }
    catch (error) {
        manejarError(error);
    }
});
obtenerElemento("formEliminar").addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
        const id = validarEnteroPositivo(obtenerElemento("eliminarId").value, "El ID de la publicación");
        void eliminarPublicacion(id);
    }
    catch (error) {
        manejarError(error);
    }
});
window.addEventListener("DOMContentLoaded", () => {
    void listarPublicaciones();
});
