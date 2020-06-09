export const state = () => ({
  player: {},
  game: {}
})

export const getters = {}

export const mutations = {
  SET_PLAYER(state, player) {
    state.player = player
  },
  SOCKET_newPlay(state, play) {},
  SOCKET_updateGame(state, game) {
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
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload)
  },
  createPlay({ dispatch, state }, play) {},
  joinRoom({ dispatch, state }) {
    const { player, game } = state
    dispatch('socketEmit', {
      action: 'joinRoom',
      payload: { player, idGame: game.id }
    })
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
