<template>
  <v-container>
    <Sensor
      v-for="(sensor, index) in sensors"
      :id="sensor.id"
      :key="index"
      :color="styles.colors[index % styles.colors.length]"
      :hub-id="id"
    />
    <Plug v-if="!sensors.length" title="Hub has no sensors" />
  </v-container>
</template>
<script>
import Plug from '~/components/Plug.vue';
import Sensor from '~/components/Sensor.vue';

export default {
  components: { Sensor, Plug },
  layout: 'dashboard',
  async asyncData({ params, app }) {
    const sensors = await app.$api.$get(`/hubs/${params.id}/sensors`);
    return { sensors };
  },
  data() {
    return {
      id: this.$route.params.id,
      online: true,
      sensors: [],
      subscriber: null,
      styles: {
        colors: ['#6c71c4', '#268bd2', '#2aa198', '#859900', '#d33682'],
      },
    };
  },
};
</script>
