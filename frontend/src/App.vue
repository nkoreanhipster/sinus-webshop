<template>
  <div id="app" :class="{ 'is-blurred': isModalFullCoverActive }">
    <Navigation></Navigation>
    <main class="is-fullsize">
      <Banner class="is-blurrable" />
      <router-view />
    </main>
    <Footer class="is-blurrable"></Footer>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Banner from "@/components/Banner.vue";
import Footer from "@/components/Footer.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Navigation,
    Banner,
    Footer,
  },
  computed: {
    ...mapGetters(["modalStates"]),
    isModalFullCoverActive() {
      return this.modalStates.cover;
    },
  },
  metaInfo: {
    title: "KEWL BOARDS FOR KEWL PEOPLE",
    titleTemplate: "SINUS | %s",
  },
};
</script>

<style lang="scss" >
@import "~@/styles/_global.scss";
</style>
