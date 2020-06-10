<template>
  <b-container fluid class="background">
    <b-row>
      <b-col>
        <h1 class="title text-center">
          Salas
        </h1>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col md="8">
        <b-table
          id="rooms-table"
          dark
          striped
          hover
          responsive
          show-empty
          empty-text="No hay salas disponibles."
          :items="$store.state.rooms"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
        >
          <template v-slot:cell(id)="data">
            {{ 'Room-' + data.item.id }}
          </template>
          <template v-slot:cell(access)="data">
            <NuxtLink :to="`/salas/${data.item.id}`">
              <b-button size="sm" class="mb-2" variant="success" block>
                Ir a Sala
              </b-button>
            </NuxtLink>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="$store.state.rooms.length"
          :per-page="perPage"
          aria-controls="rooms-table"
          align="right"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  mounted() {
    this.setRooms()
  },
  methods: {
    ...mapActions(['setRooms'])
  }
}
</script>
<style>
.background {
  /* Location of the image */
  min-height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.3) 100%
    ),
    url('~assets/cover.jpg');
  /* Background image is centered vertically and horizontally at all times */
  background-position: center center;

  /* Background image doesn't tile */
  background-repeat: no-repeat;

  /* Background image is fixed in the viewport so that it doesn't move when
       the content's height is greater than the image's height */
  background-attachment: fixed;

  /* This is what makes the background image rescale based
       on the container's size */
  background-size: cover;

  /* Set a background color that will be displayed
       while the background image is loading */
  background-color: #464646;
}
@font-face {
  font-family: Cinzel;
  src: url('~assets/Cinzel-Black.ttf');
}

.title {
  font-family: Cinzel, serif;
  font-weight: 300;
  font-size: 100px;
  color: #b30606;
  letter-spacing: 1px;
}
</style>
