<template>
  <v-col>
    <v-row align="center" justify="center">
      <v-card flat color="transparent" width="600" class="pa-4 glass-effect">
        <LoginForm v-if="showLoginForm" />
        <RegisterForm v-else />
        <v-btn
          block
          color="info"
          class="mt-4 elevation-0"
          @click="showLoginForm = !showLoginForm"
          >{{ showLoginForm ? 'Create account' : 'Sign in instead' }}</v-btn
        >
      </v-card>
    </v-row>
  </v-col>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      showLoginForm: true,
    };
  },
};
</script>
<style scoped></style>
