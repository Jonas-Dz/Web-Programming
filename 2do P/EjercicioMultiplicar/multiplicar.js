document.getElementById("btnGenerar").addEventListener("click", generarTabla);
function generarTabla() {
    const numero = document.getElementById("numero").value;
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = "";

    const tabla = document.createElement("table");
    tabla.border = "1";
    const encabezado = document.createElement("tr");
    encabezado.innerHTML = "<th>Numero</th>" + "<th>operacion</th>";
    tabla.appendChild(encabezado);

    for (let i = 1; i <= 12; i++) {
        const fila = document.createElement("tr");
        fila.innerHTML = "<td>" + i + "</td>" + "<td>" + numero + " x " + i  +"="+ (numero*i) + "</td>";
        tabla.appendChild(fila);
    }
    contenedor.appendChild(tabla);
}