function mostrarDatos<T>(dato:T):void{
	console.log(dato);
}
//any
mostrarDato<string>("Hola");
mostrarDato<number>(100);
mostrarDato<boolean>(true);