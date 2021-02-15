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
  metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'KEWL BOARDS FOR KEWL PEOPLE',
      // all titles will be injected into this template
      titleTemplate: 'SINUS | %s'
    }
};
</script>

<style lang="scss" >
@import "~@/styles/_global.scss";
</style>
