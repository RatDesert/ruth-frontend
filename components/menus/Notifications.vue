<template>
  <div>
    <Base
      icon="mdi-bell"
      :badge="Boolean(notifications.length)"
      :disabled="!notifications.length"
    >
      <template v-for="(notification, index) in notifications">
        <div
          :key="index"
          :set="(notification = notifications[index])"
          @click.stop="notifications.splice(index, 1)"
        >
          <Notification
            :index="index"
            :time="new Date(notification.timestamp * 1000).toUTCString()"
            :type="notification.type"
            :tittle="notification.tittle"
            :description="notification.description"
          />
        </div>
      </template>
    </Base>
  </div>
</template>

<script>
import Base from './Base.vue';
import Notification from './Notification.vue';

export default {
  components: {
    Base,
    Notification,
  },
  data() {
    return {
      notifications: [],
      handlers: {
        hub: {
          connected: this.hubConnected,
          disconnected: this.hubDisconnected,
          registred: this.hubRegistred,
        },
        connection: {
          error: null,
        },
      },
    };
  },
  created() {
    const ws = new WebSocket(`ws://localhost:8003/notifications/`);
    ws.onmessage = (event) => {
      const data = JSON.parse(JSON.parse(event.data));
      if (data.handler) {
        this.handlers[data.target][data.handler](data);
      }
      this.notifications.push(data);
    };
    ws.onclose = (event) => {
      // console.log(event.data);
    };
  },
  methods: {
    hubDisconnected(data) {
      this.$store.commit('state/SET_HUB_OFFLINE', {
        hubId: data.details.hub_id,
        timestamp: data.timestamp,
      });
    },
    hubConnected(data) {
      this.$store.commit('state/SET_HUB_ONLINE', {
        hubId: data.details.hub_id,
        timestamp: data.timestamp,
        ip: data.details.ipv4,
      });
    },
    hubRegistred(data) {
      // must call refresh hubs list
      return this.$api.$get('/hubs/').then((result) => {
        this.$store.commit('hubs/UPDATE_HUBS', result);
      });
    },
  },
};
</script>
