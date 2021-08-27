<template>
  <v-form
    ref="form"
    v-model="valid"
    :disabled="disabled"
    @keyup.native.enter="valid && submit($event)"
  >
    <v-text-field
      v-model="username"
      class="mt-1"
      :rules="usernameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      ref="password"
      v-model="password"
      class="mt-4"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      clearable
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-expand-transition>
      <v-alert v-if="errorMessage" class="my-2" dense type="error">{{
        errorMessage
      }}</v-alert>
    </v-expand-transition>
    <v-btn
      :disabled="!valid"
      :loading="disabled"
      block
      color="success"
      class="mr-4 mt-4 elevation-0"
      @click="submit"
      >Login</v-btn
    >
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data({ params }) {
    return {
      show1: false,
      disabled: false,
      valid: false,
      errorMessage: '',
      username: '',
      usernameRules: [(v) => !!v || 'Name is required'],
      password: '',
      passwordRules: [(v) => !!v || 'Password is required'],
    };
  },

  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    async submit() {
      try {
        this.disabled = true;
        await this.login({
          username: this.username,
          password: this.password,
        });
        this.$router.push('/hubs');
      } catch (error) {
        console.log(error);
        if (error.response) {
          this.errorMessage = error.response.data;
        } else if (error.request) {
          this.errorMessage = 'Service Unavailable.';
        }
      } finally {
        this.disabled = false;
      }
    },
  },
};
</script>
