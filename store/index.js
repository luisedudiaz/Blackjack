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
    const { player } = state
    const { id } = await dispatch('socketEmit', {
      action: 'joinRoom',
      payload: { player: player[0], idGame }
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
          this.$bvToast.toast('Ocurrió un error al crear la sala', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 3000,
            appendToast: true
          })
        } else {
          commit('SET_GAME', { id: data.response.id })
          this.$bvToast.toast('El juego se creó correctamente', {
            title: 'Éxito',
            variant: 'success',
            autoHideDelay: 3000,
            appendToast: true
          })
        }
      })
      .catch((err) => {
        this.$bvToast.toast(err, {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 3000,
          appendToast: true
        })
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
