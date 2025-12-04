// En este módulo se encuentran todas las funciones de validación que se utilizan


// Función que comprueba si en el número de línea pasada por parámetro hay más de una vez el mismo número
// Devuelve true si la línea es correcta y false en caso contrario
function validaLinea(numero) {
    let resultado=true;
    let valoresLinea=[];
    let elementosLinea=document.querySelectorAll(`[data-row="${numero}"]`); //Seleccionamos todos los elementos con el número de línea proporcionado
    for (const element of elementosLinea) {                                 //y por cada uno de los elementos
        valoresLinea.push(parseInt(element.value)||0);                          //extraemos el campo valor y lo pasamos al array de valores
    }
    let valor;
    while(valoresLinea.length>1){                                           // Hasta que el array de valores tien más de un elemento
        let valor=valoresLinea.shift();                                         //Le quitamos el primer elemento y nos quedamos con él
        if ((valor)&&(valoresLinea.includes(valor))) {                          //Si el valor no es nulo o en blanco y está incluido en el array de valores que quedan
            return resultado=false;                                                 //Devolvemos un false en cuanto por lo menos un valor se repite
        }
    }
    return resultado;                                                       // Si no se ha devuelto un false, devolvemos un true
}

// Función que comprueba si en el número de columna pasada por parámetro hay más de una vez el mismo número
// Devuelve true si la columna es correcta y false en caso contrario
function validaColumna(numero) {
    let resultado=true;
    let valoresColumna=[];
    let elementosColumna=document.querySelectorAll(`[data-col="${numero}"]`);   //Seleccionamos todos los elementos con el número de línea proporcionado
    for (const element of elementosColumna) {                                   //y por cada uno de los elementos
        valoresColumna.push(parseInt(element.value)||0);                            //extraemos el campo valor y lo pasamos al array de valores
    }
    let valor;
    while(valoresColumna.length>1){                                             // Hasta que el array de valores tien más de un elemento
        let valor=valoresColumna.shift();                                           //Le quitamos el primer elemento y nos quedamos con él
        if ((valor)&&(valoresColumna.includes(valor))) {                            //Si el valor no es nulo o en blanco y está incluido en el array de valores que quedan
            return resultado=false;                                                     //Devolvemos un false en cuanto por lo menos un valor se repite
        }
    }
    return resultado;                                                           // Si no se ha devuelto un false, devolvemos un true
}

// Función que comprueba si en el número de cuadricula pasada por parámetro hay más de una vez el mismo número
// Devuelve true si la cuadricula es correcta y false en caso contrario
function validaCuadricula(numero) {
    let resultado=true;
    let valoresCuadricula=[];
    let elementosCuadricula=document.querySelectorAll(`[data-cuad="${numero}"]`);   //Seleccionamos todos los elementos con el número de línea proporcionado
    for (const element of elementosCuadricula) {                                    //y por cada uno de los elementos
        valoresCuadricula.push(parseInt(element.value)||0);                             //extraemos el campo valor y lo pasamos al array de valores
    }
    let valor;
    while(valoresCuadricula.length>1){                                              // Hasta que el array de valores tien más de un elemento
        let valor=valoresCuadricula.shift();                                            //Le quitamos el primer elemento y nos quedamos con él
        if ((valor)&&(valoresCuadricula.includes(valor))) {                             //Si tiene valor y está incluido en el array de valores que quedan
            return resultado=false;                                                         //Devolvemos un false en cuanto por lo menos un valor se repite
        }
    }
    return resultado;                                                               // Si no se ha devuelto un false, devolvemos un true
}

// Función que valida todo el tablero
function validaTablero(){
    for (let i = 1; i <=9; i++){    // Para todos los valores entre 1 y 9
        if (!validaColumna(i)){         // Si la columna no es correcta
            return false;                   //Devolvemos un false
        }
        if (!validaLinea(i)){       // Si la línea no es correcta
            return false;               //Devolvemos un false
        }
        if (!validaCuadricula(i)){  // Si la línea no es correcta
            return false;               //Devolvemos un false
        }
    }
    return true;                    // Si no se ha devuelto un false, devolvemos un true
}

// Función que comprueba la entrada de teclas.
// Recibe el event.target como partámetro de entrada y devuelve un booleano
// Devulve true si la tecla es un número entre 1 y 9 o una tecla especial que no escribe nada (Tab, Backspace, flechas, etc...) o false en caso contrario
function compruebaInput(tecla){
    let keycodesPermitidos = [8,9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,44,45,46,91,92,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145,173,174,175,181,183]; //Declaramos un array de keyCodes de teclas especiales que no devuelven un carácter escrito
    if ((parseInt(tecla.key)>0&&parseInt(tecla.key)<=9)||keycodesPermitidos.includes(tecla.keyCode)){   //Si la tecla es un número entre 1 y 9 o una tecla especial
        return true;                                                                                        //Devolvemos true
    } else {
        return false;                                                                                       //En caso contrario devolvemos false
    }
}

// Función que comprueba si el tablero ha sido rellenado por completo y si es correcto
// Admite en HTMLCollection con los elemento del tablero como entrada y devuelve true si el tablero ha sido rellenado por completo y es correcto o false en caso contrario
function compruebaJuego(elementosCuadricula=document.querySelectorAll("[data-cuad]")){
    let arrayElementos = [...elementosCuadricula];              //Transformamos la HTMLCollection en array
    if(arrayElementos.every(elem=>elem.value!="")){             //Si el tablero ha sido rellenado por completo
        if (validaTablero()) {                                      //Si el tablero es correcto (no tiene repeticiones en líneas, columnas y cuadrículas)
            alert("El sudoku es correcto!");                            //Avisamos
            return true;                                                //Devolvemos true
        } else {                                                    //Si no
            alert("el sudoku no es correcto, por favor revíselo");      //Avisamos
            return false;                                               //Devolvemos false
        }
    } else {                                                    //Si el tablero no ha sido rellenado por completo
        return false;                                               //Devolvemos false
    }
}

// Exportamos todas las funciones para que se puedan importar y usar en otros módulos o ficheros 
export {validaLinea, validaColumna, validaCuadricula, validaTablero, compruebaInput, compruebaJuego};