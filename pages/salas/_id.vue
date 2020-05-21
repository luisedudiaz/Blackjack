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
export default {
  name: 'IdVue'
}
</script>

<style scoped></style>
