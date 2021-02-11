<template>
  <aside>
    <div class="bg-white pv-5 ph-6">
      <input class="mb-2 reset input" type="text" v-model="username" placeholder="username" />
      <input class="mb-2 reset input" type="password" v-model="password" placeholder="password" />
      <button class="btn-black" @click="Login">Login</button>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    isModalActive() {
      return this.$store.state.isModalActive.login;
    },
  },
  methods: {
    Login() {
      // Check if username/password are empty
      if (this.username === "" || this.password === "") {
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

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
// Make sure these are scoped
aside {
  position: absolute;
  background-color: transparent;
  padding-top: 2rem;
  right: 0;
  // Transparent spacing inbetween inner element
  transform: translateX(-1.5rem);
}

aside::before {
  content: "";
  width: 5.4rem;
  height: 5.4rem;
  position: absolute;
  background-color: $white;
  transform: rotateZ(45deg);
  left: calc(50% - 2.8rem);
  border-bottom-right-radius: 90%;
  top: 0;
  z-index: 1;
}

aside > div {
  position: sticky;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 62px;
  text-align: right;
}
</style>