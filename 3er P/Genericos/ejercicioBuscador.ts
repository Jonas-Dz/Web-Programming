// Interface base
interface ConCodigo {
    codigo: string;
}

// Función requerida
function buscarPorCodigo<T extends ConCodigo>(
    elementos: T[],
    codigo: string
): T | undefined {

    return elementos.find(elemento => elemento.codigo === codigo);
}

// Interface Proyecto
interface Proyecto extends ConCodigo {
    nombre: string;
    responsable: string;
}

// Datos
const proyectos: Proyecto[] = [
    {
        codigo: "PR-001",
        nombre: "Sistema de Ventas",
        responsable: "Ana"
    },
    {
        codigo: "PR-002",
        nombre: "Aplicación Móvil",
        responsable: "Carlos"
    },
    {
        codigo: "PR-003",
        nombre: "Página Web",
        responsable: "María"
    }
];

// Buscar proyecto
const proyectoEncontrado = buscarPorCodigo(proyectos, "PR-002");

if (proyectoEncontrado) {
    console.log("Proyecto encontrado:");
    console.log(proyectoEncontrado);
} else {
    console.log("Proyecto no encontrado.");
}