/* Js Registro Estudiantes

document.getElementById("btnRegistrar").addEventListener("click", registrarEstudiante);

let totalEstudiantes = 0;

function registrarEstudiante() {

    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const contenedor = document.getElementById("resultado");

    let tabla = document.getElementById("tablaEstudiantes");

    if (!tabla) {
        tabla = document.createElement("table");
        tabla.id = "tablaEstudiantes";
        tabla.border = "1";

        const encabezado = document.createElement("tr");

        encabezado.innerHTML = "<th>Numero</th>" + "<th>Nombre</th>" + "<th>Edad</th>";
        tabla.appendChild(encabezado);
        contenedor.appendChild(tabla);
    }

    totalEstudiantes++;

    const fila = document.createElement("tr");

    fila.innerHTML = "<td>" + totalEstudiantes + "</td>" + "<td>" + nombre + "</td>" + "<td>" + edad + "</td>";
    tabla.appendChild(fila);

    document.getElementById("contador").innerHTML = "Total de estudiantes registrados: " + totalEstudiantes;

    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";

    sumarEdad();
}

function sumarEdad() {

    const tabla = document.getElementById("tablaEstudiantes");
    let total = 0;

    for(let i = 1; i < tabla.rows.length; i++) {
        let edad = parseInt(tabla.rows[i].cells[2].innerText);
        total += edad;
    }

    document.getElementById("totalEdad").innerHTML = "Suma total de edades: " + total;
}

*/

document.getElementById("btnRegistrar").addEventListener("click", registrarProducto);

let totalProductos = 0;

function registrarProducto() {

    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;

    const tabla = document.getElementById("tablaProductos");

    totalProductos++;

    const fila = document.createElement("tr");

    fila.innerHTML =
        "<td>" + totalProductos + "</td>" +
        "<td>" + nombre + "</td>" +
        "<td>" + categoria + "</td>" +
        "<td>" + precio + "</td>";

    tabla.appendChild(fila);

    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";

    calcularEstadisticas();
}

function calcularEstadisticas() {

    const tabla = document.getElementById("tablaProductos");

    let sumaPrecios = 0;
    let mayorPrecio = 0;
    let productoMasCaro = "";

    for (let i = 0; i < tabla.rows.length; i++) {

        let nombreProducto = tabla.rows[i].cells[1].innerText;
        let precio = parseFloat(tabla.rows[i].cells[3].innerText);

        sumaPrecios += precio;

        if (precio > mayorPrecio) {
            mayorPrecio = precio;
            productoMasCaro = nombreProducto;
        }
    }

    let promedio = sumaPrecios / totalProductos;

    document.getElementById("totalProductos").innerHTML =
        "Total de productos: " + totalProductos;

    document.getElementById("valorTotal").innerHTML =
        "Valor total: $" + sumaPrecios;

    document.getElementById("promedio").innerHTML =
        "Precio promedio: $" + promedio.toFixed(2);

    document.getElementById("masCaro").innerHTML =
        "Producto más caro: " + productoMasCaro + " ($" + mayorPrecio + ")";
}