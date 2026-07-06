"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Especies_1 = require("./models/Especies");
const ZonaReforestacion_1 = require("./models/ZonaReforestacion");
// Crear especies
const especie1 = new Especies_1.Especies("Pino", "Pinus");
const especie2 = new Especies_1.Especies("Roble", "Quercus");
// Crear zona
const zona1 = new ZonaReforestacion_1.ZonaReforestacion("Zona A", 100, [], 0);
// Agregar especies
zona1.agregarEspecie(especie1, 50);
zona1.agregarEspecie(especie2, 30);
// Mostrar información
zona1.mostrarZona();
