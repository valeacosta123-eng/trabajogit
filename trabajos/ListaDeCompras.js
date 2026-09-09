class ListaCompras {
    constructor() {
        this.items = [];
    }

    agregarItem(nombre, cantidad, precio) {
        const item = {
            nombre: nombre,
            cantidad: cantidad,
            precioUnitario: precio
        };

        this.items.push(item);
    }

    eliminarItem(nombre) {
        const posicion = this.items.findIndex(item => item.nombre === nombre);

        if (posicion !== -1) {
            this.items.splice(posicion, 1);
            console.log("Item eliminado");
        } else {
            console.log("Item no encontrado");
        }
    }

    calcularTotal() {
        const total = this.items.reduce((suma, item) => {
            return suma + (item.cantidad * item.precioUnitario);
        }, 0);

        return total;
    }

    mostrarLista() {
        console.log("Lista de compras:");

        this.items.forEach(item => {
            console.log(`${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precioUnitario}`);
        });

        console.log(`Total: $${this.calcularTotal()}`);
    }

    buscarItem(nombre) {
        const item = this.items.find(item => item.nombre === nombre);

        if (item) {
            console.log(`Encontrado: ${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precioUnitario}`);
        } else {
            console.log("Item no encontrado");
        }
    }
}

const lista = new ListaCompras();

lista.agregarItem("Leche", 2, 1000);
lista.agregarItem("Pan", 1, 500);
lista.agregarItem("Galletas", 3, 800);

lista.mostrarLista();

lista.buscarItem("Pan");

lista.eliminarItem("Leche");

lista.mostrarLista();