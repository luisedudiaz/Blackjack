<template>
  <div class="background">
    <b-container>
      <b-row>
        <b-col>
          <h1 class="title">
            Blackjack
          </h1>
          <div v-if="isLogged">
            <b-form-input
              v-model="text"
              placeholder="Ingresa ID de sala"
            ></b-form-input>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

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
  font-size: 90px;
  color: #b30606;
  letter-spacing: 1px;
}
</style>
