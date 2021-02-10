<template>
  <section>
    <p>REGISTER</p>
    <input type="text" v-model="user" placeholder="Namn" />
    <input type="text" v-model="email" placeholder="E-mail" />
    <input type="text" v-model="password" placeholder="Lösenord" />
    <button @click="register">Registrera</button>
  </section>
</template>
<script>
export default {
  data() {
    return {
      user: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register() {
      // Check if username/password are empty
      if (this.user === "" || this.email === '' || this.password === "") {
        alert("Oi");
        return;
      }

      let payload = {
        user: this.user,
        email:this.email,
        password: this.password,
        repeatPassword: this.password,
      };

      // Check against database/store
      this.$store.dispatch("tryAndRegister", payload);
    },
  },
};
</script>