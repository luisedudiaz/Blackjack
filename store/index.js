export const state = () => ({
  player: {},
  players: {},
  game: {}
})

export const getters = {}

export const mutations = {
  SET_PLAYER(state, player) {
    state.player = player
  },
  SOCKET_newPlay(state, play) {},
  SOCKET_updatePlayers(state, players) {},
  clearData(state) {
    state.player = {}
    state.players = {}
    state.game = {}
  },
  setThinkingStatus(state, status) {
    state.user.isPlaying = status
  }
}

export const actions = {
  setPlayer({ commit }, player) {
    commit('SET_PLAYER', player)
  },
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload)
  },
  createPlay({ dispatch, state }, play) {},
  joinRoom({ dispatch, state }) {
    const { user } = state
    dispatch('socketEmit', {
      action: 'joinRoom',
      payload: user
    })
  },
  leftRoom({ commit, dispatch }) {
    dispatch('socketEmit', {
      action: 'leftChat',
      payload: null
    })
    commit('clearData')
  },
  setThinkingStatus({ dispatch, commit, state }, typingStatus) {
    commit('setThinkingStatus', typingStatus)
    const { user } = state
    dispatch('socketEmit', {
      action: 'setThinkingStatus',
      payload: user
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
