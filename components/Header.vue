<template>
  <div id="sidebar_button" class="position-absolute m-3">
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
      lazy
      backdrop
    >
      <template v-slot:footer>
        <div
          v-if="isLogged"
          class="d-flex  text-light align-items-center px-3 py-2"
        >
          <b-button class="bj-red" block variant="danger" @click="logout">
            <b-icon variant="light" icon="person-square"></b-icon> Cerrar Sesión
          </b-button>
        </div>
        <div v-else class="d-flex text-light align-items-center px-3 py-2">
          <b-button
            class="bj-red"
            block
            variant="danger"
            @click="$auth.loginWith('google')"
          >
            <b-icon variant="light" icon="person-square"></b-icon>
            Iniciar Sesión
          </b-button>
        </div>
      </template>
      <div v-if="isLogged">
        <div class="text-light text-center px-3 py-4">
          <h3>Blackjack</h3>
        </div>
        <b-button-group
          class="d-flex text-light align-items-center px-3 py-2"
          vertical
        >
          <b-button block to="/">
            <b-icon variant="light" icon="forward"></b-icon>
            Inicio
          </b-button>
          <b-button block to="/salas">
            <b-icon variant="light" icon="forward"></b-icon>
            Salas
          </b-button>
          <b-button class="mb-2" lock @click="createGame">
            <b-icon variant="light" icon="pencil-square"></b-icon>
            Crear Sala
          </b-button>
        </b-button-group>
      </div>
      <div v-else class="text-light">
        <div class="px-3 py-4">
          <h3>Bienvenido</h3>
        </div>
        <div class="px-3">
          <p>
            Es necesario iniciar sesión para poder crear salas y unirse a alguna
            sala.
          </p>
        </div>
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
import { mapActions } from 'vuex'
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
  },
  data() {
    return {
      isLogged: false
    }
  },
  created() {
    this.isLogged = this.$auth.loggedIn
    if (this.isLogged) {
      this.signIn(this.$auth.user.name)
    }
  },
  methods: {
    ...mapActions({
      setPlayer: 'setPlayer',
      setGame: 'setGame',
      createConnection: 'createConnection'
    }),
    signIn(name) {
      this.setPlayer(name)
    },
    makeToast(varian, titl, msg) {
      this.$bvToast.toast(msg, {
        title: titl,
        variant: varian,
        autoHideDelay: 3000,
        appendToast: true
      })
    },
    logout() {
      this.setPlayer({})
      this.isLogged = false
      this.makeToast('success', 'Éxito', 'Se cerró la sesión correctamente')
      this.$auth.logout()
    },
    createGame() {
      const body = { player: this.$store.state.player }
      this.$axios
        .$post('/games/', body)
        .then((data) => {
          if (data.status !== 200) {
            this.makeToast(
              'danger',
              'Error',
              'Ocurrió un error al crear la sala'
            )
          } else {
            this.$router.push(`/salas/${data.response.id}`)
            this.makeToast('success', 'Éxito', 'El juego se creó correctamente')
          }
        })
        .catch((err) => {
          this.makeToast('danger', 'Error', err)
        })
    }
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

#sidebar_button {
  z-index: 10;
}

#sidebar #sidebar___title__ {
  color: white;
}
</style>
