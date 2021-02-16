<template>
  <header :class="{ 'is-blurred': isModalFullCoverActive }">
    <div class="nav-inner ph-4">
      <!-- Left side of the header -->
      <div class="logo ph-2">
        <router-link to="/">
          <img
            src="../assets/sinus-logo.svg"
            alt=""
            width="120"
            height="auto"
          />
        </router-link>
      </div>

      <!-- Right side of the header -->
      <nav class="">
        <ol class="nav-links">
          <li>
            <router-link class="nav-button" to="/">
              <span @click="closeAllModals">Products</span>
            </router-link>
          </li>

          <li v-if="isCurrentUserAuthenticated && currentUserRole === 'admin'">
            <router-link class="nav-button" to="/admin">
              <span>Admin</span>
            </router-link>
          </li>

          <li v-else-if="isCurrentUserAuthenticated && currentUserRole === 'customer'">
            <router-link class="nav-button" to="/profile">
              <span>My Account</span>
            </router-link>
          </li>

          <li v-else-if="!isCurrentUserAuthenticated">
            <a
              :class="{ active: isLoginModalActive }"
              class="nav-button"
              @click="toggleModel('login')"
            >
              <span>Login</span>
            </a>
          </li>

          <li @click="toggleModel('cart')">
            <div class="checkout-bag">
              <transition name="shake" mode="out-in">
                   <a :key="itemsInCart" class=""></a>
              </transition>
              <span
                ><b>({{ itemsInCart }})</b></span
              >
            </div>
          </li>

          <!-- <li>
            <div class="checkout-button" @click="toggleModel('cart')">
              <div>{{ itemsInCart }}</div>
            </div>
          </li> -->
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
    ...mapGetters([
      "isAuthenticated",
      "totalItemsInCart",
      "modalStates",
      "userRole",
    ]),
    isModalFullCoverActive() {
      return this.modalStates.cover;
    },
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
    currentUserRole() {
      return this.userRole;
    },
  },
  components: { PopUp, CartPopOut, Login },
  methods: {
    toggleModel(nameOfModal) {
      this.$store.dispatch("toggleModal", nameOfModal);
    },
    closeAllModals() {
      this.$store.dispatch("closeAllModals");
    },
  },
};
</script>

<style lang="scss" scoped>
.shake-enter-active {
  transition: all .3s ease;
}
.shake-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.shake-enter, .shake-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>