class Persona {
    constructor(nombre, edad, ciudad) {
        this.nombre = nombre;
        this.edad = edad;
        this.ciudad = ciudad;
    }

    presentarse() {
        return `Hola, mi nombre es ${this.nombre}, tengo ${this.edad} años y vivo en ${this.ciudad}`;
    }
}

const persona1 = new Persona("Camila", 17, "Mendoza");
const persona2 = new Persona("Martina", 18, "Buenos Aires");
const persona3 = new Persona("Sofia", 17, "Cordoba");

console.log(persona1.presentarse());
console.log(persona2.presentarse());
console.log(persona3.presentarse());