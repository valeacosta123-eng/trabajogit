class Mascota {
    constructor(nombre, tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.energia = 100;
    }

    jugar() {
        this.energia = this.energia - 20;

        if (this.energia < 0) {
            this.energia = 0;
        }
    }

    comer() {
        this.energia = this.energia + 10;

        if (this.energia > 100) {
            this.energia = 100;
        }
    }

    dormir() {
        this.energia = 100;
    }

    estado() {
        console.log(`${this.nombre} tiene ${this.energia} de energía`);
    }
}

const mascota1 = new Mascota("Milo", "perro");
const mascota2 = new Mascota("Luna", "gato");

mascota1.estado();

mascota1.jugar();
mascota1.estado();

mascota1.comer();
mascota1.estado();

mascota1.dormir();
mascota1.estado();

mascota2.estado();