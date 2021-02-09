<template>
    <nav>
        <!-- <img src="../../../assets/sinus-logo.svg" alt="" width="100" height="100"> -->
        <router-link to="/">Products</router-link> |
        <router-link to="/profile">My account</router-link> |
        <router-link to="/product-cart">Cart</router-link> 
        <CartPopOut></CartPopOut>
    </nav>
</template>

<script>
import CartPopOut from './CartPopOut.vue'
export default {
  components: { CartPopOut },}
</script>
