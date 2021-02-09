<template>
  <nav>
    <!-- <img src="../../../assets/sinus-logo.svg" alt="" width="100" height="100"> -->
    <div class="nav-inner">
      <router-link to="/">Products</router-link> |
      <router-link to="/profile">My account</router-link> |
      <router-link to="/checkout">Cart</router-link> 
    </div>
    <CartPopOut></CartPopOut>
    <span>am i logged in [{{ isCurrentUserAuthenticated }}]</span>
  </nav>
</template>

<script>
import CartPopOut from "./CartPopOut.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isAuthenticated"]),
    isCurrentUserAuthenticated() {
      return this.isAuthenticated;
    },
  },
  components: { CartPopOut },
};
</script>
