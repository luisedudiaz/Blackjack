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
    <div class="d-flex justify-content-center">
      <b-row class="m-5">
        <b-col>
          <div>
            <b-button to="/salas">LEFT ROOM</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="m-5">
            <b-card style="max-width: 25rem;" class="m-2">
              <h3 class="text-center">Juego</h3>
              <!--<hr class="my-4" />-->
              <!--<p>Mazo del dealer: {{ state.game.players }}</p>-->
              <hr class="my-2" />
              <p>Turno: {{ state.turn.name }}</p>
              <hr class="my-2" />
              <p>Jugadores: {{ state.players.length - 1 }}</p>
              <hr class="my-2" />
              <div v-if="state.winner" class="text-center">
                <p>Winner: {{ state.winner }}</p>
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
              <p>Tu mazo: {{ getPlayerDeck() }}</p>
              <br />
              <div v-if="!lost">
                <div v-if="state.turn.name === state.player.name">
                  <b-button
                    variant="primary"
                    @click="getCardAndUpdateDealerDeck"
                  >
                    Pedir carta
                  </b-button>
                  <b-button
                    variant="success"
                    @click="
                      changeTurn({
                        id: $store.state.player._id,
                        game: $route.params.id
                      })
                    "
                  >
                    Pasar
                  </b-button>
                </div>
                <div v-else class="text-center">
                  Espera a tu turno
                </div>
              </div>
              <div v-else class="text-center">
                <h5>Terminó el juego</h5>
                <b-button to="/salas">Salir</b-button>
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
        :fields="['jugador', 'cartas']"
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
      lost: false,
      cardsNames: [
        { name: 'As', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: '10', value: 10 },
        { name: 'Joto', value: 10 },
        { name: 'Qüina', value: 10 },
        { name: 'Rey', value: 10 }
      ]
    }
  },
  computed: {
    ...mapGetters(['state', 'allOtherPlayers', 'deck'])
  },
  beforeCreate() {
    this.$axios.get(`/games?id=${this.$route.params.id}`).then((res) => {
      this.setGame(res.data.game)
      this.joinRoom(this.$route.params.id)
    })
  },
  destroyed() {
    this.leftRoom(this.$store.state.player._id)
  },
  methods: {
    ...mapActions(['joinRoom', 'leftRoom', 'setGame', 'changeTurn', 'setDeck']),
    getCardAndUpdateDealerDeck() {
      const deck = this.$store.state.deck
      if (deck.length === 0) {
        this.lost = true
        return
      }
      this.$axios
        .$post('/cards/card', { deck })
        .then((data) => {
          const carta = data.response.card
          const newDeck = data.response.deck
          const gameId = this.$route.params.id
          const playerId = this.$store.state.player._id
          // eslint-disable-next-line no-unused-vars
          const body = {
            gameId,
            playerId,
            card: carta,
            deck: newDeck
          }
          this.setDeck(carta)
          this.$axios
            .post('/games/update', body)
            .then((res) => {
              console.log(res)
              this.setGame(res.data.game)
            })
            .catch((e) => console.log(e))
        })
        .catch((e) => {
          console.log(e)
          this.$bvToast.toast('Error al obtener carta', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 3000,
            appendToast: true
          })
        })
      this.checkPlayerDeck()
    },
    checkPlayerDeck() {
      const cards = this.$store.state.player.deck
      if (cards.length > 0) {
        let count = 0
        cards.forEach((card) => {
          count += card.value
        })
        if (count > 21) {
          this.lost = true
        }
      }
    },
    getPlayerDeck() {
      const cards = this.$store.state.player.deck
      if (cards.length > 0) {
        return Array.from(cards, (item) => this.cardsNames[item.value - 1].name)
      } else {
        return 'no tienes cartas aún'
      }
    }
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
