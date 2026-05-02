<template>    
  <div class="home-container">
    <img class="piece piece-top-left" src="/images/Herramienta3.png" alt="" />
    <img class="piece piece-top-right" src="/images/Herramienta4.png" alt="" />
    <img class="piece piece-bottom-left" src="/images/Herramienta1.png" alt="" />
    <img class="piece piece-bottom-right" src="/images/Herramienta2.png" alt="" />
    <div class="contenido">
      <img src="/images/titulohome.png" alt="Título del juego" class="titulo-img" />
      <div class="botones">
        <button class="btn btn-blanco" @click="iniciarJuego">
          Comenzar
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    iniciarJuego() {
      this.$router.push(`/memoria`)
    }
  }
}
</script>

<style scoped>
.home-container {
  position: relative;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  background-image: url('/images/fondo1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
}

.contenido {
  width: 100%;
  max-width: 45vh;
  padding: 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 38vh;
  box-sizing: border-box;
  text-align: center;
  color: white;  
}

.titulo-img {
  width: 100%;
}

.botones {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center; /* Alinea al centro */
  font-family: 'GilroyBold', sans-serif;
}

.btn {
  width: 100%;           /* Que no se limite al 100% del contenedor si este es pequeño */
  height: 10rem;         /* Fija la altura */
  font-size: 3.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'GilroyBold', sans-serif;
}

.btn-blanco {
  background-color: #fff;
  color: black;
}

.piece {
  position: absolute;
  z-index: 2;
  object-fit: contain;
  pointer-events: none;
}

.piece-top-left {
  width: 40%;
  top: 10%;
  left: 17%;
}

.piece-top-right {
  width: 45%;
  top: -7%;
  right: -10%;
  filter: blur(2px);
}

.piece-bottom-left {
  width: 45%;
  bottom: 0%;
  left: 1%;
  filter: blur(2px);
}

.piece-bottom-right {
  width: 30%;
  bottom: 13%;
  right: 12%;
}


/* Responsivo para celulares pequeños */
@media (max-width: 480px) {
  .contenido {
    height: 80vh;
    padding: 1.5rem 1rem;
    margin-top: 0vh;
  }

  .titulo-img {
    max-width: 90%;
  }

  .texto h2 {
    font-size: 2rem;
  }

  .texto p {
    font-size: 1rem;
  }

  .botones {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center; /* Alinea al centro */
  }

  .btn {
    width: 100%;           /* Que no se limite al 100% del contenedor si este es pequeño */
    height: 4rem;         /* Fija la altura */
    font-size: 0.95rem;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 1rem;
  }

  .piece-top-left {
    width: 125px;
    top: 118px;
    left: 54px;
  }

  .piece-top-right {
    width: 105px;
    right: -20px;
  }

  .piece-bottom-left {
    width: 120px;
  }

  .piece-bottom-right {
    width: 86px;
    right: 36px;
  }
}
</style>
