document.getElementById("btnRegistrar").addEventListener("click", registrarArbol);

let arboles = [];

function registrarArbol() {

    const codigo = document.getElementById("codigo").value.trim();
    const especie = document.getElementById("especie").value.trim();
    const zona = document.getElementById("zona").value;
    const altura = parseFloat(document.getElementById("altura").value);
    const edad = parseFloat(document.getElementById("edad").value);
    const estado = document.getElementById("estado").value;

    // validar campos
    if (
        codigo === "" ||
        especie === "" ||
        zona === "" ||
        estado === "" ||
        isNaN(altura) ||
        isNaN(edad)
    ) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (altura <= 0) {
        alert("La altura debe ser mayor que 0.");
        return;
    }

    if (edad <= 0) {
        alert("La edad debe ser mayor que 0.");
        return;
    }

    // calisifacion
    let clasificacion = "";

    if (edad < 10) {
        clasificacion = "Joven";
    } else if (edad <= 30) {
        clasificacion = "Adulto";
    } else {
        clasificacion = "Maduro";
    }

    // OBJETO
    const arbol = {
        codigo,
        especie,
        zona,
        altura,
        edad,
        estado,
        clasificacion
    };

    // GUARDAR EN ARRAY
    arboles.push(arbol);

    // AGREGAR A TABLA
    const tabla = document.getElementById("tablaArboles");

    const fila = document.createElement("tr");

    fila.innerHTML =
        "<td>" + arboles.length + "</td>" +
        "<td>" + arbol.codigo + "</td>" +
        "<td>" + arbol.especie + "</td>" +
        "<td>" + arbol.zona + "</td>" +
        "<td>" + arbol.altura + "</td>" +
        "<td>" + arbol.edad + "</td>" +
        "<td>" + arbol.estado + "</td>" +
        "<td>" + arbol.clasificacion + "</td>";
        
    tabla.appendChild(fila);

    document.getElementById("codigo").value = "";
    document.getElementById("especie").value = "";
    document.getElementById("zona").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("estado").value = "";

    calcularEstadisticas();
}

function calcularEstadisticas() {

    let sumaEdades = 0;
    let mayorAltura = 0;

    for (let i = 0; i < arboles.length; i++) {

        sumaEdades += arboles[i].edad;

        if (arboles[i].altura > mayorAltura) {
            mayorAltura = arboles[i].altura;
        }
    }

    const promedioEdades = sumaEdades / arboles.length;

    document.getElementById("totalArboles").innerHTML =
        "Total de especies registradas: " + arboles.length;

    document.getElementById("valorSumaEdades").innerHTML =
        "Suma de edades: " + sumaEdades + " años";

    document.getElementById("valorPromedioEdades").innerHTML =
        "Promedio de edades: " + promedioEdades.toFixed(2) + " años";

    document.getElementById("mayorAltura").innerHTML =
        "Mayor altura: " + mayorAltura + " m";
}