document.getElementById("btnRegistrar").addEventListener("click", registrarAuto);

let autos = [];

function registrarAuto() {
    const placa = document.getElementById("placa").value;
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const km = parseFloat(document.getElementById("km").value);

    //Objeto auto
    const auto = {
        placa: placa,
        marca: marca,
        modelo: modelo,
        km: km
    };

    //Guardo en el array
    autos.push(auto);

    //Agrego en la tabla
    const tabla = document.getElementById("tablaAutos");

    const fila = document.createElement("tr");

    fila.innerHTML =
        "<td>" + autos.length + "</td>" +
        "<td>" + auto.placa + "</td>" +
        "<td>" + auto.marca + "</td>" +
        "<td>" + auto.modelo + "</td>" +
        "<td>" + auto.km + "</td>";

    tabla.appendChild(fila);

    //Limpiar
    document.getElementById("placa").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("km").value = "";

    calcularEstadisticas();
}

function calcularEstadisticas() {

    let sumaKm = 0;

    //Recorrer array
    for (let i = 0; i < autos.length; i++) {
        sumaKm += autos[i].km;
    }

    document.getElementById("totalAutos").innerHTML =
        "Total de autos: " + autos.length;

    document.getElementById("valorTotal").innerHTML =
        "Total de kilometraje: " + sumaKm + " km";
}