export default {
  created() {
    const subscriber = new WebSocket(`ws://localhost:8001/user/data/`);
    subscriber.onopen = (event) => {
      console.log(event);
    };
    subscriber.onmessage = (event) => {
      const message = JSON.parse(JSON.parse(event.data));
      const [type, body] = Object.entries(message)[0];
      if (type === 'data') {
        this.stateFromData(body);
        this.$store.commit('data/ADD_DATA', body);
      }
    };
    subscriber.onclose = (event) => {
      console.log(event);
    };
  },
  async mounted() {
    await this.getDevicesState();
  },
  methods: {
    stateFromData(body) {
      const [hubId, sensorData] = Object.entries(body)[0];
      const [sensorId, data] = Object.entries(sensorData)[0];
      const lastMessageAt = data.timestamp;
      const state = {
        [hubId]: {
          [sensorId]: { last_message_at: lastMessageAt, is_online: true },
          system: { last_message_at: lastMessageAt, is_online: true },
        },
      };
      this.$store.commit('devices/UPDATE_STATE', state);
    },
    async getDevicesState() {
      const state = await this.$dataApi.$get('/user/devices');
      this.$store.commit('devices/ADD_STATE', state);
    },
  },
};
