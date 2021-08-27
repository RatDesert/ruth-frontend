<template>
  <v-container fluid>
    <Hub
      v-for="(hub, index) in hubs"
      :id="hub.id"
      :key="hub.id"
      :name="hub.name"
      :class="[{ 'mb-2': hubs.length - 1 !== index }]"
      :color="styles.colors[index % styles.colors.length]"
    />
    <Plug v-if="!hubs.length" title="No hubs" />
  </v-container>
</template>

<script>
import Hub from '~/components/Hub';
import Plug from '~/components/Plug.vue';

export default {
  components: { Hub, Plug },
  layout: 'dashboard',
  async asyncData({ app, store }) {
    const hubs = await app.$api.$get('/hubs/');
    store.commit('hubs/UPDATE_HUBS', hubs);
  },
  data() {
    return {
      styles: {
        colors: ['#6c71c4', '#268bd2', '#2aa198', '#859900', '#d33682'],
      },
    };
  },
  computed: {
    hubs() {
      return this.$store.getters['hubs/getHubs'];
    },
  },
};
</script>
