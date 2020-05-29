<template>
  <div class="position-absolute m-3">
    <b-button v-b-toggle.sidebar class="bj-red" size="lg" variant="danger">
      <b-icon variant="light" scale="1.5" icon="list"></b-icon>
    </b-button>
    <b-sidebar id="sidebar">
      <template v-slot:footer>
        <div
          v-if="$auth.loggedIn"
          class="d-flex  text-light align-items-center px-3 py-2"
        >
          <b-button
            class="bj-red"
            block
            variant="danger"
            @click="$auth.logout()"
            >Cerrar Sesión</b-button
          >
        </div>
        <div v-else class="d-flex  text-light align-items-center px-3 py-2">
          <b-button
            class="bj-red"
            block
            variant="danger"
            @click="$auth.loginWith('google')"
            >Iniciar Sesión</b-button
          >
        </div>
      </template>
      <div v-if="$auth.loggedIn">
        <b-button-group
          class="d-flex text-light align-items-center px-3 py-2"
          vertical
        >
          <b-button block to="/salas">Salas</b-button>
          <b-button block to="/nuevo">Crear Sala</b-button>
        </b-button-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { BIcon, BIconList } from 'bootstrap-vue'
export default {
  components: {
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconList
  }
}
</script>

<style scoped></style>
