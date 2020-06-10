export const state = () => ({
  player: {},
  game: {},
  messages: [],
  rooms: []
})

export const getters = {
  // typingUsers: ({ users, user }) =>
  //   users.filter(({ typingStatus, id }) => typingStatus && user.id !== id),
  // typingStatus: ({ user }) => user.typingStatus
  state: (state) => state,
  allOtherPlayers: (state) => {
    return state.game.players.filter(
      (player) => player._id !== state.player._id
    )
  },
  rooms: (state) => state.rooms
}

export const mutations = {
  SET_PLAYER(state, player) {
    state.player = player
  },
  SET_GAME(state, game) {
    state.game = game
  },
  SET_ROOMS(state, rooms) {
    state.rooms = rooms
  },
  CLEAR(state) {
    state.player.deck = []
    state.player.isPlaying = false
    state.game = {}
  },
  SOCKET_newMessage(state, msg) {
    state.messages = msg
  },
  SOCKET_updateGame(state, game) {
    // console.log('updateGame')
    state.game = game
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
  leftRoom({ commit, dispatch }) {
    dispatch('socketEmit', {
      action: 'leftRoom'
    })
    commit('CLEAR')
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
