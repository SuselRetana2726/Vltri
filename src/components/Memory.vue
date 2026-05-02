<template>
  <div class="juego-memoria">
    <img src="/images/fondo1.png" alt="Fondo" class="fondo" />

    <div class="contenido">
      <h2>ENCUENTRA LA <br>PAREJA</h2>

      <div class="temporizador">
        <img src="/icons/reloj.svg" alt="Reloj" class="icono-reloj" />
        <span>{{ tiempo }}</span>
      </div>
      <div class="area-juego">
        <div class="tablero">
          <div v-for="(carta, index) in cartas" :key="index" class="carta" @click="voltearCarta(index)"
            :class="{ mezclando: mezclando }" :style="mezclando ? `animation-delay: ${index * 0.05}s` : ''">
            <div class="card-inner" :class="{ girada: carta.volteada || carta.encontrada }">
              <div class="card-front">
                <img src="/images/card.png" alt="Reverso" />
              </div>
              <div class="card-back">
                <img :src="getImagenCarta(carta.valor)" :alt="carta.valor" />
              </div>
            </div>
          </div>
        </div>

        <div class="acciones">
          <button @click="home" class="boton-icono boton-home">
            <img src="/icons/casa.svg" alt="Inicio" />
          </button>
        </div>
      </div>
    </div>

    <PopUpGanaste
      :visible="ganaste" 
      @iniciar="aceptarGanaste"
    />
    <PopUpPerdiste
      :visible="perdiste" 
      @cerrar="salirPerdiste"
      @iniciar="reiniciarPerdiste"
    />
  </div>



</template>

<script>
import PopUpGanaste from '../components/PopUpWin.vue'
import PopUpPerdiste from '../components/PopUpLose.vue'

export default {
  components: {
        PopUpGanaste,
        PopUpPerdiste,
    },
  data() {
    return {
      cartas: [],
      primeraCarta: null,
      segundaCarta: null,
      bloqueo: false,
      tiempo: 30,
      temporizador: null,
      ganaste: false,
      perdiste: false,
      mezclando: false,
      mostrarPopup: false,
    };
  },
  created() {
    this.reiniciarJuego();
  },
  methods: {
    getImagenCarta(valor) {
      return `${import.meta.env.BASE_URL}images/${valor}.png`;
    },
    aceptarGanaste() {            
            this.ganaste = false
            this.$router.push('/')
        },
    home(){this.$router.push('/')},
    cerrarPopup() {
      this.mostrarPopup = false
    },
    reiniciarPerdiste() {
      this.perdiste = false
      this.reiniciarJuego();
    },
    salirPerdiste() {
      this.perdiste = false
      this.$router.push('/')
    },
    iniciarJuego() {
      this.mostrarPopup = false
      this.reiniciarJuego();
    },
    generarCartas() {
      const valoresBase = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6'];
      const valores = [...valoresBase, ...valoresBase];
      const mezcladas = valores
        .map(valor => ({ valor, volteada: false, encontrada: false }))
        .sort(() => 0.5 - Math.random());
      return mezcladas;
    },
    voltearCarta(index) {
      if (this.ganaste || this.perdiste) return;
      const carta = this.cartas[index];
      if (this.bloqueo || carta.volteada || carta.encontrada) return;

      carta.volteada = true;

      if (!this.primeraCarta) {
        this.primeraCarta = { carta, index };
      } else if (!this.segundaCarta) {
        this.segundaCarta = { carta, index };
        this.bloqueo = true;

        setTimeout(() => {
          const { carta: primera } = this.primeraCarta;
          const { carta: segunda } = this.segundaCarta;

          if (primera.valor === segunda.valor) {
            primera.encontrada = true;
            segunda.encontrada = true;
          } else {
            primera.volteada = false;
            segunda.volteada = false;
          }

          this.primeraCarta = null;
          this.segundaCarta = null;
          this.bloqueo = false;

          if (this.cartas.every(c => c.encontrada)) {
            this.ganaste = true;
            clearInterval(this.temporizador);
          }
        }, 1000);
      }
    },
    iniciarTemporizador() {
      this.temporizador = setInterval(() => {
        if (this.tiempo > 0) {
          this.tiempo--;
        } else {
          clearInterval(this.temporizador);
          this.perdiste = true;
        }
      }, 1000);
    },
    reiniciarJuego() {
      this.cartas = this.generarCartas();
      this.primeraCarta = null;
      this.segundaCarta = null;
      this.bloqueo = true;
      this.tiempo = 30;
      this.ganaste = false;
      this.perdiste = false;
      clearInterval(this.temporizador);

      this.mezclando = true;
      setTimeout(() => {
        this.mezclando = false;
        this.bloqueo = false;
        this.iniciarTemporizador();
      }, 1500);
    }
  }
};
</script>
<style scoped>
.juego-memoria {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.fondo {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.contenido {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 2vh 4vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  text-align: center;
  color: white;
}

.contenido h2 {
  margin-top: 2vh;
  font-size: 6vh;
  margin-bottom: 2vh;
  font-family: 'GilroyBlack', sans-serif;
}

.temporizador {
  background: #000;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 1vh;
  padding: 1vh 2vh;
  border-radius: 1vh;
  font-size: 3vh;
  margin-bottom: 2vh;
  align-self: center;
  font-family: 'GilroyBlack', sans-serif;
}

.temporizador span {
  font-family: 'GilroyBold', sans-serif;
}

.icono-reloj {
  width: 3.5vh;
  height: 3.5vh;
  filter: invert(1);
  font-family: 'GilroyBlack', sans-serif;
}

.tablero {
  margin-top: 3vh;
  display: grid;
  gap: 0.8vh;
  grid-template-columns: repeat(3, 1fr);
  width: 70vw;
  flex-grow: 1;
  max-height: 50vh;
}

.carta {
  perspective: 1000px;
  width: 100%;
  aspect-ratio: 1/1;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
}

.card-inner.girada {
  transform: rotateY(180deg);
}

.card-inner.girada .card-back {
  background-color: white;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 1vh;
}

.card-front img,
.card-back img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 1vh;
}

.card-back {
  transform: rotateY(180deg);
}

.mezclando {
  animation: mezclar 0.6s ease-in-out forwards;
}

@keyframes mezclar {
  0% {
    transform: translateY(0) scale(1);
  }

  30% {
    transform: translateY(-2vh) scale(1.1) rotate(5deg);
  }

  60% {
    transform: translateY(2vh) scale(0.9) rotate(-5deg);
  }

  100% {
    transform: translateY(0) scale(1);
  }
}

.area-juego {
  width: 70vw;
  /* igual que el tablero */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2vh;
}


/* Botones fijos abajo */
.acciones {
  display: flex;
  justify-content: flex-end;
  width: 70vw;
  margin: 5vh auto 0;
}

.boton-icono {
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 8vh;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.boton-icono:hover {
  transform: scale(1.1);
}

.boton-icono img {
  width: 4vh;
  height: 4vh;
  object-fit: contain;
}

/* 📱 Adaptación a pantallas pequeñas */
@media (max-width: 768px) {
  .contenido h2 {
    font-size: 3vh;
  }

  .temporizador {
    font-size: 2.5vh;
  }

  .icono-reloj {
    width: 2.5vh;
    height: 2.5vh;
  }

  .tablero {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5vh;
  }

  .acciones {
    gap: 4vw;
  }

  .boton-icono {
    width: 7vh;
    height: 7vh;
  }

  .boton-icono img {
    width: 3.5vh;
    height: 3.5vh;
  }
}
</style>
