//=====================================================
// INTERFACES
//=====================================================

interface Docente {
    nombre: string;
    asignatura: string;
    horas?: number; // opcional
    activo: boolean;
}

/*
VARIANTE (sin propiedad opcional)

interface Docente {
    nombre: string;
    asignatura: string;
    horas: number;
    activo: boolean;
}
*/


//=====================================================
// OBJETOS
//=====================================================

const docente1: Docente = {
    nombre: "Juan",
    asignatura: "Matemáticas",
    activo: true
};

const docente2: Docente = {
    nombre: "Andy",
    asignatura: "BDD",
    horas: 10,
    activo: true
};


/*
EJEMPLO CON MÉTODO

interface Docente {
    nombre: string;
    asignatura: string;
    horas: number;
    activo: boolean;

    saludar(): string;
}

const docente3: Docente = {
    nombre: "Jonathan",
    asignatura: "BDD 2",
    horas: 50,
    activo: true,

    saludar(): string {
        return `Hola, soy ${this.nombre}`;
    }
};
*/


//=====================================================
// FUNCIONES
//=====================================================

function dedicacion(
    horas?: number
): string {

    if (horas === undefined) {
        return "No se ha definido la cantidad de horas";
    }

    return horas >= 8
        ? "Tiempo completo"
        : "Tiempo parcial";
}


//=====================================================
// EJECUCIÓN / PRUEBAS
//=====================================================

console.log("===== DOCENTE 1 =====");
console.log("Nombre:", docente1.nombre);
console.log("Horas:", docente1.horas);
console.log(
    "Dedicación:",
    dedicacion(docente1.horas)
);


console.log("\n");
console.log("===== DOCENTE 2 =====");
console.log("Nombre:", docente2.nombre);
console.log("Horas:", docente2.horas);
console.log(
    "Dedicación:",
    dedicacion(docente2.horas)
);


/*
PRUEBA MÉTODO

console.log(
    docente3.saludar()
);
*/