<template>
  <img
    class="image-component is-loading"
    :src="require(`@/assets/${src}`)"
    alt="loading"
  />
    <!-- :class="{ 'is-loading': isLoading }" -->
</template>

<script>
export default {
  props: {
    src: String,
    width: -1,
    height: -1,
  },
  data() {
    return {
      isLoaded: false,
      isLoading: true,
      image: null,
      scale:1.0
    };
  },
  created() {
    // let image = new Image(this.width, this.height);
    // image.src = this.src;
    // image.addEventListener("onload", () => {
    //   console.log("loadeed");
    // });
    // image.onload = () => {
    //   console.log("loadeed");
    //   this.isLoaded = true;
    // };
  },
  mounted(){
    // setInterval(()=>{
    //   this.scale += 0.06
    // }, 2900)
  },
  loaded() {

  },
};
</script>

<style lang="scss" scoped>
img.image-component {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: inherit;
  object-position: top;
  animation: image-wobble 200s;
  // transition: transform 3000ms;
}

.is-loading::after {
  // width: 100%;
  // height: 100%;
  // position: absolute;
  // background: linear-gradient(145deg, #2a5a77, #71a393);
  // background-size: cover;
  // content: "";
  // animation: spinZ 1000ms infinite;
  // animation-timing-function: linear;
}
@keyframes spinZ {
  0% {
    transform: rotateZ(0deg);
    transform-origin: 0% 50% 0;
  }
  100% {
    transform: rotateZ(360deg);
    transform-origin: 0% 50% 0;
  }
}
</style>
