<template>
  <v-container fluid>
    <the-header></the-header>
    <h1 class="d-flex justify-center mb-6 font-weight-light">Sign up</h1>
    <v-form
      class="form"
      ref="form"
      v-model="valid"
      lazy-validation
      @submit="submit"
    >
      <v-text-field
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :counter="10"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        :rules="confirmPasswordRules"
        :counter="10"
        label="Confirm password"
        type="password"
        required
      ></v-text-field>
      <v-btn :disabled="!valid || !email" depressed class="mr-4" @click="submit"
        >submit
      </v-btn>
      <v-btn :disabled="!valid" depressed class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn depressed class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { useCryptoStore } from '@/store/index';
import TheHeader from '../header/TheHeader.vue';

export default {
  components: { TheHeader },
  data() {
    const store = useCryptoStore();
    return {
      store,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v =>
          (v && v.length >= 2 && v.length <= 20) ||
          'Name must between 2 and 20 characters.',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          (v && v.length >= 7 && v.length <= 20) ||
          'Password must be between 7 and 20 characters.',
      ],
      confirmPasswordRules: [
        v => !!v || 'type confirm password',
        v => v === this.password || "Passwords don't match.",
      ],
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      this.store.signUpUser({
        name: this.name,
        email: this.email,
        password: this.password,
      });
      this.reset();
      this.$router.push('./');
    },
  },
};
</script>
<style scoped>
.form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
