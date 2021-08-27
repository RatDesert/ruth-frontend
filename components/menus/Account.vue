<template>
  <Base icon="mdi-dots-vertical" :nudge-width="250">
    <v-list color="transparent" class="pa-0">
      <v-app-bar flat color="rgba(25, 118, 210, 0.3)">
        <v-toolbar-title v-if="isFetched" class="font-weight-light">
          {{ user.email }}
        </v-toolbar-title>
      </v-app-bar>
      <v-list-item-group>
        <v-list-item
          v-for="(action, index) in actions"
          :key="index"
          :class="[{ 'mb-2': actions.length - 1 !== index }]"
        >
          <v-list-item-icon>
            <v-icon>{{ action.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="text-h6 font-weight-light"
              v-text="action.name"
            ></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-arrow-right-thick</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </Base>
</template>
<script>
import Base from './Base.vue';
export default {
  name: 'AccountMenu',
  components: { Base },
  data() {
    return {
      user: {},
      actions: [
        {
          icon: 'mdi-logout',
          name: 'Logout',
        },
      ],
    };
  },

  async fetch() {
    this.user = await this.$api.$get(`/user/`);
  },
  computed: {
    isFetched() {
      return !this.$fetchState.pending && !this.$fetchState.error;
    },
  },
};
</script>
