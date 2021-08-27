<template>
  <v-banner
    :style="{
      top: '56px',
    }"
    :value="true"
    two-line
    class="glass-effect"
    sticky
  >
    <v-avatar slot="icon" color="transparent" size="40">
      <v-icon :color="styles.success.icon.color" large>
        {{ styles.success.icon.name }}
      </v-icon>
    </v-avatar>

    Three line text string example with two actions. One to two lines is
    preferable. Three lines should be considered the maximum string length on
    desktop in order to keep messages short and actionable.
  </v-banner>
</template>
<script>
export default {
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
};
</script>
