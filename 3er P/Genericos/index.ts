function mostrarDatos<T>(dato:T):void{
	console.log(dato);
}

//any
mostrarDatos<string>("Hola");
mostrarDatos<number>(100);
mostrarDatos<boolean>(true);

/*
//Funcion báscica con genericos
function obtenerPrimero<T>(elemento:T[]):T{
	return nelementos[0];
}

const primerNombre = obtenerPrimero<string>(["Ana", "Carlos", "Maria"]);
const primerNumero = obtenerPrimero<number>([10 ,20, 30]);
console.log(primerNombre);
console.log(primerNumero);
*/

/*
//Genericos con arreglos
interface Estudiante{
	nombre:string;
	nota:number;
}

function mostrarLista<T>(elementos:T[]):void{
	for(const elemento of elementos){
		console.log(elemento);
	}
}

const estudiantes:Estudiantes[]=[
	{nombre: "Ana", nota: 18},
	{nombre: "Carlos", nota: 15}
];

//Genericos con restricciones
interface ConCodigo{
	codigo:string;
}

function mostrarCodigo<T extends ConCodigo>(item:T):void{
	console.log(`Codigo: ${item.codigo}`);
}

const proyecto = {
	//codigo: "PV-001";
	titulo: "Capacitacion digital"
}
*/