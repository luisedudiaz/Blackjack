/*
export const state = () => ({
  player: {},
  game: {}
})

export const getters = {}

export const mutations = {
  SET_PLAYER(state, player) {
    state.player = player
  },
  SET_GAME(state, game) {
    state.game = game
  },
  SOCKET_newPlay(state, play) {},
  SOCKET_updateGame(state, game) {
    console.log('UPDATE_GAME')
    state.game = game
  },
  CLEAR_DATA(state) {
    state.player.deck = []
    state.player.isPlaying = false
    state.game = {}
  },
  SET_PLAYER_STATUS(state, status) {
    state.user.isPlaying = status
  }
}

export const actions = {
  setPlayer({ commit }, player) {
    commit('SET_PLAYER', player)
  },
  setGame({ commit }, game) {
    commit('SET_GAME', game)
  },
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload)
  },
  createPlay({ dispatch, state }, play) {},
  async joinRoom({ dispatch, state }, idGame) {
    console.log(state)
    const player = state.player[0]
    console.log(idGame)
    console.log(player)
    const { id } = await dispatch('socketEmit', {
      action: 'joinRoom',
      payload: { player, idGame }
    })
    console.log(id)
  },
  leftRoom({ commit, dispatch }) {
    dispatch('socketEmit', {
      action: 'leftChat',
      payload: null
    })
    commit('CLEAR_DATA')
  },
  setPlayerStatus({ dispatch, commit, state }, typingStatus) {
    commit('SET_PLAYER_STATUS', typingStatus)
    const { player } = state
    dispatch('socketEmit', {
      action: 'SET_PLAYER_STATUS',
      payload: player
    })
  },
  async createConnection({ commit, state, dispatch }) {
    const { id } = await dispatch('socketEmit', {
      action: 'createConnection'
    })
    const body = { player: state.player[0], socket: id }
    this.$axios
      .$post('/games/', body)
      .then((data) => {
        if (data.status !== 200) {
          /!* this.$bvToast.toast('Ocurrió un error al crear la sala', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 3000,
            appendToast: true
          }) *!/
        } else {
          commit('SET_GAME', { id: data.response.id })
          /!* this.$bvToast.toast('El juego se creó correctamente', {
            title: 'Éxito',
            variant: 'success',
            autoHideDelay: 3000,
            appendToast: true
          }) *!/
        }
      })
      .catch(() => {
        /!* this.$bvToast.toast(err, {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 3000,
          appendToast: true
        }) *!/
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
*/

export const state = () => ({
  player: {},
  messages: [],
  game: {}
})

export const getters = {
  typingUsers: ({ users, user }) =>
    users.filter(({ typingStatus, id }) => typingStatus && user.id !== id),
  typingStatus: ({ user }) => user.typingStatus
}

export const mutations = {
  SET_PLAYER(state, player) {
    state.player = player
  },
  SET_GAME(state, game) {
    state.game = game
  },
  setUser(state, user) {
    state.user = user
  },
  SOCKET_newMessage(state, msg) {
    state.messages = msg
  },
  SOCKET_updateGame(state, game) {
    console.log('updateGame')
    state.game = game
  },
  SOCKET_redirect() {
    this.$router.push('/salas')
  },
  CLEAR(state) {
    state.player = {}
    state.messages = []
    state.game = {}
  },
  setTypingStatus(state, status) {
    state.user.typingStatus = status
  }
}

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload)
  },
  setGame({ commit }, game) {
    commit('SET_GAME', game)
  },
  clear({ commit }) {
    commit('CLEAR')
  },
  createMessage({ dispatch, state }, msg) {
    const { user } = state
    const payload = {
      msg,
      id: user.id
    }

    dispatch('socketEmit', {
      action: 'createMessage',
      payload
    })
  },
  joinRoom({ dispatch, state }, idGame) {
    console.log(idGame)
    const player = state.player[0]
    dispatch('socketEmit', {
      action: 'joinRoom',
      payload: { player, idGame }
    })
  },
  leftRoom({ commit, dispatch }) {
    dispatch('socketEmit', {
      action: 'leftChat',
      payload: null
    })

    commit('clearData')
  },
  setTypingStatus({ dispatch, commit, state }, typingStatus) {
    commit('setTypingStatus', typingStatus)
    const { user } = state
    dispatch('socketEmit', {
      action: 'setTypingStatus',
      payload: user
    })
  },
  async setPlayer({ commit, state, dispatch }, name) {
    const { id } = await dispatch('socketEmit', {
      action: 'createConnection'
    })
    const body = { name, socket: id }
    this.$axios
      .$post('/players/', body)
      .then((data) => {
        console.log(data)
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
  async createUser({ commit, dispatch }, user) {
    const { id } = await dispatch('socketEmit', {
      action: 'createUser',
      payload: user
    })

    commit('setUser', { id, ...user })
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
