<template>
  <v-hover v-slot="{ hover }">
    <div :set="(style = styles[type])">
      <v-card
        :color="hover ? style.hover.color : ''"
        :style="{ 'border-left': `10px solid ${style.border.color}` }"
        class="mb-2"
      >
        <v-app-bar height="24" flat color="transparent" class="py-2">
          <v-toolbar-title :class="['font-weight-light', 'overline']">
            {{ time }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-icon :color="style.icon.color">{{ style.icon.name }}</v-icon>
        </v-app-bar>
        <div class="py-2">
          <v-card-title
            :class="[
              `${type === 'alert' ? 'red' : 'white'}--text`,
              'py-1',
              'font-weight-light',
            ]"
          >
            {{ tittle }}
          </v-card-title>
          <v-card-text v-if="description" class="py-0 pb-1 font-weight-light">
            {{ description }}
          </v-card-text>
        </div>
      </v-card>
    </div>
  </v-hover>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    index: {
      type: Number,
      default: null,
    },
    time: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    tittle: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      styles: {
        warning: {
          icon: {
            color: 'orange',
            name: 'mdi-alert-circle',
          },
          border: {
            color: 'rgba(245, 124, 0, 0.4)',
          },
          hover: {
            color: 'rgba(245, 124, 0, 0.3)',
          },
        },
        info: {
          icon: {
            color: 'blue',
            name: 'mdi-information',
          },
          border: {
            color: 'rgba(25, 118, 210, 0.4)',
          },
          hover: {
            color: 'rgba(25, 118, 210, 0.3)',
          },
        },
        success: {
          icon: {
            color: 'green',
            name: 'mdi-check-circle',
          },
          border: {
            color: 'rgba(56, 142, 60, 0.4)',
          },
          hover: {
            color: 'rgba(56, 142, 60, 0.3)',
          },
        },
        alert: {
          icon: {
            color: 'red',
            name: 'mdi-alert-circle',
          },
          border: {
            color: 'rgba(211, 47, 47, 0.4)',
          },
          hover: {
            color: 'rgba(211, 47, 47, 0.3)',
          },
        },
      },
    };
  },
  methods: {
    ...mapMutations({
      remove: 'notifications/REMOVE_NOTIFICATION',
    }),
  },
};
</script>
