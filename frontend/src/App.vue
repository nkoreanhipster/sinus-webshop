<template>
  <div id="app">
    <Navigation :class="{ 'is-blurred': isModalFullCoverActive }"></Navigation>
    <main class="is-fullsize">
      <Banner :class="{ 'is-blurred': isModalFullCoverActive }"/>
      <router-view />
    </main>
    <Footer :class="{ 'is-blurred': isModalFullCoverActive }"></Footer>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Banner from "@/components/Banner.vue";
import Footer from "@/components/Footer.vue";
import {mapGetters} from 'vuex';
export default {
  components: {
    Navigation, 
    Banner,
    Footer
  },
  computed: {
    ...mapGetters(["modalStates"]),
    isModalFullCoverActive() {
      return this.modalStates.cover;
    },
  },
};
</script>

<style lang="scss" >
@import "~@/styles/_global.scss";
</style>
