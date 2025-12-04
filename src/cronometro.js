// En este módulo se encuentra la clase Clock con sus propriedades y métodos


// Creamos una clase temporizador con sus propiedades y métodos
class Clock{
    #hrs;
    #min;
    #seg;
    #elem;
    #contar;
    // Los parámtros de entrada son el elemento en el cuál se visualiza el tiempo, las horas, minutos y segundos iniciales por si se quisiera iniciar una instancia que no empiece en 0
    constructor(elemento=document.getElementById("tiempoTimer"),horas=0,minutos=0,segundos=0){
        this.#hrs=horas;
        this.#min=minutos;
        this.#seg=segundos;
        this.#elem=elemento;
        this.actualizaTiempo();
    }
    // Método estático de la clase para transformar los números de horas minutos y segundos en un string con el tiempo
    static tiempoString(horas=0, minutos=0, segundos=0){
        // Si el número de las horas es menor que 10, añade un 0 delante
        let stringTiempo = horas<10?`0${horas}:`:`${horas}:`;
        // Si el número de los minutos es menor que 10, añade un 0 delante y lo concatena a las horas
        stringTiempo += minutos<10?`0${minutos}:`:`${minutos}:`;
        // Si el número de los segundos es menor que 10, añade un 0 delante y lo concatena a las horas y minutos
        stringTiempo += segundos<10?`0${segundos}`:`${segundos}`;
        return stringTiempo;
    }
    // Método para actualizar el tiempo en el elemento
    actualizaTiempo(){
        // Convertimos horas, minutos y segundos en un string
        let nuevoTiempo = Clock.tiempoString(this.#hrs, this.#min, this.#seg);
        this.#elem.textContent=nuevoTiempo;
    }

    // Método para iniciar a contar
    iniciar(){
        this.#contar = setInterval(()=>{
            // Si los segundos son menores que 59, añade un segundo
            if (this.#seg<59){
                ++this.#seg;
            } else {
                // Si no pone los segundos en 0 y añade un minuto
                this.#seg = 0;
                // Si los segundos son menores que 59, añade un segundo
                if (this.#min<59){
                    ++this.#min;
                } else {
                    // Si no pone los minutos en 0 y añade una hora
                    this.#min=0;
                    ++this.#hrs;
                }
            }
            // Actualiza el campo del tiempo
            this.actualizaTiempo();
        },1000);
    }

    // Método para pausar
    pausar(){
        // Si contar está definido entonces paramos
        if (this.#contar!=undefined){
            clearInterval(this.#contar);
        }
    }

    //Método para configurar el reloj
    configurar(horas=0,minutos=0,segundos=0){
        this.#hrs=horas;
        this.#min=minutos;
        this.#seg=segundos;
    }

    // Método para reiniciar el temporizador
    // Éste método acepta un parámetro booleano que define si tiene que pausar, además de reiniciar el contador
    reiniciar(conParada=false){
        // Si conParada está es true, para el contador
        if (conParada) {
            this.pausar();
        } 
        // Pone las variables de horas, minutos y segundos en 0
        this.configurar();
        // Actualiza el tiempo en el elemento
        this.actualizaTiempo();
    }
}

// Exportamos la clase Clocko
export {Clock};