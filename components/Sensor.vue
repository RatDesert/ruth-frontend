<template>
  <v-card v-if="isFetched" class="py-3" color="transparent" flat>
    <v-app-bar flat color="transparent">
      <v-toolbar-title
        v-if="!$vuetify.breakpoint.mobile"
        class="text-h5 font-weight-light pr-4"
      >
        {{ details.license.model.type.name }}
      </v-toolbar-title>
      <v-icon v-if="value" :color="online ? 'green' : 'grey'" class="pr-2">
        mdi-record-circle-outline
      </v-icon>
      <v-icon v-if="signal && online && signalIcon" color="green" class="pr-2">
        {{ signalIcon }}
      </v-icon>
      <v-icon v-if="charge && online && chargeIcon" color="green" class="pr-2">
        {{ chargeIcon }}
      </v-icon>
      <v-spacer></v-spacer>
      <div class="text-h5 font-weight-light pr-2">{{ value }}</div>
      <div class="text-h5 font-weight-light">
        {{ details.license.model.type.dimension }}
      </div>
    </v-app-bar>
    <v-sheet color="transparent">
      <LineChart :value="value" :label="label" :color="color" :capacity="15" />
    </v-sheet>
  </v-card>
</template>
<script>
import LineChart from './LineChart.vue';
export default {
  components: {
    LineChart,
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
    color: {
      type: String,
      default: '',
    },
    hubId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      templates: {
        details: {
          id: Number,
          license: {
            id: Number,
            model: {
              name: String,
              max_val: Number,
              min_val: Number,
              type: { name: String, dimension: String },
            },
          },
        },
      },
    };
  },
  async fetch() {
    this.details = await this.$api.$get(
      `/hubs/${this.$route.params.id}/sensors/${this.id}`
    );
  },
  computed: {
    online() {
      return this.$store.getters['devices/getSensorState'](this.hubId, this.id)
        ?.is_online;
    },
    isFetched() {
      return !this.$fetchState.pending && !this.$fetchState.error;
    },
    label() {
      return new Date(this.timestamp * 1000).toLocaleTimeString('en-US');
    },
    data() {
      return this.$store.getters['data/getDataById'](this.hubId, this.id);
    },
    value() {
      return this.data?.value;
    },
    timestamp() {
      return this.data?.timestamp;
    },
    charge() {
      return this.data?.charge;
    },
    signal() {
      return this.data?.signal;
    },
    signalIcon() {
      if (this.signal >= 0 && this.signal < 33) {
        return 'mdi-signal-cellular-1';
      } else if (this.signal >= 33 && this.signal < 66) {
        return 'mdi-signal-cellular-2';
      } else if (this.signal >= 66 && this.signal <= 100) {
        return 'mdi-signal-cellular-3';
      }
      return null;
    },
    chargeIcon() {
      if (this.charge >= 0 && this.charge < 33) {
        return 'mdi-battery-low';
      } else if (this.charge >= 33 && this.charge < 66) {
        return 'mdi-battery-medium';
      } else if (this.charge >= 66 && this.charge <= 100) {
        return 'mdi-battery-high';
      }
      return null;
    },
  },
};
</script>
