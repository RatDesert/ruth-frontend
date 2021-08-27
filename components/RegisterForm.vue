<template>
  <v-form
    ref="form"
    v-model="valid"
    :disabled="disabled"
    @keyup.native.enter="valid && submit($event)"
  >
    <v-text-field
      ref="username"
      v-model="username"
      class="mt-6"
      :rules="usernameRules"
      :success="isUsernameAvailable"
      :error-messages="usernameExistsError"
      label="Username"
      required
      validate-on-blur
      @blur="checkUsernameAvailability"
    ></v-text-field>

    <v-text-field
      ref="email"
      v-model="email"
      class="mt-6"
      :rules="emailRules"
      :success="isEmailAvailable"
      :error-messages="emailExistsError"
      label="E-mail"
      required
      validate-on-blur
      @blur="checkEmailAvailability"
    ></v-text-field>

    <v-text-field
      v-model="password"
      class="mt-6"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      hint="At least 8 characters"
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-expand-transition>
      <v-alert v-if="registred" class="my-2" dense type="info"
        >Please check email to confirm your registration.</v-alert
      >
    </v-expand-transition>
    <v-expand-transition>
      <v-alert v-if="errorMessage" class="my-2" dense type="error">{{
        errorMessage
      }}</v-alert>
    </v-expand-transition>
    <v-btn
      block
      :disabled="!valid"
      :loading="disabled"
      color="success"
      class="mt-6 elevation-0"
      @click="submit"
      @keyup.enter="submit"
      >Sign up</v-btn
    >
  </v-form>
</template>

<script>
export default {
  data({ params }) {
    return {
      errorMessage: '',
      show1: false,
      valid: false,
      registred: false,
      disabled: false,
      username: '',
      isUsernameAvailable: null,
      isEmailAvailable: null,
      usernameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length >= 4) || 'Min 4 characters',
      ],
      email: '',

      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => (v && /.+@.+\..+/.test(v)) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 8) || 'Min 8 characters',
      ],
    };
  },
  computed: {
    usernameExistsError() {
      return this.isUsernameAvailable === false
        ? 'Username already exists'
        : null;
    },
    emailExistsError() {
      return this.isEmailAvailable === false ? 'Email already exists' : null;
    },
  },
  methods: {
    async submit() {
      this.disabled = true;
      try {
        await this.$api.$post('/api/register/', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.registred = true;
      } catch (error) {
        console.log(error);
        if (error.response) {
          this.errorMessage = error.response.data;
        } else if (error.request) {
          this.errorMessage = 'Service Unavailable';
        } else {
          this.errorMessage = error.message;
        }
      } finally {
        this.resetForm();
        this.disabled = false;
      }
    },
    async checkUsernameAvailability() {
      if (this.$refs.username.validate()) {
        try {
          const data = await this.$api.$post('/register/check_username/', {
            username: this.username,
          });
          this.isUsernameAvailable = data.is_available;
        } catch (err) {
          console.log(err);
        }
      }
    },
    async checkEmailAvailability() {
      if (this.$refs.email.validate()) {
        try {
          const data = await this.$api.$post('/register/check_email/', {
            email: this.email,
          });
          this.isEmailAvailable = data.is_available;
        } catch (err) {
          console.log(err);
        }
      }
    },

    resetForm() {
      this.isEmailAvailable = null;
      this.isUsernameAvailable = null;
      this.$refs.form.reset();
    },
  },
};
</script>
