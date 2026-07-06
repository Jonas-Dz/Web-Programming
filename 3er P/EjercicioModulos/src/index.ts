import { Especies } from "./models/Especies";
import { ZonaReforestacion } from "./models/ZonaReforestacion";

// Crear especies
const especie1 = new Especies("Pino", "Pinus");
const especie2 = new Especies("Roble", "Quercus");

// Crear zona
const zona1 = new ZonaReforestacion("Zona A", 100, [], 0);

// Agregar especies
zona1.agregarEspecie(especie1, 50);
zona1.agregarEspecie(especie2, 30);

// Mostrar información
zona1.mostrarZona();