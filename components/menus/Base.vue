<template>
  <v-menu
    v-model="show"
    transition="slide-x-transition"
    color="transparent"
    content-class="elevation-0 mt-4"
    class="glass-effect"
    :nudge-width="nudgeWidth"
    :close-on-content-click="false"
    offset-x
    offset-y
  >
    <slot> </slot>
    <template #activator="{ on }">
      <v-hover v-slot="{ hover }">
        <v-btn
          v-show="icon"
          icon
          :disabled="disabled"
          :class="['mr-2', { 'v-btn--active': show || hover }]"
          @click="on.click"
        >
          <v-badge dot overlap color="red" :value="badge">
            <v-icon>{{ icon }}</v-icon>
          </v-badge>
        </v-btn>
      </v-hover>
    </template>
  </v-menu>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    badge: {
      type: Boolean,
      default: false,
    },
    nudgeWidth: {
      type: Number,
      default: 500,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    disabled(newValue, oldValue) {
      console.log('kek');
      if (newValue) {
        this.show = false;
      }
    },
  },
};
</script>
