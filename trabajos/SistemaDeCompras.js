class Libro {
    constructor(id, titulo, autor, anio) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.prestado = false;      // Inicia no prestado
        this.prestadoA = null;      // Nadie lo tiene prestado al inicio
    }

    prestar(persona) {
        if (this.prestado) {
            console.log(`El libro "${this.titulo}" ya está prestado a ${this.prestadoA}.`);
            return false;
        }
        this.prestado = true;
        this.prestadoA = persona;
        console.log(`El libro "${this.titulo}" fue prestado a ${persona}.`);
        return true;
    }

    devolver() {
        if (!this.prestado) {
            console.log(`El libro "${this.titulo}" no está prestado actualmente.`);
            return false;
        }
        console.log(`El libro "${this.titulo}" fue devuelto por ${this.prestadoA}.`);
        this.prestado = false;
        this.prestadoA = null;
        return true;
    }

    getInfo() {
        const estado = this.prestado ? `Prestado a ${this.prestadoA}` : 'Disponible';
        return `[ID: ${this.id}] "${this.titulo}" - ${this.autor} (${this.anio}) \vert{} Estado:${estado}`;
    }
}

class Biblioteca {
    constructor() {
        this.libros = []; // Array que guardará objetos de la clase Libro
    }

    agregarLibro(titulo, autor, anio) {
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5); // ID único
        const nuevoLibro = new Libro(id, titulo, autor, anio);
        this.libros.push(nuevoLibro);
        console.log(`Libro agregado exitosamente con ID: ${id}`);
        return nuevoLibro;
    }

    buscarPorId(id) {
        return this.libros.find(libro => libro.id === id);
    }

    prestarLibro(id, persona) {
        const libro = this.buscarPorId(id);
        if (libro) {
            return libro.prestar(persona);
        }
        console.log("Error: Libro no encontrado.");
        return false;
    }

    devolverLibro(id) {
        const libro = this.buscarPorId(id);
        if (libro) {
            return libro.devolver();
        }
        console.log("Error: Libro no encontrado.");
        return false;
    }

    mostrarCatalogo() {
        console.log("\n=== CATÁLOGO DE LA BIBLIOTECA ===");
        if (this.libros.length === 0) {
            console.log("La biblioteca está vacía.");
            return;
        }
        this.libros.forEach(libro => console.log(libro.getInfo()));
    }

    getEstadisticas() {
        const total = this.libros.length;
        const prestados = this.libros.filter(l => l.prestado).length;
        const disponibles = total - prestados;

        return {
            totalLibros: total,
            librosPrestados: prestados,
            librosDisponibles: disponibles
        };
    }
}