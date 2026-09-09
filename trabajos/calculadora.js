class Calculadora {
    constructor() {
        this.resultado = 0;
    }

    sumar(n) {
        this.resultado = this.resultado + n;
        return this;
    }

    restar(n) {
        this.resultado = this.resultado - n;
        return this;
    }

    multiplicar(n) {
        this.resultado = this.resultado * n;
        return this;
    }

    dividir(n) {
        if (n === 0) {
            console.log("Error: no se puede dividir por cero");
            return this;
        }

        this.resultado = this.resultado / n;
        return this;
    }

    reset() {
        this.resultado = 0;
        return this;
    }

    mostrar() {
        console.log(`Resultado: ${this.resultado}`);
        return this;
    }
}

const calc = new Calculadora();

calc.sumar(5).multiplicar(2).mostrar();