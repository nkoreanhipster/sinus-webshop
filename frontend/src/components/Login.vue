<template>
    <div class="bg-white pv-5 ph-6">
      <form action="">
        <input
          class="mb-2 reset input"
          type="text"
          v-model="email"
          placeholder="email"
        />
        <input
          class="mb-2 reset input"
          type="password"
          v-model="password"
          placeholder="password"
        />
        <button class="btn-black" @click="Login">Login</button>
        <p class="error">{{ message }}</p>
      </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      email: "",
      password: "",
    };
  },
  computed: {
    isModalActive() {
      return this.$store.state.isModalActive.login;
    },
  },
  mounted() {
    this.message = ""; // Reset on component moun
  },
  methods: {
    Login(event) {
      event.preventDefault();
      event.preventDefault();
      this.message = "";
      // Check if email/password are empty
      if (this.email === "" || this.password === "") {
        this.message = "Fields cannot be empty";
        return;
      }

      let payload = {
        email: this.email,
        password: this.password,
      };

      // Check against database/store
      this.$store.dispatch("tryAndLogin", payload);
    },
  },
};
</script>