let estudiantes: string = "Andy";
let edadEstudiante: number = 21;
let matriculado: boolean = true;
let asignaturas: string[] = ["Programacion", "Base de datos"];

function mostrarEstudiante(): void{
    console.log("Nombre: ", estudiantes);
    console.log("Edad: ", edadEstudiante);
    console.log("Matriculado: ", matriculado);
    console.log("Asignaturas: ", asignaturas);
}

mostrarEstudiante();