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
            <a :class="{'active':isCartModalActive}" class="nav-button" @click="toggleModel('cart')">
              <span> My account </span>
            </a>
          </li>
          <li v-else-if="!isCurrentUserAuthenticated">
            <a :class="{'active':isLoginModalActive}" class="nav-button" @click="toggleModel('login')">
              <span>Login</span>
            </a>
          </li>

          <li>
            <router-link to="/checkout">
              <div class="checkout-button">
                <div>{{ itemsInCart }}</div>
              </div>
            </router-link>
          </li>
        </ol>
      </nav>
    </div>

    <PopUp :isActive="isLoginModalActive || isCartModalActive">
      <template v-slot:login>
        <Login v-if="isLoginModalActive" />
      </template>
      <template v-slot:cart>
        <CartPopOut v-if="isCartModalActive" />
      </template>
    </PopUp>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import CartPopOut from "./CartPopOut.vue";
import PopUp from "./PopUp.vue";
import Login from "./Login.vue";
export default {
  computed: {
    ...mapGetters(["isAuthenticated", "totalItemsInCart", "modalStates"]),
    isCurrentUserAuthenticated() {
      return this.isAuthenticated;
    },
    isLoginModalActive() {
      return this.modalStates.login;
    },
    isCartModalActive() {
      return this.modalStates.cart;
    },
    itemsInCart() {
      return this.totalItemsInCart;
    },
  },
  components: { PopUp, CartPopOut, Login },
  methods: {
    toggleModel(nameOfModal) {
      this.$store.dispatch("toggleModal", nameOfModal);
    },
  },
};
</script>
