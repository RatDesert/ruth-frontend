<template>
  <v-row>
    <v-col align="center" justify="center">
      <v-card flat max-width="400" color="transparent">
        <v-icon class="pt-2" x-large color="blue">{{ icon }}</v-icon>
        <v-card-text>
          <p class="mb-0 overline font-weight-light">{{ title }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'No enteties',
    },
    icon: {
      type: String,
      default: 'mdi-information-outline',
    },
  },
};
</script>
