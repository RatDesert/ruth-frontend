<template>
  <v-card flat>
    <v-app-bar flat color="transparent">
      <v-toolbar-title class="text-h5 font-weight-light">
        {{ name }}
        <v-icon :color="isOnline ? 'green' : 'grey'" class="pl-2">
          mdi-record-circle-outline
        </v-icon>
      </v-toolbar-title>
    </v-app-bar>

    <v-card-text v-if="isFetched">
      Model: {{ details.license.model.name }}
      <p />
      License key: {{ details.license.key }}
      <p />
      Last seen at: {{ lastMessageAt }}
      <p />
      IP address: {{ ip }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="#268bd2"
        :to="{ path: `${$route.fullPath}/${id}` }"
        nuxt
        exact
        text
      >
        Live
      </v-btn>
      <v-btn disabled color="#268bd2" text> History </v-btn>
      <v-btn disabled color="#268bd2" text> Settings </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: null,
    },
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      details: {},
    };
  },
  async fetch() {
    this.details = await this.$api.$get(`/hubs/${this.id}`);
  },
  computed: {
    isFetched() {
      return !this.$fetchState.pending && !this.$fetchState.error;
    },
    state() {
      return this.$store.getters['devices/getHubState'](this.id);
    },
    isOnline() {
      return !!this.state?.is_online;
    },
    ip() {
      return this.state?.ip ? this.state?.ip : '-';
    },
    lastMessageAt() {
      return this.state?.last_message_at
        ? new Date(this.state?.last_message_at * 1000)
        : '-';
    },
  },
};
</script>
