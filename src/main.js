// En este fichero se encuentra el flujo del juego


// Importamos la hoja de estilo
import "../sass/main.scss";

// Importamos las funciones que se necesitan
import { validaTablero, compruebaInput, compruebaJuego} from "./validaciones.js";
import { cargaTableroV2, tablero2Array, sudokuAleatorio } from "./tablero.js";
import { guardaTablero, recargaTablero, checkPartida, guardaTiempos, recargaTiempos, muestraTiempos } from "./persistencia.js";
import { Clock } from "./cronometro.js";
import { aplanaArray } from "./utilidades.js";
import { solucionSudoku, solveSudoku } from "./juego.js";

// Seleccionamos todos los bloques del HTML que se usan
let seccionDeInicio = document.getElementById("seccionInicio");
let textMensaje = document.getElementById("mensaje");
let juego = document.getElementById("tablero");
let tiempo = document.getElementById("timer");
let reloj = document.getElementById("tiempoTimer");
let cuadJuego = document.getElementById("cuadriculaJuego");
let seccionControles = document.getElementById("controles");
let botonValidar = document.getElementById("validarCargar");
let botonResolver = document.getElementById("resolver");

// Declaramos las variables
let juegoEmpezado = false;

// Creamos una nueva instancia de temporizador
let crono = new Clock(reloj);

// Empezamos con esconder las secciones que no necesitamos en este momento
textMensaje.classList.add("hidden");
juego.classList.add("hidden");
seccionControles.classList.add("hidden");

// 1 Generación o Entrada de un Tablero
// Opción A: Permite al usuario ingresar un Sudoku incompleto en un formulario (9x9), dejando celdas vacías en forma de 0 o un espacio en blanco.
let botonCargar = document.getElementById("cargar"); //Seleccionamos el botón de cargar tablero en blanco
botonCargar.addEventListener("click",()=>{      //Añadimos el eventListener sobre el click
    textMensaje.classList.remove("hidden");         //Enseñamos el texto
    textMensaje.textContent="Introduzca su Sudoku"  //Definimos el texto del mensaje
    juego.classList.remove("hidden");               //Enseñamos el tablero
    tiempo.classList.add("hidden");                 //Escondemos el tiempo
    cargaTableroV2();                               //Cargamos el tablero vacío
    seccionControles.classList.remove("hidden");    //Enseñamos los controles
    botonValidar.classList.remove("hidden");        //Enseñamos el botón de Validar
    botonResolver.classList.add("hidden");          //Escondemos el botón de Resolver
    seccionDeInicio.classList.add("hidden");        //Escondemos la sección de inicio
}); 

// Opción B: Genera automáticamente un Sudoku predefinido o uno de ejemplo
let botonNuevo = document.getElementById("nuevo");          //Seleccionamos el botón de nuevo sudoku predefinido
let seleccion = document.getElementById("selector");        //Seleccionamos el selector de dificultad
botonNuevo.addEventListener("click",()=>{                   //Añadimos el eventListener sobre el click
    if(seleccion.value){                                        //Si el selector tiene un nivel de dificultad elegido
        let nuevoSudoku = sudokuAleatorio(seleccion.value);         //Recuperamos un sudoku aleatorio desde el objeto sudokus
        juego.classList.remove("hidden");                           //Enseñamos el tablero
        tiempo.classList.remove("hidden");                          //Enseñamos el tiempo
        cargaTableroV2(nuevoSudoku);                                //Cargamos el tablero
        seccionControles.classList.remove("hidden");                //Enseñamos los controles
        botonResolver.classList.remove("hidden");                   //Enseñamos el botón de Resolver
        botonValidar.classList.add("hidden");                       //Escondemos el botón de validación
        crono.iniciar();                                            //Empezamos a contar el tiempo de juego
        seccionDeInicio.classList.add("hidden");                    //Escondemos la sección de inicio
        juegoEmpezado = true;                                       //Declaramos que el juego ha empezado
    } else {                                                    //Si el selector no tiene un nivel de dificultad seleccionado
        alert("Se necesita configurar un nivel de dificultad desde el selector");   //Avisamos que se necesita seleccionar uno
    }
})

// Opción suplementar: Si ya hay un juego guardado el localStorage, damos la posibilidad de recuperarlo
let botonAntiguo = document.getElementById("restaurar");            //Seleccionamos el botón para vargar un juego guardado
if  (checkPartida()) {                                              //Si existe un juego guardado en localStorage
    botonAntiguo.classList.remove("hidden");                            //Enseñamos el botón para cagar un juego guardado
    botonAntiguo.addEventListener("click",()=>{                         //Añadimos el eventListener sobre el click
        juego.classList.remove("hidden");                                   //Enseñamos el tablero
        tiempo.classList.remove("hidden");                                  //Enseñamos el tiempo
        recargaTablero();                                                   //Recargamnos el tablero
        let arrayReloj = reloj.textContent.split(":").map(e=>parseInt(e));  //Convertimos el tiempo recuperado de memoria en array
        crono.configurar(arrayReloj[0],arrayReloj[1],arrayReloj[2]);        //Configuramos el tiempo con el guardado en el array
        crono.iniciar();                                                    //Reactivamos el tiempo
        seccionControles.classList.remove("hidden");                        //Enseñamos los controles
        botonResolver.classList.remove("hidden");                           //Enseñamos el botón de Resolver
        botonValidar.classList.add("hidden");                               //Escondemos el botón de validación
        seccionDeInicio.classList.add("hidden");                            //Escondemos la sección de inicio
        juegoEmpezado = true;                                               //Declaramos que el juego ha empezado
    })
} else {                                                            //Si no existe un juego guardado en localStorage
    botonAntiguo.classList.add("hidden");                               //Escondemos el botón para vargar un juego guardado
}

// Añadimos el addEventListener al tablero de juego
cuadJuego.addEventListener("keyup",(event)=>{   //Añadimos el eventListener sobre el evento keyUp de la cuadricula de juego
    if (!compruebaInput(event)){                    //Si la tecla presionada no es un número entre 1 y 9 o no se encuentra entre los keyCodes permitidos(Ej: Tab, Backspace, etc)
        alert(`el dígito introducido en la línea ${event.target.dataset.row}, columna ${event.target.dataset.col}, cuadricula ${event.target.dataset.cuad} no es correcto.\nTiene que ser un dígito entre 1 y 9`);      //Avisamos que la tecla no está permitida y la información de la celda
        event.target.value="";                          //Rseteamos el valor de la celda
    }
    if (juegoEmpezado) {                            //Si el juego ya ha empezado
        guardaTablero();                                //Guardamos el juego
        let juegoAcabado = compruebaJuego();            //Declaramos la variable que guarda el estado del juego
        if (juegoAcabado){                              //Si el juego está acabado
            crono.pausar();                                 //Pausamos el reloj
            alert(`Juego Acabado\nTiempo de juego: ${reloj.textContent}`);  //Avisamos
            guardaTiempos();                            //Guardamos el tiempo en localStorage
            muestraTiempos(recargaTiempos());           //Enseñamos todos los tiempos de juego guardados
            localStorage.removeItem("sudokuGuardado");  //Remomovemos el juego guardado
            tiempo.classList.add("hidden");             //Escondemos el tiempo
            botonResolver.classList.add("hidden");      //Escondemos el botón de Resolver
            juego.classList.add("hidden");              //Escondemos el tablero
        }
    }
})

// Añadimos el addEventListener al botón de Validar y cargar
botonValidar.addEventListener("click",()=>{                 //Añadimos el eventListener sobre el click
    alert(`validando tablero...\nEata operación puede tardar hasta unos minutos`)   //Avisamos que se va a validar el tablero
    if (validaTablero()&&solucionSudoku([...document.querySelectorAll("[data-mark")],aplanaArray(tablero2Array()[1]))[0]){  //Si el tablero es válido (sin repeticiones en líneas, columnas y cuadríaculas) y tiene solución
        textMensaje.classList.add("hidden");                        //Escondemos el texto
        cargaTableroV2(tablero2Array()[1]);                         //Cargamos el tablero
        tiempo.classList.remove("hidden");                          //Enseñamos el tiempo
        crono.iniciar();                                            //Reactivamos el tiempo
        botonResolver.classList.remove("hidden");                   //Enseñamos el botón de Resolver
        botonValidar.classList.add("hidden");                       //Escondemos el botón de validación
        juegoEmpezado = true;                                       //Declaramos que el juego ha empezado
    } else if(!validaTablero()){                                  //Si no, diferenciamos entre si el sudoku no es correcto 
        alert("El sudoku introducido no es correcto");
    } else {                                                      //o si no se puede solucionar
        alert("El sudoku introducido no tiene solución");
    }
})

// Añadimos el addEventListener al botón de Resolver
botonResolver.addEventListener("click",()=>{                                    //Añadimos el eventListener para resolver el sudoku
    crono.reiniciar(true);                                                      //Reiniciamos y paramos el reloj
    tiempo.classList.add("hidden");                                             //Escondemos el tiempo
    solveSudoku(tablero2Array(document.querySelectorAll("[data-mark]"))[0]);    //Solucionamos el sudoku
    botonResolver.classList.add("hidden");                                      //Escondemos el botón de Resolver
});