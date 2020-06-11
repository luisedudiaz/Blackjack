export const state = () => ({
  turnNumber: 0,
  player: {},
  players: [],
  turn: {},
  game: {},
  messages: [],
  rooms: [],
  winner: '',
  deck: []
})

export const getters = {
  state: (state) => state,
  allOtherPlayers: (state) => {
    const players = state.players.filter(
      (player) => player._id !== state.player._id
    )
    const other = []
    players.forEach((player) => {
      const i = []
      player.deck.forEach((card) => {
        i.push(card.value)
      })
      other.push({ jugador: player.name, cartas: i })
    })
    return other
  },
  rooms: (state) => state.rooms,
  deck: (state) => state.deck
}

export const mutations = {
  SET_PLAYER(state, player) {
    state.player = player
  },
  SET_DECK(state, card) {
    state.player.deck.push(card)
  },
  SET_GAME(state, game) {
    state.game = game
    state.deck = game.deck
  },
  SET_ROOMS(state, rooms) {
    state.rooms = rooms
  },
  CLEAR(state) {
    state.player.deck = []
    state.player.isPlaying = false
    state.game = {}
    state.players = []
    state.turn = {}
    state.winner = {}
    state.deck = []
    state.turnNumber = 0
  },
  SOCKET_newMessage(state, msg) {
    state.messages = msg
  },
  SOCKET_updateGame(state, game) {
    state.game = game
    state.players = game.players
    state.turn = game.turn
    state.winner = game.winner
  },
  SOCKET_updateTurn(state, { newIndex, game, g, turn }) {
    console.log(newIndex, game)
    state.turnNumber = newIndex
    state.game = g
    state.turn = turn
    this.$router.push(`/salas/${game}`)
  },
  SOCKET_updateTable(state, rooms) {
    state.rooms = rooms
  },
  SOCKET_redirect() {
    this.$router.push('/salas')
  },
  setTypingStatus(state, status) {
    state.user.typingStatus = status
  }
}

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload)
  },
  async setPlayer({ commit, state, dispatch }, name) {
    const { id } = await dispatch('socketEmit', {
      action: 'createConnection'
    })
    const body = { name, socket: id }
    this.$axios
      .$post('/players/', body)
      .then((data) => {
        // console.log(data)
        commit('SET_PLAYER', data.player)
        // this.makeToast('success', 'Éxito', 'El inicio de sesión fue exitoso')
      })
      .catch(() => {
        /* this.makeToast(
          'danger',
          'Error',
          'Ocurrió un error al iniciar sesión'
        ) */
      })
  },
  setGame({ commit }, game) {
    commit('SET_GAME', game)
  },
  setDeck({ commit }, card) {
    commit('SET_DECK', card)
  },
  clear({ commit }) {
    commit('CLEAR')
  },
  joinRoom({ dispatch, state }, idGame) {
    const player = state.player
    dispatch('socketEmit', {
      action: 'joinRoom',
      payload: { player, idGame }
    })
  },
  setRooms({ commit }) {
    this.$axios
      .$get('/games/all')
      .then((data) => {
        commit('SET_ROOMS', data.games)
        // this.makeToast('success', 'Éxito', 'El inicio de sesión fue exitoso')
      })
      .catch(() => {
        /* this.makeToast(
          'danger',
          'Error',
          'Ocurrió un error al iniciar sesión'
        ) */
      })
  },
  leftRoom({ commit, dispatch }, id) {
    dispatch('socketEmit', {
      action: 'leftRoom',
      payload: id
    })
    commit('CLEAR')
  },
  changeTurn({ dispatch, state }, { id, game }) {
    dispatch('socketEmit', {
      action: 'changeTurn',
      payload: {
        id,
        game,
        oldIndex: state.turnNumber,
        newIndex: state.turnNumber + 1
      }
    })
  },
  setTypingStatus({ dispatch, commit, state }, typingStatus) {
    commit('setTypingStatus', typingStatus)
    const { user } = state
    dispatch('socketEmit', {
      action: 'setTypingStatus',
      payload: user
    })
  },
  SOCKET_reconnect({ state, dispatch }) {
    const { user } = state
    if (Object.values(user).length) {
      const { id, ...userInfo } = user
      dispatch('createUser', userInfo)
      dispatch('joinRoom')
    }
  }
}
