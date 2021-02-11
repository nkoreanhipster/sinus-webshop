<template>
  <header>
    <div class="nav-inner ph-6">
      <!-- Left side of the header -->
      <div class="logo">
        <router-link to="/">
          <img src="../assets/sinus-logo.svg" alt="" width="100" height="100" />
        </router-link>
      </div>

      <!-- Right side of the header -->
      <nav class="">
        <ol class="nav-links">
          <li>
            <router-link class="nav-button" to="/">
              <span>Products</span>
            </router-link>
          </li>

          <li v-if="isCurrentUserAuthenticated">
            <router-link class="nav-button" to="/profile">
              <span> My account </span>
            </router-link>
          </li>
          <li v-else-if="!isCurrentUserAuthenticated">
            <a class="nav-button" @click="toggleLoginModal">
              <span>Login</span>
            </a>
          </li>

          <li style="display: none">
            <CartPopOut />
          </li>

          <li>
            <router-link to="/checkout">
              <div class="checkout-button">
                <img class="image" src="~@/assets/bag.svg" />
              </div>
            </router-link>
          </li>
        </ol>
      </nav>
    </div>

    <Login v-if="isLoginModalActive" />
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import CartPopOut from "./CartPopOut.vue";
import Login from "./Login.vue";
export default {
  computed: {
    ...mapGetters(["isAuthenticated"]),
    isCurrentUserAuthenticated() {
      return this.isAuthenticated;
    },
    isLoginModalActive() {
      return this.$store.state.isModalActive.login;
    },
  },
  components: { CartPopOut, Login },
  methods: {
    toggleLoginModal() {
      this.$store.dispatch("toggleModal", "login");
    },
  },
};
</script>

<style lang="scss">
</style>
