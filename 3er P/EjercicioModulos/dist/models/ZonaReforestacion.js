"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZonaReforestacion = void 0;
class ZonaReforestacion {
    constructor(nombreZona, metaMinima, listaEspecies, cantidadArbolesPlantados) {
        this.nombreZona = nombreZona;
        this.metaMinima = metaMinima;
        this.listaEspecies = listaEspecies;
        this.cantidadArbolesPlantados = cantidadArbolesPlantados;
    }
    agregarEspecie(especie, cantidad) {
        this.listaEspecies.push(especie);
        this.cantidadArbolesPlantados += cantidad;
    }
    calcularTotalArbolesPlantados() {
        return this.cantidadArbolesPlantados;
    }
    verificarMeta() {
        return this.cantidadArbolesPlantados >= this.metaMinima;
    }
    mostrarZona() {
        console.log(`Zona: ${this.nombreZona}`);
        console.log(`Meta mínima: ${this.metaMinima}`);
        console.log(`Arboles plantados: ${this.cantidadArbolesPlantados}`);
        console.log("Especies:");
        this.listaEspecies.forEach((especie) => {
            especie.mostrarEspecie();
        });
        console.log(this.verificarMeta()
            ? "La zona cumple la meta."
            : "La zona no cumple la meta.");
    }
}
exports.ZonaReforestacion = ZonaReforestacion;
