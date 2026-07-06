import { Especies } from "./Especies";

export class ZonaReforestacion {
    constructor(
        public nombreZona: string,
        public metaMinima: number,
        public listaEspecies: Especies[],
        public cantidadArbolesPlantados: number
    ) { }

    agregarEspecie(especie: Especies, cantidad: number): void {
        this.listaEspecies.push(especie);
        this.cantidadArbolesPlantados += cantidad;
    }

    calcularTotalArbolesPlantados(): number {
        return this.cantidadArbolesPlantados;
    }

    verificarMeta(): boolean {
        return this.cantidadArbolesPlantados >= this.metaMinima;
    }

    mostrarZona(): void {
        console.log(`Zona: ${this.nombreZona}`);
        console.log(`Meta mínima: ${this.metaMinima}`);
        console.log(`Arboles plantados: ${this.cantidadArbolesPlantados}`);

        console.log("Especies:");

        this.listaEspecies.forEach((especie) => {
            especie.mostrarEspecie();
        });

        console.log(
            this.verificarMeta()
                ? "La zona cumple la meta."
                : "La zona no cumple la meta."
        );
    }
}