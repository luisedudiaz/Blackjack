<template>
  <div>
    <div class="background">
      <div class="container">
        <b-table striped hover :items="items" :fields="fields">
          <template v-slot:cell(name)="data">
            <h2>
              {{ data.item.name + data.item.no }}
            </h2>
          </template>
          <template v-slot:cell(no)="data">
            <NuxtLink :to="`/salas/${data.item.no}`"
              ><b-button variant="success">{{
                data.item.no
              }}</b-button></NuxtLink
            >
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: ['name', 'no'],
      items: [
        {
          isActive: true,
          no: 40,
          name: 'Dickerson'
        },
        { isActive: false, no: 21, name: 'Larsen' },
        { isActive: false, no: 89, name: 'Geneva' },
        { isActive: true, no: 38, name: 'Jami' }
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
</style>
