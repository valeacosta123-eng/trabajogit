class CuentaBancaria {
    #saldo;
    #pin;

    constructor(titular, saldoInicial, pin) {
        this.titular = titular;
        this.#saldo = saldoInicial >= 0 ? saldoInicial : 0;
        this.#pin = pin.toString(); 
    }

    #validarPin(pin) {
        return this.#pin === pin.toString();
    }

    depositar(cantidad, pin) {
        if (!this.#validarPin(pin)) {
            console.log("Error: PIN incorrecto.");
            return false;
        }
        if (cantidad <= 0) {
            console.log("Error: La cantidad a depositar debe ser mayor a 0.");
            return false;
        }

        this.#saldo += cantidad;
        console.log(`Depósito exitoso de $${cantidad}. Saldo actual: $${this.#saldo}`);
        return true;
    }

    retirar(cantidad, pin) {
        if (!this.#validarPin(pin)) {
            console.log("Error: PIN incorrecto.");
            return false;
        }
        if (cantidad <= 0) {
            console.log("Error: La cantidad a retirar debe ser mayor a 0.");
            return false;
        }
        if (cantidad > this.#saldo) {
            console.log("Error: Saldo insuficiente.");
            return false;
        }

        this.#saldo -= cantidad;
        console.log(`Retiro exitoso de $${cantidad}. Saldo restante: $${this.#saldo}`);
        return true;
    }

    consultarSaldo(pin) {
        if (!this.#validarPin(pin)) {
            console.log("Error: PIN incorrecto. Acceso denegado.");
            return null;
        }
        return this.#saldo;
    }
}
