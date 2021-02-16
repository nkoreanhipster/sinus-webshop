<template>
  <article>
    <ol>
      <li :class="{'even':index % 2 === 0, 'odd':index % 2 !== 0}">
        <h3>{{formatTimestamp(item.timeStamp)}}</h3>
        
        <span class="" v-for="(x, i) in item.items" :key="i">{{ x }}</span>
      </li>
    </ol>
    <!-- <p>Timestamp: {{ item.timeStamp }}</p>
    <p>Status: {{ item.status }}</p>
    <p>orderValue: {{ item.orderValue }}:-</p>
    <p>_id: {{ item._id }}</p> -->
  </article>
</template>

<script>
export default {
  props: {
    item: Object,
    index: {
      type: Number,
      value: 0,
    },
  },
  methods:{
      formatTimestamp(timestamp){
          let date = new Date(timestamp)
          let formatter = new Intl.DateTimeFormat('sv-SE');
          return formatter.format(date)
      },
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.even {
  background-color: $blood-orange-opacity-30;
}
.odd {
  background-color: $mustard-opacity-30;
}
</style>