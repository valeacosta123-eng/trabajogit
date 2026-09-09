class Tarea {
    constructor(id, titulo, descripcion, prioridad = "media", fechaLimite = null) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad.toLowerCase(); 
        this.completada = false;
        this.fechaCreacion = new Date();
        this.fechaLimite = fechaLimite ? new Date(fechaLimite) : null;
    }

    completar() {
        this.completada = true;
    }

    editar(nuevosDatos) {
        if (nuevosDatos.titulo) this.titulo = nuevosDatos.titulo;
        if (nuevosDatos.descripcion) this.descripcion = nuevosDatos.descripcion;
        if (nuevosDatos.prioridad) this.prioridad = nuevosDatos.prioridad;
        if (nuevosDatos.fechaLimite) this.fechaLimite = new Date(nuevosDatos.fechaLimite);
    }

    getInfo() {
        const estado = this.completada ? " Completada" : " Pendiente";
        return `[ID: ${this.id}] [${this.prioridad.toUpperCase()}] ${this.titulo}: ${this.descripcion} | Estado: ${estado}`;
    }
}

class GestorTareas {
    constructor() {
        this.tareas = [];
    }

    agregar(titulo, descripcion, prioridad, fechaLimite) {
        const id = Date.now().toString();
        const nuevaTarea = new Tarea(id, titulo, descripcion, prioridad, fechaLimite);
        this.tareas.push(nuevaTarea);
        return nuevaTarea;
    }

    eliminar(id) {
        const longitudInicial = this.tareas.length;
        this.tareas = this.tareas.filter(t => t.id !== id);
        return this.tareas.length < longitudInicial;
    }

    completarTarea(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completar();
            return true;
        }
        return false;
    }

    filtrarPorPrioridad(prioridad) {
        return this.tareas.filter(t => t.prioridad === prioridad.toLowerCase());
    }

    filtrarCompletadas() {
        return this.tareas.filter(t => t.completada);
    }

    filtrarPendientes() {
        return this.tareas.filter(t => !t.completada);
    }

    mostrarTodas() {
        console.log("\n=== LISTA DE TAREAS ===");
        if (this.tareas.length === 0) {
            console.log("No hay tareas registradas.");
            return;
        }
        this.tareas.forEach(t => console.log(t.getInfo()));
    }
}
