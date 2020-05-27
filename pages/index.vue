<template>
  <div class="container">
    <div>
      <h1 class="title">
        Blackjack Game
      </h1>
      <div class="links">
        <NuxtLink class="button--green" to="/salas">
          Entrar Sala
        </NuxtLink>
        <NuxtLink class="button--grey" to="/nuevo">
          Crear Sala
        </NuxtLink>
        <b-button variant="outline-success">
          Login
        </b-button>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@font-face {
  font-family: Cinzel;
  src: url('~assets/Cinzel-Black.ttf');
}

.title {
  font-family: Cinzel;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
