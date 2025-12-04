// En este módulo se encuentran todas las funciones relacionadas con el juego


// Importamos las funciones que se necesitan
import { cargaTableroV2 } from "./tablero.js";
import { devuelveCuadricula, devuelveColumna, devuelveFila, devuelveIndice, restableceArray2d } from "./utilidades.js";

// Función que carga un valor especifico en una celda del tablero
// Admite como parámetros de entrada un array de 81 elementos con el valor de la celda, el elemento de una celda y la opción a cargar 
function cargaOpcion(tablero, elemento, opcion){
    let indiceElemento = devuelveIndice(elemento);
    tablero[indiceElemento]=opcion;
    return tablero;
}

// Función que calcula las opciones posibles para una celda vacía dependiendo de los valores de los otros elementos de su fila, columna y cuadrícula
// Admite como parámetros de entrada un array de 81 elementos con el valor de la celda y el elemento de una celda
function opcionesPosibles(tablero, elemento){
    let arrayOpcionesPosibles=[];                               //Declaramos un array de opciones posibles
    let indiceElemento = devuelveIndice(elemento);              //Calculamos el índice del elemento
    let indicesCudricula = devuelveCuadricula(indiceElemento);  //Calculamos el número i los índices de los elementos de la cuadrícula
    let indicesColumna = devuelveColumna(indiceElemento);       //Calculamos el número i los índices de los elementos de la columna
    let indicesFila = devuelveFila(indiceElemento);             //Calculamos el número i los índices de los elementos de la fila
    let valores = [...indicesCudricula[1].map(indice=>tablero[indice]), ...indicesColumna[1].map(indice=>tablero[indice]), ...indicesFila[1].map(indice=>tablero[indice])];
    //Declaramos el array de valores compuesto por los valores distintos de cero de los otros elementos de la misma cuadrícula, columna y fila del elemento proporcionado
    for (let i = 1; i <= 9; i++) {                              //Por todos los valores de 1 a 9
        if(!valores.includes(i)){                                   //Si el valor no se encuentra en el array de valores
            arrayOpcionesPosibles.push(i);                              //Añadimos el valor al array de posibles opciones
        }
    }
    return arrayOpcionesPosibles;                               //Devolvemos el array de opciones posibles
}

// Función recursiva que encuentra la solución del sudoku
// Admite como parámetros de entrada el array de los elementos de la cuadrícula, el tablero con formato de array de 81 elementos, y un array con el número máximo de pasos
// Devuelve un array con 2 elementos. El primero es un booleano que dice si el sudoku tiene solución y el segundo es el tablero solucionado
// Importante: En caso de sudoku en principio correcto (sin repeticiones en fila, columna y cuadrícula), pero sin solución, el número de posibilidades va exponencialmente creciendo con el número de celdas vacías, por eso y para evitar un tiempo de cálculo y un uso de recursos excesivos, se ha introducido el número máximo de pasos.
// P.D.: El número máximo de pasos se introduce como array de un solo elemento para poderlo pasar por referencia de forma que en cada iteración su valor se actualice
function solucionSudoku(arrayElementos,tablero,pasosMax=[100000]){
    // ----- CASO BASE -----
    if(arrayElementos.length === 1){                                            //Caso Base - Si la longitud del array de elementos es igual a 1
        let elemento = arrayElementos[0];                                           //Declaramos la variable elemento y le pasamos el primer elemnto del array de elementos
        let indiceElemento = devuelveIndice(elemento);                              //Calculamos el índice del elemento
        if (tablero[indiceElemento]){                                               //Si la celda no está vacía
            return [true, tablero];                                                     //Devolvemos el array de la solución con el primer elemento true y el tablero solucionado
        } else {                                                                    //Si la celda está vacía
            let opciones = opcionesPosibles(tablero, elemento);                         //Calculamos las opciones posible para esta celda
            if(opciones.length){                                                        //Si el array de opciones posibles no está vacío
                let nuevoTablero = cargaOpcion(tablero, elemento, opciones[0]);             //Declaramos un nuevo tablero cargando al anterior la única opción posible 
                return [true, nuevoTablero];                                                //Devolvemos el array de la solución con el primer elemento true y el nuevo tablero
            } else {                                                                    //Si el array de opciones posibles está vacío
                return [false, tablero];                                                    //Devolvemos el array de la solución con el primer elemento false y el tablero
            }
        }
        // ----- CASO ITERATIVO -----
    } else {                                                                    //Caso Iterativo: - Si la longitud del array de elementos es mayor que 1
        pasosMax[0]--;                                                              //Restamos 1 al número máximo de pasos
        if(pasosMax[0]<=0){                                                         //Si el número máximo de pasos es menor o igual a 0.
            if(pasosMax[0]===0) {                                                       //Si el número máximoo de pasos es 0
                alert("número de pasos máximos alcanzado. El sudoku podría no tener solución")//Avisamos que hemos alcanzado el número máximo de pasos
                return [false, tablero];                                                    //Devolvemos el array de la solución con el primer elemento false y el tablero
            }
            return [false, tablero];                                                    //Devolvemos el array de la solución con el primer elemento false y el tablero
        }
        let elemento = arrayElementos.shift();                                      //Declaramos la variable elemento y le pasamos el primer elemnto del array de elementos, quitándolo del mismo
        let indiceElemento = devuelveIndice(elemento);                              //Calculamos el índice del elemento
        if (tablero[indiceElemento]){                                               //Si la celda no está vacía
            let opciones = tablero[indiceElemento];                                     //Declara como única opción posible el valor de la misma celda
            return solucionSudoku([...arrayElementos],tablero,pasosMax);                //Devuelve la solución de esta misma función con el array de elementos de las celdas que quedan
        } else {                                                                    //Si la celda está vacía
            let opciones = opcionesPosibles(tablero, elemento);                         //Calculamos las opciones posible para esta celda
            if(opciones.length){                                                        //Si el array de opciones posibles no está vacío
                while(opciones.length>0){                                                   //Mientras la longitud del array de soluciones posibles es mayor que 0
                    let opcion = opciones.shift();                                              //Declaramos la variable con la nueva opción posible y le pasamos el primer elemento del array de opciones posibles y eliminándolo de éste 
                    let nuevoTablero = cargaOpcion(tablero, elemento, opcion);                  //Actualizamos el tablero cargando la nueva opción posible para esta celda
                    let resultado = solucionSudoku([...arrayElementos],nuevoTablero,pasosMax);  //Declaramos la variable resultado y le pasamos la salida de esta misma función con el array de elementos de las celdas que quedan
                    if (resultado[0]){                                                          //Si el primer elemento del resultado es true
                        return resultado;                                                           //Devolvemos el tablero
                    }
                }
                let nuevoTablero = cargaOpcion(tablero, elemento, 0);                       //Si se han probado todas las opciones posibles de esta celda sin devolver un resultado positivo, restablecemos el valor de la celda a 0 para pasar el tablero limpio al paso anterior
                return [false, tablero];                                                    //Devolvemos el array de la solución con el primer elemento false y el tablero
            } else {                                                                    //Si el array de opciones posibles está vacío
                return [false, tablero];                                                    //Devolvemos el array de la solución con el primer elemento false y el tablero
            }
        }
    }
}

// Función que soluciona el sudoku y carga la solución en el tablero
// Admite como parámetro de entrada el tablero en formato de array de 9 arrays de 9 elementos
function solveSudoku(tablero){
    let elementos = document.querySelectorAll("[data-cuad]");   //Creamos una HTMLCollection con todos los elementos del tablero
    let arrayElementos = [...elementos];                        //Lo convertimos a array
    let arrayPlano = tablero.flat();                            //Convertimos el array del tablero a un array de 1 dimensión
    let solucion = solucionSudoku(arrayElementos,arrayPlano);   //Declaramos la variable solución y le pasamos la salida de la función solucionSudoku
    if(solucion[0]){                                            //Si existe solución
        cargaTableroV2(restableceArray2d(solucion[1]),tablero);     //cargamos el tablero con la solución del sudoku
    } else {                                                    //Si no existe solución
        alert("el sudoku no tiene solución");                       //Avisamos
    }
}

// Exportamos todas las funciones del módulo
export {cargaOpcion, opcionesPosibles, solucionSudoku, solveSudoku};