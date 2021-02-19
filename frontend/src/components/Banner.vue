<template>
  <div id="banner" :style="getBannerSize">
    <span class="slogo" ref="slogo">{{ slogo }}</span>
    <ImageComponent :src="'skate_pool_2.jpg'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ImageComponent from "@/components/ImageComponent.vue";
import randomizer from "@/lib/randomizer";
import { translate, hide } from "@/lib/anime";
export default {
  data() {
    return {
      slogo: "",
    };
  },
  created() {},
  mounted() {
    this.slogo = randomizer.getRandomSlogo();
    translate(this.$refs.slogo, 150);
    let loop = () => {
      setTimeout(() => {
        hide(this.$refs.slogo, -150, 800);
        setTimeout(() => {
          this.slogo = randomizer.getRandomSlogo();
          translate(this.$refs.slogo, 150);
        }, 800);
        loop();
      }, 8000);
    };
    loop();
  },
  computed: {
    ...mapGetters(["bannerSize"]),
    getBannerSize() {
      let { maxHeight, minHeight } = this.bannerSize;
      return { maxHeight: `${maxHeight}px`, minHeight: `${minHeight}px` };
    },
  },
  components: { ImageComponent },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/_animations.scss";

#banner {
  background-image: linear-gradient($gray-2, $gray-1, $gray-2);
  transition: 300ms ease-out;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 100vw;
  overflow: hidden;
}
.slogo {
  z-index: 3;
  font-size: 5rem;
  font-weight: 800;
  float: right;
  text-align: center;
  position: absolute;
  width: 40rem;
  height: 800rem;
  top: 20%;
  left: 45%;
  word-wrap: break-word;
  color: $blood-orange;
}
</style>