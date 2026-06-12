function cambiarMeta() {

    let ods =
    document.getElementById("ods").value;

    let meta =
    document.getElementById("meta");

    if (ods == "ods1") {

        meta.innerHTML =
        `
        <option>Meta 1.1</option>
        <option>Meta 1.2</option>
        <option>Meta 1.3</option>
        `;

    }

    else if (ods == "ods2") {

        meta.innerHTML =
        `
        <option>Meta 2.1</option>
        <option>Meta 2.2</option>
        `;

    }

    else if (ods == "ods3") {

        meta.innerHTML =
        `
        <option>Meta 3.1</option>
        <option>Meta 3.2</option>
        `;

    }

    else {
        meta.innerHTML =
        `
        <option>
        Seleccione ODS primero
        </option>
        `;

    }

}

function cambiarCampo() {
    let campo =
    document.getElementById(
    "campoAmplio"
    ).value;

    let especifico =
    document.getElementById(
    "campoEspecifico"
    );

    if (campo == "c01") {

        especifico.innerHTML =
        `
        <option>C011</option>
        <option>C012</option>
        `;

    }

    else if (campo == "c02") {

        especifico.innerHTML =
        `
        <option>C021</option>
        <option>C022</option>
        `;

    }

    else {

        especifico.innerHTML =
        `
        <option>
        Seleccione primero un campo
        </option>
        `;

    }

}

function cambiarPolitica() {

    let objetivo =
    document.getElementById(
    "objetivo"
    ).value;

    let politica =
    document.getElementById(
    "politica"
    );

    if (objetivo == "obj1") {

        politica.innerHTML =
        `
        <option>Politica 1</option>
        <option>Politica 2</option>
        `;

    }

    else if (objetivo == "obj2") {

        politica.innerHTML =
        `
        <option>Politica 3</option>
        <option>Politica 4</option>
        `;

    }

    else {

        politica.innerHTML =
        `
        <option>
        Seleccione objetivo
        </option>
        `;

    }

}

function cambiarEstrategia() {

    let objetivo =
    document.getElementById(
    "objetivoPlan"
    ).value;

    let estrategia =
    document.getElementById(
    "estrategia"
    );

    if (objetivo == "oe1") {

        estrategia.innerHTML =
        `
        <option>Estrategia 1</option>
        <option>Estrategia 2</option>
        `;

    }

    else if (objetivo == "oe2") {

        estrategia.innerHTML =
        `
        <option>Estrategia 3</option>
        <option>Estrategia 4</option>
        `;

    }

}

function mostrarFormulario(){

    let nombre =
    document.getElementById(
    "nombre"
    ).value;

    let sede =
    document.getElementById(
    "sede"
    );

    let departamento =
    document.getElementById(
    "departamento"
    );

    let ods =
    document.getElementById(
    "ods"
    );

    let meta =
    document.getElementById(
    "meta"
    );

    let campo =
    document.getElementById(
    "campoAmplio"
    );

    let politica =
    document.getElementById(
    "politica"
    );

    let estrategia =
    document.getElementById(
    "estrategia"
    );



    document.getElementById(
    "resultado"
    ).innerHTML =

    `

    <h3>Datos enviados</h3>

    Nombre:
    ${nombre}

    <br><br>

    Sede:
    ${sede.options[
        sede.selectedIndex
    ].text}

    <br><br>

    Departamento:
    ${departamento.options[
        departamento.selectedIndex
    ].text}

    <br><br>

    ODS:
    ${ods.options[
        ods.selectedIndex
    ].text}

    <br><br>

    Meta:
    ${meta.value}

    <br><br>

    Campo Amplio:
    ${campo.options[
        campo.selectedIndex
    ].text}

    <br><br>

    Política:
    ${politica.value}

    <br><br>

    Estrategia:
    ${estrategia.value}

    `;

}