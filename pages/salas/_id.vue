<template>
  <div class="background">
    <b-navbar type="dark" variant="dark" align="center" style="height:80px;">
      <b-container>
        <b-col align-self="start"></b-col>
        <b-col align-self="center">
          <b-navbar-brand tag="h1" class="mb-0">
            Game id: {{ $route.params.id }}
          </b-navbar-brand>
        </b-col>
        <b-col align-self="end"></b-col>
      </b-container>
    </b-navbar>
    <b-container class="m-5">
      <b-button to="/salas">LEFT ROOM</b-button>
    </b-container>
    <div class="d-flex justify-content-center">
      <b-row>
        <b-col>
          <div class="m-5">
            <b-card style="max-width: 25rem;" class="m-2">
              <h3 class="text-center">Juego</h3>
              <hr class="my-4" />
              <p>Mazo del dealer: {{ state.game.players }}</p>
              <hr class="my-2" />
              <p>Turno: {{ state.game.turn.name }}</p>
              <hr class="my-2" />
              <p>Jugadores: {{ state.game.players.length }}</p>
              <hr class="my-2" />
              <div v-if="state.game.winner" class="text-center">
                <p>Winner: {{ state.game.winner }}</p>
                <p>El juego terminó</p>
              </div>
              <p v-else>El juego continúa en curso</p>
            </b-card>
          </div>
        </b-col>
        <b-col>
          <div class="m-5">
            <b-card style="max-width: 25rem;" class="m-2">
              <h5 class="text-center">{{ state.player.name }}</h5>
              <hr class="my-4" />
              <p>Tu mazo: {{ state.player.deck }}</p>
              <br />
              <div v-if="state.game.turn.name == state.player.name">
                <b-button variant="primary" href="#">Pedir carta</b-button>
                <b-button variant="success" href="#">Pasar</b-button>
              </div>
              <div v-else class="text-center">
                Espera a tu turno
              </div>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </div>
    <div class="mx-5">
      <b-table
        dark
        striped
        hover
        responsive
        show-empty
        :items="allOtherPlayers"
        :fields="['name', 'deck']"
      ></b-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'IdVue',
  data() {
    return {
      players: []
    }
  },
  computed: {
    ...mapGetters(['state', 'allOtherPlayers'])
  },
  beforeCreate() {
    this.$axios.get(`/games?id=${this.$route.params.id}`).then((res) => {
      this.setGame(res.game)
      this.joinRoom(this.$route.params.id)
    })
  },
  destroyed() {
    this.leftRoom()
  },
  methods: {
    ...mapActions(['joinRoom', 'leftRoom', 'setGame'])
  }
}
</script>

<style>
.background {
  min-height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.3) 100%
    ),
    url('~assets/cover.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
}
</style>
