class Circulo {
    constructor(canvasAncho, canvasAlto, nivel) {
        this.radio = Math.max(15, 35 - nivel * 2);
        this.x = Math.random() * (canvasAncho - this.radio * 2) + this.radio;
        this.y = Math.random() * (canvasAlto - this.radio * 2) + this.radio;
        this.color = `hsl(${Math.random() * 360}, 80%, 50%)`;

        this.tiempoMaximo = Math.max(40, 120 - nivel * 10); 
        this.tiempoVida = 0;
        this.destruido = false;
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        ctx.closePath();
    }

    actualizar() {
        this.tiempoVida++;
        return this.tiempoVida >= this.tiempoMaximo; 
    }

    esImpacto(clickX, clickY) {
        const dx = clickX - this.x;
        const dy = clickY - this.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        return distancia <= this.radio;
    }
}

class Jugador {
    constructor() {
        this.puntos = 0;
        this.vidas = 3;
        this.aciertos = 0;
        this.fallos = 0;
    }

    resetear() {
        this.puntos = 0;
        this.vidas = 3;
        this.aciertos = 0;
        this.fallos = 0;
    }
}

class Juego {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.jugador = new Jugador();
        this.circulos = [];
        this.nivel = 1;
        this.frameContador = 0;
        this.frecuenciaAparicion = 60; 
        this.ejecutando = false;

        
        this.canvas.addEventListener('click', (e) => this.manejadorClic(e));
    }

    iniciar() {
        this.jugador.resetear();
        this.circulos = [];
        this.nivel = 1;
        this.ejecutando = true;
        this.buclePrincipal();
    }

    manejadorClic(evento) {
        if (!this.ejecutando) return;

        const rect = this.canvas.getBoundingClientRect();
        const clickX = evento.clientX - rect.left;
        const clickY = evento.clientY - rect.top;

        let acertado = false;

        for (let i = this.circulos.length - 1; i >= 0; i--) {
            if (this.circulos[i].esImpacto(clickX, clickY)) {
                this.circulos.splice(i, 1);
                this.jugador.puntos += 100 * this.nivel;
                this.jugador.aciertos++;
                acertado = true;
                
                
                if (this.jugador.aciertos % 5 === 0) {
                    this.nivel++;
                    this.frecuenciaAparicion = Math.max(20, 60 - this.nivel * 5);
                }
                break;
            }
        }

        if (!acertado) {
            this.jugador.fallos++;
        }
    }

    actualizar() {
        this.frameContador++;

        if (this.frameContador % this.frecuenciaAparicion === 0) {
            this.circulos.push(new Circulo(this.canvas.width, this.canvas.height, this.nivel));
        }

        
        for (let i = this.circulos.length - 1; i >= 0; i--) {
            const expiro = this.circulos[i].actualizar();
            if (expiro) {
                this.circulos.splice(i, 1);
                this.jugador.vidas--;
                
                if (this.jugador.vidas <= 0) {
                    this.ejecutando = false;
                    alert(`¡Juego Terminado! Puntuación final: ${this.jugador.puntos}`);
                }
            }
        }
    }

    renderizar() {
        // Limpiar el canvas en cada frame
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar círculos
        this.circulos.forEach(c => c.dibujar(this.ctx));

        // Dibujar HUD (Interfaz de información)
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "16px Arial";
        this.ctx.fillText(`Puntos: ${this.jugador.puntos}`, 10, 25);
        this.ctx.fillText(`Vidas: ${.repeat(Math.max(0, this.jugador.vidas))}`, 10, 50);
        this.ctx.fillText(`Nivel: ${this.nivel}`, 10, 75);
    }

    buclePrincipal() {
        if (!this.ejecutando) return;

        this.actualizar();
        this.renderizar();

        requestAnimationFrame(() => this.buclePrincipal());
    }
}