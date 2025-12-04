// En este módulo se encuentran todas las funciones de utilidad para el juego y susu módulos


// Función a que partir del índice (entre 0 y 80) calcula el número de cuadrícula y los índices de los otros elementos que pertenecen a la misma 
function devuelveCuadricula(indice){
    let cuadricula = Math.floor(indice/9) + 1;      //Calcula el número de cuadrícula
    let indiceMin = (cuadricula - 1) * 9;           //Calcula el índice mínimo
    let indiceMax = cuadricula * 9 - 1;             //Calcula el íncice máximo
    let indices = [];
    for (let i = indiceMin; i <= indiceMax; i++){   //Para todos los número entre el índice mínimo y el máximo
        indices.push(i);                                //Añade el índice al array de índices
    }
    return [cuadricula, indices];                   7//Devuelve el número de cuadrícula y el array de índices de la misma
}

// Función a que partir del índice (entre 0 y 80) calcula el número de columna y los índices de los otros elementos que pertenecen a la misma 
function devuelveColumna(indice){
    let infoCuadricula = devuelveCuadricula(indice);    //Calcula la información de la cuadrícula
    let deltaIndice = indice - infoCuadricula[1][0];    //Calcula la diferencia entre el índice y el índice mínimo de la cuadrícula (corresponde al índice de los elementos en la cuadrícula)
    let columnaCuadricula = deltaIndice % 3 +1;         //Calcula la columna del elemento en la cuadrícula
    let offsetColumna = (infoCuadricula[0] - 1) % 3;    //Calcula el número de columnas que hay antes de la cuadrícula
    let columna = offsetColumna * 3 + columnaCuadricula;//Calcula el número de la columna del elemento en el tablero
    let indiceMin = offsetColumna * 9 + columnaCuadricula - 1;  //Calcula el índice mínimo en la columna
    let indices = [indiceMin, indiceMin+3, indiceMin+6, indiceMin+27, indiceMin+30, indiceMin+33, indiceMin+54, indiceMin+57, indiceMin+60];    //Crea el array de índices
    return [columna, indices];                          //Devuelve el número de columna y los índices de los otros elementos de la misma
}

function devuelveFila(indice){
    let infoCuadricula = devuelveCuadricula(indice);    //Calcula la información de la cuadrícula
    let deltaIndice = indice - infoCuadricula[1][0];    //Calcula la diferencia entre el índice y el índice mínimo de la cuadrícula (corresponde al índice de los elementos en la cuadrícula) 
    let filaCuadricula = Math.floor(deltaIndice / 3) + 1;   //Calcula la fila del elemento en la cuadrícula
    let offsetFila = Math.floor((infoCuadricula[0] - 1) / 3) * 3;   //Calcula el número de filas que hay antes de la cuadrícula
    let fila = offsetFila + filaCuadricula;             //Calcula el número de la fila del elemento en el tablero
    let indiceMin = offsetFila * 9 + (filaCuadricula - 1) * 3;  //Calcula el índice mínimo en la fila
    let indices = [indiceMin, indiceMin+1, indiceMin+2, indiceMin+9, indiceMin+10, indiceMin+11, indiceMin+18, indiceMin+19, indiceMin+20]; //Crea el array de índices
    return [fila, indices];                             //Devuelve el número de filaa y los índices de los otros elementos de la misma
}

// Función que a partir del elemento devuelve su índice
function devuelveIndice(elemento){
    let indice = (elemento.dataset.cuad - 1) * 9;
    indice += ((elemento.dataset.row - 1) % 3) * 3;
    indice += (elemento.dataset.col - 1) % 3;
    return indice;
}

// Función que a partir de un array de sudoku de 9 elementos, que a su vez son arrays de 9 elementos con los valores de las celda de la cuadrícula, devuelve un array de una dimensión con 81 elementos con los valores de todas las celdas del tablero
function aplanaArray(array2d){
    return array2d.flat();
}

// Función que procesa un array de un número arbitrario de elementos devolviendo un array de arrays de un número de elementos igual al proporcionado como segundo parámetro, conservando el orden yh rellenando el último (elmento) array con ceros, si hace falta (Si sólo se pasa el primer parámetro, devuelve un array de arrays de 9 elementos cada uno) 
function restableceArray2d(array1d,numElemInt=9){
    return array1d.reduce((array2d,elem)=>{
        for (let ae = 1; ae <= Math.ceil(array1d.length/numElemInt); ae++){
            let elemento1d = [];
            for (let ai = 1; ai <= numElemInt; ai++) {
                elemento1d.push(array1d.shift()||0);
            }
            array2d.push(elemento1d);
        }
        return array2d;
    },[])
}

// Exportamos todas las funciones del módulo
export {devuelveCuadricula, devuelveColumna, devuelveFila, devuelveIndice, aplanaArray, restableceArray2d};