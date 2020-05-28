<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header></b-button>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
    >
      <template v-slot:default="{ hide }">
        <div class="p-3">
          <h4 align="center" id="sidebar-no-header-title">Menú</h4>
          <div class="links">
            <NuxtLink class="button--green, button--blockvariant" to="/salas">
              <b-button block squared variant="outline-primary">
                Entrar a Sala
              </b-button>
            </NuxtLink>
            <NuxtLink class="button--grey, button--blockvariant" to="/nuevo">
              <b-button block squared variant="outline-primary">
                Crear una Sala
              </b-button>
            </NuxtLink>
            <b-button block squared variant="outline-success">
              Login
            </b-button>
          </div>
          <nav class="mb-3">
            <b-nav vertical> </b-nav>
          </nav>
          <b-button squared variant="danger" block @click="hide"
            >Salir</b-button
          >
        </div>
      </template>
    </b-sidebar>
    <div class="container">
      <div>
        <h1 class="title">
          Blackjack Game
        </h1>
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
  color: #b30606;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #000000;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
