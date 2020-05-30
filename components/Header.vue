<template>
  <div class="position-absolute m-3">
    <b-button v-b-toggle.sidebar class="bj-red" size="lg" variant="danger">
      <b-icon variant="light" scale="1.5" icon="gem"></b-icon>
    </b-button>
    <b-sidebar
      id="sidebar"
      :title="$auth.user ? $auth.user.name : ''"
      bg-variant="dark"
      shadow="sm"
      sidebar-class="border-right border-white"
      width="250px"
    >
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
          >
            <b-icon variant="light" icon="person-square"></b-icon>Cerrar Sesión
          </b-button>
        </div>
        <div v-else class="d-flex  text-light align-items-center px-3 py-2">
          <b-button
            class="bj-red"
            block
            variant="danger"
            @click="$auth.loginWith('google')"
          >
            <b-icon variant="light" icon="person-square"></b-icon>Iniciar Sesión
          </b-button>
        </div>
      </template>
      <div v-if="$auth.loggedIn">
        <b-button-group
          class="d-flex text-light align-items-center px-3 py-2"
          vertical
        >
          <b-button size="sm" class="mb-2" block to="/salas">
            <b-icon variant="light" icon="forward"></b-icon>
            Salas
          </b-button>
          <b-button size="sm" class="mb-2" lock to="/nuevo">
            <b-icon variant="light" icon="pencil-square"></b-icon>
            Crear Sala
          </b-button>
        </b-button-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import {
  BIcon,
  BIconGem,
  BIconForward,
  BIconPencilSquare,
  BIconPersonSquare
} from 'bootstrap-vue'
export default {
  components: {
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconGem,
    // eslint-disable-next-line vue/no-unused-components
    BIconForward,
    // eslint-disable-next-line vue/no-unused-components
    BIconPencilSquare,
    // eslint-disable-next-line vue/no-unused-components
    BIconPersonSquare
  }
}
</script>

<style>
#sidebar .b-sidebar-header {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.3) 100%
    ),
    url('~assets/menu-blackjack3.jpg');
  height: 50%;
}

#sidebar .b-sidebar-header button {
  color: #b30606;
}

#sidebar #sidebar___title__ {
  color: white;
}
</style>
