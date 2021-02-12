<template>
  <div id="app" class="is-fullsize">
    <Navigation></Navigation>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import {mapGetters} from 'vuex';
export default {
  components: {
    Navigation
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
