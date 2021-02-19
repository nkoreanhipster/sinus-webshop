<template>
  <footer class="p-4 columns">
    <section></section>
    <section></section>
    <section></section>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      minHeight: 1,
      maxHeight: 100,
      isChecked: true,
    };
  },
  methods: {
    changeSizeOfBanner(ev) {
      console.log({
        maxHeight: this.maxHeight,
        minHeight: this.minHeight,
      });

      this.$store.dispatch("changeBannerSize", {
        minHeight: this.minHeight,
        maxHeight: this.maxHeight,
      });
    },
  },
  mounted() {
    let { minHeight, maxHeight } = this.$store.getters.bannerSize;
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
  },
};
</script>
<style lang="scss" scoped>
.collapsable {
  visibility: hidden;
}

.collapsable.is-collapsed {
  visibility: visible;
}
</style>
