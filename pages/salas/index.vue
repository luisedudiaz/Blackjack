<template>
  <div>
    <div class="background">
      <div class="container">
        <b-button
          size="sm"
          class="mb-2"
          variant="success"
          block
          to="salas/5edefc6ce8846136a8222364"
        >
          Ir a Sala
        </b-button>
        <div>
          <h1 class="title">
            Salas
          </h1>
          <b-table striped hover :items="items" :fields="fields">
            <template v-slot:cell(id)="data">
              <h2>
                {{ data.item.id + data.item.participants }}
              </h2>
            </template>
            <template v-slot:cell(access)="data">
              <NuxtLink :to="`/salas/${data.item.id}`">
                <b-button size="sm" class="mb-2" variant="success" block>
                  Ir a Sala
                </b-button>
              </NuxtLink>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: ['id', 'participants', 'access'],
      items: [
        {
          isActive: true,
          id: 123,
          participants: 4,
          access: 'Ir a sala'
        },
        { isActive: false, participants: 7, id: 456, access: 'Ir a sala' },
        { isActive: false, participants: 7, id: 789, access: 'Ir a sala' },
        { isActive: true, participants: 2, id: 147, access: 'Ir a sala' }
      ]
    }
  }
}
</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.background {
  /* Location of the image */
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
