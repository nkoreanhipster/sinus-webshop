<template>
  <article class="p-3" :class="{ even: index % 2 === 0, odd: index % 2 !== 0 }">
    <h3>{{ formatTimestamp(item.timeStamp) }}</h3>
    <p :class="item.status">{{ item.status }}</p>
    <p>{{ item._id }}</p>
    <p>
      <b>{{ item.orderValue }}</b
      ><i> SEK</i>
    </p>

    <ol>
      <li>
        <span class="tiny" v-for="(x, i) in item.items" :key="i"><a :href="`/products/${x}`">{{ x }}</a>| </span>
      </li>
    </ol>
    <p class="">
      <span class="tiny" v-if="!item.__match">{{'Anonnymous (fattar inte hur man fick ur adress från dessa)'}}</span>
      <span class="tiny" v-else>{{item.__match.email}} | {{item.__match.adress}}</span>
    </p>
    <!-- 
    <p>
      {{item}}
    </p> -->
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
  methods: {
    formatTimestamp(timestamp) {
      let date = new Date(timestamp);
      let formatter = new Intl.DateTimeFormat("sv-SE");
      return formatter.format(date);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
article {
  display: flex;
  justify-content: flex-start;
}
article > *:not(h3) {
  margin-left: 0.5rem;
}
.tiny{
  font-size: 0.8rem;
}
.in-process,
.inProcess {
  color: $blood-orange-opacity-70;
  font-weight: 800;
}
.done,
.Done {
  color: darkgreen;
  font-weight: 800;
}
.even {
  background-color: $gray-1;
}
.odd {
  background-color: $gray-2;
}
</style>