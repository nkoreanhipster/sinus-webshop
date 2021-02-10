<template>
  <div>
    <input type="text" v-model="username" placeholder="Användarnamn" />
    <input type="password" v-model="password" placeholder="Lösenord" />
    <button @click="Login">Take my money!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    Login() {
      // Check if username/password are empty
      if (this.username === "" || this.password === "") {
        alert("Oi");
        return;
      }

      let payload = {
        username: this.username,
        password: this.password,
      };

      // Check against database/store
      this.$store.dispatch("tryAndLogin", payload);
    },
  },
};
</script>