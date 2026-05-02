<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-box">
      <img
        src="/images/ganaste.png"
        alt="icono popup"
        class="popup-icono"
      />

      <h2 class="titulo-popup">
        ¡GANASTE!
      </h2>

      <div class="contenido-popup">
        <div>
          <p>¡Felicidades! Tenés una memoria increíble. Encontraste todas las parejas.</p>
        </div>      
      </div>

      <button class="boton-iniciar" @click="iniciar">Aceptar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  emits: ['iniciar'],
  methods: {
    iniciar() {
      this.$emit('iniciar');
    }
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.popup-box {
  position: relative;
  background: #ffffff;
  border-radius: 2vh;
  padding: 3vh 2.5vh;
  width: 55%;
  max-width: 60vw; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.popup-box h2 {
  font-size: 4.3vh;
  color: #E30613;
  font-weight: 900; 
  line-height: 1.2;
  margin-bottom: 2vh;
  text-transform: uppercase;
  text-shadow:
    0.5px 0 #E30613,
    -0.5px 0 #E30613,
    0 0.5px #E30613,
    0 -0.5px #E30613;
}

.titulo-popup {
  font-size: 2.8vh; /* más pequeño */
  color: #E30613;
  font-weight: bold;
  margin-bottom: 2vh;
  text-transform: uppercase;
  font-family: 'GilroyBlack', sans-serif;
}

.contenido-popup {
  font-size: 1.6vh; /* más pequeño */
  color: #000;
  text-align: left;
  margin-bottom: 2vh;
}

.contenido-popup ol {
  padding-left: 1.4em;
  margin: 1vh 0;
}

.mensaje-final {
  font-weight: bold;
  text-align: center;
  font-size: 1.7vh; /* más pequeño */
  margin-top: 2vh;
}

.boton-iniciar {
  background-color: #E30613;
  color: #FFF;
  border: none;
  padding: 1.4vh 2.8vh;
  border-radius: 1vh;
  font-size: 2vh; /* más pequeño */
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease;
  margin-top: 2vh;
  font-family: 'GilroyBold', sans-serif;
}

.boton-iniciar:hover {
  background-color: #E30613;
}

.popup-icono {
  object-fit: contain;
  margin: 0 auto 0.5svh;
  display: block;
  animation: animacionHamburguesa 1.2s infinite ease-in-out;}

@keyframes animacionHamburguesa {
  0% {
    transform: scale(1) rotate(0deg) translate(0, 0);
    filter: brightness(1);
  }
  25% {
    transform: scale(1.03) rotate(1deg) translate(-1px, 1px);
    filter: brightness(1.1);
  }
  50% {
    transform: scale(1.05) rotate(-1deg) translate(1px, -1px);
    filter: brightness(1.2);
  }
  75% {
    transform: scale(1.03) rotate(1deg) translate(-1px, 0px);
    filter: brightness(1.1);
  }
  100% {
    transform: scale(1) rotate(0deg) translate(0, 0);
    filter: brightness(1);
  }
}
.contenido-popup {
  font-size: 1.6vh;
  color: #000;
  text-align: center; /* ← centramos los párrafos */
  margin-bottom: 2vh;
  margin-top: 4vh;  
}

</style>