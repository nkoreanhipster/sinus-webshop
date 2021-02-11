<template>
  <!-- 
        {
          "_id":"GuqDUmEKIx2vQLSq" // generated serverside
          "title"
          "price" {Number}
          "shortDesc"
          "category"
          "longDesc"
          "imgFile"  // Asset logic on clientside
          "serial"{Number}
        }
   -->
  <div class="product-item bg-3">
    <div class="img-container">
      <img src="~@/assets/bag.svg" class="bag" />
      <img
        :src="product.imgFile"
        @error="$event.target.src = '/images/gallagher-not.found.png'"
        class="image"
      />
    </div>

    <div>
      <span style="float: left;">
        {{ product.title }}
      </span>
      <span style="float: right;">
        {{ product.price }} SEK
      </span>
    </div>

    <p>{{ product.shortDesc }}</p>
    <p>
      <u>countOfDuplicates: {{ product.countOfDuplicates }}</u>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    // ProductObject från parent
    product: Object,
  },
};
</script>

<style scoped lang="scss">
.bag {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}

.image {
  position: relative;
  top: 0;
  left: 0;
  z-index: 0;
}

.img-container {
  position: relative;
  top: 0;
  left: 0;
  background-image: "~@/assets/bag.svg";
  width: 20rem;
}

.product-item {
  padding: 2rem;
  margin: 0.25rem; 
}
</style>