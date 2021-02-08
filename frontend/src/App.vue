<template>
  <div id="app">
    <Navigation></Navigation>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
export default {
  components: {
    Navigation,
  },
};
</script>

<style lang="scss" >
@import "~@/styles/_global.scss";
</style>
