<template>
  <section class="bg-gray-1 is-fullsize">
    <div class="wrapper">
      <div class="img-container pt-2" style="position: relative">
        <img
          src="@/assets/skate-hero-1.jpg"
          alt="skateboarding-in-sunrise.super-cool-and-retro.jpgasdqwerty"
        />

        <span class="fat-boy">Join the rolling family.</span>
      </div>

      <div class="two-columns mt-4 pb-6">
        <div class="ph-2 mv-3">
          <h2 class="mv-4">Cowabunga</h2>
          <p class="mv-3">
            <b>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              nec accumsan nulla. Aliquam ac eu.
            </b>
          </p>
          <p class="mv-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            nec accumsan nulla. Aliquam ac eu. Nullam maximus massa nec aliquam
            tincidunt. Quisque tristique tellus nec suscipit condimentum fusce.
          </p>
        </div>

        <form action="" class="ph-2 mv-3">
          <h2 class="mv-4">Register</h2>
          <input type="text" class="" v-model="name" placeholder="Namn" />
          <input type="email" class="" v-model="email" placeholder="E-mail" />
          <input
            type="text"
            class=""
            v-model="password"
            placeholder="Lösenord"
          />
          <button
            class="btn-black"
            @click="register"
            :disabled="isRegisterButtonDisabled == true"
          >
            Registrera
          </button>
          <div class="m-2 p-2">
            <span>{{ message }}</span>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'REGISTER'
    },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      isRegisterButtonDisabled: true,
      message: "",
    };
  },
  created() {
    this.message = "";
    this.$store.dispatch("closeAllModals");
    this.$store.dispatch("changeBannerSize", { maxHeight: 0, minHeight: 0 });
  },
  methods: {
    async register(ev) {
      ev.preventDefault();
      // Check if namename/password are empty
      if (this.name === "" || this.email === "" || this.password === "") {
        return;
      }
      let payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        repeatPassword: this.password,
      };

      // Check against database/store
      let res = await this.$store.dispatch("tryAndRegister", payload);
      this.message = res;

      if (res.message && res.message == "user registered!") {
        this.resetForm();
      }
    },

    checkIfAllFieldsAreFilledIn() {
      this.message = "";
      let x = this.name !== "" && this.email !== "" && this.password !== "";
      if (x) {
        this.isRegisterButtonDisabled = false;
      } else {
        this.isRegisterButtonDisabled = true;
      }
    },
    resetForm() {
      this.email = "";
      this.name = "";
      this.password = "";
    },
  },
  watch: {
    name() {
      this.checkIfAllFieldsAreFilledIn();
    },
    email() {
      this.checkIfAllFieldsAreFilledIn();
    },
    password() {
      this.checkIfAllFieldsAreFilledIn();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.fat-boy {
  font-size: 4.2rem;
  color: $white;
  text-shadow: 1px 1px 4px rgb(0, 0, 0),
   1px 1px 6px rgb(0, 0, 0),
   1px 1px 8px rgb(0, 0, 0),
   1px 1px 14px rgb(0, 0, 0);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
}

.two-columns {
  display: flex;
  & > * {
    flex: 1;
  }
}
</style>