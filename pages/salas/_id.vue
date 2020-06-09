<template>
  <div>
    <b-alert show>{{ $route.params.id }}</b-alert>
    <b-img
      class="w-100"
      src="~/assets/blackjack.jpg"
      fluid
      alt="Responsive image"
    ></b-img>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IdVue',
  methods: {
    ...mapActions(['joinRoom'])
  },
  mounted() {
    this.joinRoom(this.$route.params.id)
  }
}
</script>

<style scoped></style>
