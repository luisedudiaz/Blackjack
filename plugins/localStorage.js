import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'player',
    paths: ['player'] // ADD PATH FOR VUEX STORE
  })(store)
}
