<template>
  <v-container fluid>
    <the-header></the-header>
    <h1 class="d-flex justify-center mb-6">Sign up</h1>
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
      <v-btn :disabled="!valid" class="mr-4" @click="submit">submit </v-btn>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { useCriptoStore } from '@/store/index';
import TheHeader from '../header/TheHeader.vue';

export default {
  components: { TheHeader },
  data() {
    const store = useCriptoStore();
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
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          (v && v.length >= 4 && v.length <= 20) ||
          'Password must be between 4 and 10 characters.',
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
      this.$router.push('./login');
    },
  },
};
</script>
<style>
.form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
