<template>
  <div id="app">
    <Navigation></Navigation>
    <main class="is-fullsize">
      <Banner/>
      <router-view />
    </main>
    <Footer></Footer>
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
