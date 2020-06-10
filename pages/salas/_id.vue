<template>
  <b-container fluid class="background">
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
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IdVue',
  data() {
    return {
      players: []
    }
  },
  mounted() {
    this.joinRoom(this.$route.params.id)
  },
  destroyed() {
    this.leftRoom()
  },
  methods: {
    ...mapActions(['joinRoom', 'leftRoom'])
  }
}
</script>

<style scoped>
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
