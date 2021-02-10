<template>
  <header>
    <div class="nav-inner ph-6">
      <!-- Left side of the header -->
      <div class="logo">
        <i>(LogoHere)</i>
      </div>

      <!-- Right side of the header -->
      <nav class="">
        <ol class="nav-links">
          <li><router-link to="/">Products</router-link> |</li>

          <li v-if="isCurrentUserAuthenticated">
            <router-link to="/profile">My account</router-link> |
          </li>
          <li v-else-if="!isCurrentUserAuthenticated"><router-link to="/register">Register</router-link> |</li>
          <li>
            <router-link to="/checkout">Cart</router-link>
                <CartPopOut/>
                <Login/>
          </li>
        </ol>
      </nav>
    </div>

    <!-- <img src="../../../assets/sinus-logo.svg" alt="" width="100" height="100"> -->
    <!-- <div class="nav-inner">
      <router-link to="/">Products</router-link> |
      <router-link to="/profile">My account</router-link> |
      <router-link to="/checkout">Cart</router-link>
    </div>

    <div v-if="isCurrentUserAuthenticated === true">
      <span style="color:darkgreen;">LoggedIn</span>
    </div>
    <div v-else>
      <span style="color:darkred;">LoggedOut</span>
    </div>
 
    <div v-if="isCurrentUserAuthenticated === true">
        <router-link to="/profile">My Account</router-link>
    </div>



    <span>am i logged in [{{ isCurrentUserAuthenticated }}]</span> -->
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
  },
  components: { CartPopOut, Login },
};
</script>
