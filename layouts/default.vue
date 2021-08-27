<template>
  <v-app id="app">
    <vue-particles
      color="#c9caff"
      :particle-opacity="0.5"
      :particles-number="100"
      shape-type="circle"
      :particle-size="2"
      lines-color="#a6a8ff"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.02"
      :lines-distance="250"
      :move-speed="0.3"
      :hover-effect="false"
      :click-effect="false"
      class="particles"
    />
    <v-main>
      <v-container fill-height fluid>
        <nuxt />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>
<script>
// import { v4 as uuid4 } from 'uuid';
import Footer from '~/components/Footer.vue';

export default {
  components: {
    Footer,
  },
  middleware: 'auth',
};
</script>
<style>
.particles {
  height: 100%;
  width: 100%;
  position: absolute;
}
.glass-effect {
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.904);
}
</style>
