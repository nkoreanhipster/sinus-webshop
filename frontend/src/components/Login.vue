<template>
  <div class="bg-white p-3 m-2">
    <form method="POST" novalidate>
      <div class="input-icon mv-2">
        <input class="input" type="email" v-model="email" placeholder="email" />
        <span class="icon"><i class="gg-mail"></i></span>
      </div>
      <p class="failure" style="font-size: 1.4rem">{{ errors[0] || "" }}</p>

      <div class="input-icon mv-2">
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="password"
        />
        <span class="icon"><i class="gg-lock"></i></span>
      </div>
      <p class="failure" style="font-size: 1.4rem">{{ errors[1] || "" }}</p>

      <button class="btn-black w-icon" @click="Login">
        <span>Login</span>
        <i class="gg-log-in"></i>
      </button>

      <router-link to="/register">
        <button class="btn-mustard m-2">Register</button>
      </router-link>
      <p class="error m-2">{{ message }}</p>
    </form>
  </div>
</template>

<script>
let errorMessages = {
  hasEmail: `Email required.`,
  hasPassword: `Password required.`,
  validEmail: `Valid email required e.g. example@mail.com`,
};

export default {
  data() {
    return {
      errors: [],
      message: "",
      email: "",
      password: "",
    };
  },
  mounted() {
    //this.message = ""; // Reset on component moun
  },
  methods: {
    async Login(event) {
      event.preventDefault();

      this.checkFormsErrors();

      if (this.errors.length > 0) return;

      let payload = {
        email: this.email,
        password: this.password,
      };

      // Check against database/store
      let res = await this.$store.dispatch("tryAndLogin", payload);
      if (this.$store.state.isAuthenticated) {
        if (this.$store.getters.userRole === "admin") {
          this.$router.push({ path: "admin" });
        } else {
          this.$router.push({ path: "profile" });
        }
      }
      this.message = res;
    },

    /**
     *    Check if form is valid, mark bad input fields with red
     *    Errors are logged in this.errors for view display
     */
    checkFormsErrors() {
      this.errors = [];

      let inputCheck = {
        hasEmail: this.email.length > 0,
        hasPassword: this.password.length > 0,
        validEmail: this.isEmailValidForm(this.email),
      };

      console.log({ inputCheck });

      Object.entries(inputCheck)
        .filter(([key, val]) => val === false)
        .map(([key, val]) => this.errors.push(errorMessages[key]));
    },

    isEmailValidForm(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log({ email }, re.test(email));
      return re.test(email);
    },
  },
};
</script>