class Producto {
    constructor(id, nombre, precio, stock, categoria, descuento = 0) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.descuento = descuento; 
    }

    getPrecioConDescuento() {
        return this.precio * (1 - this.descuento / 100);
    }
}

class Cliente {
    constructor(id, nombre, email, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.direccion = direccion;
        this.historialCompras = [];
    }
}

class ItemCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }

    get subtotal() {
        return this.producto.getPrecioConDescuento() * this.cantidad;
    }
}

class Orden {
    constructor(id, cliente, items, subtotal, envio, impuestos, total) {
        this.id = id;
        this.cliente = cliente;
        this.items = items;
        this.subtotal = subtotal;
        this.envio = envio;
        this.impuestos = impuestos;
        this.total = total;
        this.fecha = new Date();
    }
}

class Carrito {
    constructor(cliente) {
        this.cliente = cliente;
        this.items = []; 
    }

    agregarProducto(producto, cantidad) {
        if (producto.stock < cantidad) {
            console.log(`Stock insuficiente para ${producto.nombre}. Stock disponible: ${producto.stock}`);
            return false;
        }

        const itemExistente = this.items.find(item => item.producto.id === producto.id);
        if (itemExistente) {
            if (producto.stock < itemExistente.cantidad + cantidad) {
                console.log(`No hay suficiente stock adicional para ${producto.nombre}.`);
                return false;
            }
            itemExistente.cantidad += cantidad;
        } else {
            this.items.push(new ItemCarrito(producto, cantidad));
        }

        console.log(`Agregado: ${cantidad}x ${producto.nombre} al carrito.`);
        return true;
    }

    quitarProducto(productoId) {
        this.items = this.items.filter(item => item.producto.id !== productoId);
    }

    calcularTotales() {
        const subtotal = this.items.reduce((acc, item) => acc + item.subtotal, 0);
        const envio = (subtotal < 5000 && subtotal > 0) ? 500 : 0;
        const impuestos = subtotal * 0.21; // IVA 21%
        const total = subtotal + envio + impuestos;

        return { subtotal, envio, impuestos, total };
    }

    finalizarCompra() {
        if (this.items.length === 0) {
            console.log("El carrito está vacío.");
            return null;
        }

        this.items.forEach(item => {
            item.producto.stock -= item.cantidad;
        });

        const { subtotal, envio, impuestos, total } = this.calcularTotales();
        const numOrden = "ORD-" + Date.now();

        const orden = new Orden(numOrden, this.cliente, [...this.items], subtotal, envio, impuestos, total);
        
        this.cliente.historialCompras.push(orden);
        
        this.items = [];

        console.log(`\n¡Compra realizada con éxito! Número de orden: ${numOrden}`);
        return orden;
    }
}