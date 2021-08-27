<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      flat
      class="glass-effect"
      :style="{
        'background-color': 'rgba(90, 90, 90, 0.075)',
      }"
    >
      <v-btn class="ml-3" :to="{ path: '/hubs' }" nuxt exact icon>
        <v-icon>mdi-format-list-text</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <Notifications />
      <AccountMenu />
    </v-app-bar>

    <v-main>
      <v-container fill-height>
        <nuxt keep-alive />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import { ConcurrentTask } from '../utils/concurrentTask';
import { accessCookie, refreshCookie } from '../utils/auth';
import AccountMenu from '~/components/menus/Account.vue';
import Notifications from '~/components/menus/Notifications';
import Footer from '~/components/Footer.vue';
import streamMixin from '~/mixins/streamMixin.js';

export default {
  name: 'Dashboard',
  components: {
    AccountMenu,
    Notifications,
    Footer,
  },
  mixins: [streamMixin],
  middleware: 'auth',
  data() {
    return {
      task: new ConcurrentTask(this.refreshTokens, 5000, 'refreshTokens'),
    };
  },
  watch: {
    '$store.state.auth.authenticated'(newValue, oldValue) {
      if (!newValue) {
        this.$router.push('/login');
      }
    },
  },
  async mounted() {
    this.task.onSuccess = async () => {
      return await this.refreshTokensWrapper();
    };
    this.task.onError = (error) => {
      this.$nuxt.error(error);
      return console.error(error);
    };
    await this.refreshTokensWrapper();
  },
  methods: {
    ...mapActions({
      refreshTokens: 'auth/refreshTokens',
      logout: 'auth/logout',
    }),
    async refreshTokensWrapper() {
      await this.task.sleep(accessCookie.timeout - accessCookie.leeway);
      if (!refreshCookie.valid) {
        // user logout
        return;
      }
      await this.task.run();
    },
  },
};
</script>
<style>
.glass-effect {
  backdrop-filter: blur(8px);
}

.v-btn--active .v-btn__content {
  color: #2196f3;
}
.v-btn::before {
  background-color: transparent;
}
.v-card.v-sheet.theme--dark {
  border: 1px solid #1e1e1e;
  background-color: rgba(84, 88, 148, 0.055);
}
/deep/ .v-toolbar__content {
  padding-right: 0px !important;
}
.v-menu__content {
  backdrop-filter: blur(12px);
  background-color: rgba(90, 90, 90, 0);
}
.v-card--hover {
  background-color: #2195f344 !important;
}
.v-list-item {
  background-color: rgba(84, 88, 148, 0.055);
  border: 1px solid #1e1e1e;
}
</style>
