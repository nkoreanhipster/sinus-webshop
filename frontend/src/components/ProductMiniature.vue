<template>
  <article>
    <div class=""><img :src="product.imgFile" class="image-small"/></div>
    <div class="">
      <h2>{{product.title}}</h2>
      <p class="black-60">{{product.shortDesc}}</p>
      <p class="black-40">{{product.serial}}</p>
    </div>
    <div class="">
      <p>{{product.price}}</p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    // ProductObject från parent
    product: Object,
  },
};
</script>

<style lang="scss" scoped>
article {
  display: flex;
}
</style>