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
}