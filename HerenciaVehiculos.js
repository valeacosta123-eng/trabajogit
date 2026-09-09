class Vehiculo {
    constructor(marca, modelo, anio, kilometraje) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.kilometraje = kilometraje;
    }

    conducir(km) {
        if (km > 0) {
            this.kilometraje += km;
            console.log(`Has conducido ${km} km. Kilometraje actual: ${this.kilometraje} km.`);
        }
    }

    mostrarInfo() {
        return `${this.marca} ${this.modelo} (${this.anio}) - ${this.kilometraje} km`;
    }
}

class Auto extends Vehiculo {
    constructor(marca, modelo, anio, kilometraje, puertas, tipo) {
        super(marca, modelo, anio, kilometraje); 
        this.puertas = puertas;
        this.tipo = tipo; 
    }

    abrirMaletero() {
        console.log(`Abriendo el maletero del ${this.marca} ${this.modelo}...`);
    }

    mostrarInfo() {
        return `${super.mostrarInfo()} | Tipo: Auto ${this.tipo} (${this.puertas} puertas)`;
    }
}

class Moto extends Vehiculo {
    constructor(marca, modelo, anio, kilometraje, cilindrada, tipo) {
        super(marca, modelo, anio, kilometraje);
        this.cilindrada = cilindrada; 
        this.tipo = tipo; 
    }

    hacerCaballito() {
        console.log(`¡La moto ${this.marca} ${this.modelo} está haciendo un caballito! 🏍️`);
    }

    mostrarInfo() {
        return `${super.mostrarInfo()} | Tipo: Moto ${this.tipo} (${this.cilindrada} cc)`;
    }
}

class Camion extends Vehiculo {
    constructor(marca, modelo, anio, kilometraje, capacidadCarga, ejes) {
        super(marca, modelo, anio, kilometraje);
        this.capacidadCarga = capacidadCarga; // En toneladas
        this.ejes = ejes;
    }

    cargar(toneladas) {
        if (toneladas <= this.capacidadCarga) {
            console.log(`Cargando ${toneladas} toneladas en el camión... Carga exitosa.`);
        } else {
            console.log(`Error: Carga supera la capacidad máxima de ${this.capacidadCarga} Ton.`);
        }
    }

    mostrarInfo() {
        return `${super.mostrarInfo()} | Camión de ${this.ejes} ejes (Capacidad: ${this.capacidadCarga} Ton)`;
    }
}
