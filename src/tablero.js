// En este módulo se encuentran todas las funciones relacionadas con el tablero


// Importamos el objeto sudoku con los Sudokus predefinidos
import { sudokus } from "./data.js";

// Función que permite rellenar el tablero
// Admite hasta tres array de entrada. El primero es el de los valores, el segundo es el de los datos fijos iniciales, y el tercero el de lo datos insertados por el usuario
// Cada array tiene que estar compuesto por 9 elementos que a su vez son arrayys con los nueve valores de la cuadrícula 
function cargaTableroV2(arraySudoku=[], arrayInicial=arraySudoku, arrayUsuario=arraySudoku){
    let cuadricula = document.getElementById("cuadriculaJuego");    //Seleccionamos el elemento cuadricula
    cuadricula.innerHTML="";                                        //Lo reseteamos
    for (let cu = 1; cu <= 9; cu++){                                //Por todos los valores de 1 a 9 (representan las cuadriculas)
        let nuevoCuadrante = document.createElement("div");             //Creamos un div
        nuevoCuadrante.setAttribute("class","cuadrante");               //le Asignamos la clase cuadrante
        let filaInicial = 1 + 3 * Math.floor((cu-1)/3);                 //Calculamos la fila inicial (FI) de la cuadrícula (cuadrículas 1,2,3 FI 1; cuadrículas 4,5,6 FI 4; y cuadrículas 7,8,9 FI 7. cu - 1 es el índice del array de vaores de la cuadrícula del array principal del sudoku.)
        let columnaInicial = cu%3===0?7:(cu%3)**2;                      //Calculamos la columna inicial (CI) de la cuadrícula (cuadrículas 1,4,7 CI 1; cuadrículas 2,5,8 CI 4; y cuadrículas 3,6,9 CI 7)
        let arrayCuadrante = arraySudoku[cu - 1]||[];                   //Declaramos la variable arrayCuadrante y le pasamos el array de valores del respectivo cuadrante. La opción [] permite crear un tablero con todas celdas de input simplemente pasando a la función un array vacío o nada
        let arrayCuadranteInicial = arrayInicial[cu - 1]||[];           //Declaramos la variable arrayCuadranteInicial para los valores iniciales fijos
        let arrayCuadranteUsuario = arrayUsuario[cu - 1]||[];           //Declaramos la variable arrayCuadranteUsuario para los valores del usuario
        let indice = 0;                                                 //Declaramos e inicializamos a 0 la variable indice
        for (let f = filaInicial; f < filaInicial+3; f++){              //Iteramos por fila, desde la fila inicial del cuadrante hasta la final 
            for (let c = columnaInicial; c < columnaInicial + 3; c++){      //Iteramos por columna, desde la columna inicial del cuadrante hasta la final
                indice = 3 * (f - filaInicial) + (c - columnaInicial);          //Calculamos el índice del elemento de la cuadrícula (para el array interno)
                let nuevoElemento = document.createElement("input");            //Creamos un nuevo elemento de input
                nuevoElemento.setAttribute("type","text");                      //Asignamos el tipo texto al input
                nuevoElemento.setAttribute("pattern","[0-9]");                  //Asignamos el pattern [0-9] al input
                nuevoElemento.setAttribute("maxlength","1");                    //Asignamos la longitud máxima de 1 al input
                if (arrayCuadrante[indice]===""||arrayCuadrante[indice]===0||arrayCuadrante[indice]==undefined) {   //Si el valor del elemento es vacío, 0 o nulo
                    nuevoElemento.setAttribute("data-mark","0");                    //Asignamos el data-mark="0" al input (esto hará de forma que el input sea editable)
                    if (arrayCuadranteUsuario[indice]) {                            //Si el elemento correspondiente del array de los datos del usuario tiene valor
                        nuevoElemento.setAttribute("value",`${arrayCuadranteUsuario[indice]}`)  //Asignamos este valor al input
                    }
                } else if (arrayCuadrante[indice]>0&&arrayCuadrante[indice]<=9) {   //Si el valor del elemento no es vacçio, 0 o nulo y se encuentra entre 1 y 9
                    nuevoElemento.setAttribute("value",`${arrayCuadrante[indice]}`);//Asignamos este valor al input
                    if(arrayCuadranteInicial[indice]){                              //Si ele elemento correspondiente de array Inicial tiene valor
                        nuevoElemento.setAttribute("data-mark","1");                    //Asignamos el data-mark="1" al input (esto hará de forma que el input NO sea editable)
                    } else {                                                        //En caso contrario
                        nuevoElemento.setAttribute("data-mark","0");                    //Asignamos el data-mark="0" al input (esto hará de forma que el input sea editable)
                    }
                } else {                                                        //Si el valor del elemento no es vacçio, 0 o nulo y no se encuentra entre 1 y 9
                    alert(`La entrada de la celda en fila ${f} y columna ${c} no es válida. Se creará como celda para rellenar`);   //Lanzamos un aviso de dato no válido
                    nuevoElemento.setAttribute("data-mark","0");                    //Asignamos el data-mark="0" al input (esto hará de forma que el input sea editable)
                }
                nuevoElemento.setAttribute("id",`celda${cu}${indice + 1}`);     //Asignamos el id correspondiente al input
                nuevoElemento.setAttribute("data-row",`${f}`);                  //Asignamos el data-row con el correspondiente número de fila al input
                nuevoElemento.setAttribute("data-col",`${c}`);                  //Asignamos el data-col con el correspondiente número de columna al input
                nuevoElemento.setAttribute("data-cuad",`${cu}`);                //Asignamos el data-cuad con el correspondiente número de cuadrícula al input
                nuevoCuadrante.append(nuevoElemento);                           //Colgamos el input al div
            }
        }
        cuadricula.append(nuevoCuadrante);                          //Colgamos el div al tablero
    }
}

// Función que transforma el tablero actual en 2 arrays sudoku con la estructura de array de 9 arrays de valores de cuadrícula.
// Admite como entrada un HTMLCollection con los elementos del tablero y devuelve el array de valores iniciales fijo y el de los introducidos por el usuario
function tablero2Array(elementosCuadricula=document.querySelectorAll("[data-mark]")){
    let arrayElementos=[...elementosCuadricula];                        //Transformamos el HTMLCollection en array (un array de 81 elementos)
    let arrayValores=arrayElementos.map(elem=>parseInt(elem.value)||0); //Extramos los valores de los elementos
    let arrayJuego=[];                                                  //Declaramos e inicializamos el array de valores iniciales
    let arrayUsuario=[];                                                //Declaramos e inicializamos el array de valores del usuario
    for (let cu = 0; cu < 9; cu++){                                     //Iteramos entre 0 y 8 (índice de cuadrículas)
        let arrayCuadrante =[];
        let arrayCuadranteUsuario =[];
        let indiceInicial = cu*9;                                       //Calculamos el índice inicial
        for (let i = indiceInicial; i < indiceInicial + 9; i++){        //Por cada elemento entre el índice inicial y el final
            if (arrayElementos[i].dataset.mark=="0"){                   //Si el atributo data-mark es igual a cero "0" (celda editable, pues valor del usuario)
                arrayCuadrante.push(0);                                     //Añadimmos un 0 al array de la cuadrícula del array de valores iniciales 
                arrayCuadranteUsuario.push(arrayValores[i]);                //Añadimmos el valor al array de la cuadrícula del array de valores del usuario
            } else {                                                    //En caso contrario (celda no editable, pues valor inicial)
                arrayCuadrante.push(arrayValores[i]);                       //Añadimmos el valor al array de la cuadrícula del array de valores iniciales
                arrayCuadranteUsuario.push(0);                              //Añadimmos un 0 al array de la cuadrícula del array de valores del usuario
            }
        }
        arrayJuego.push(arrayCuadrante);                            //Añadimos el array al array total de valores iniciales
        arrayUsuario.push(arrayCuadranteUsuario);                   //Añadimos el array al array total de valores introducidos por el usuario
    }
    return [arrayJuego, arrayUsuario];                          //Devolvemos los dos arrays
}

// Función para elegir aleatoriamente un sudoku desde el objeto sudokus en base al nivel de dificultad
function sudokuAleatorio(dificultad){
    let indiceAleatorio = Math.floor(Math.random() * 10); //De 0 a 9
    return sudokus[dificultad][indiceAleatorio];
}

// Exportamos todas las funciones del módulo
export {cargaTableroV2, tablero2Array, sudokuAleatorio};