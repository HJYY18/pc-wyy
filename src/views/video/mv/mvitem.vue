<template>
  <div class="box">
    <div class="pic">
      <img @click="toMv(item.id)" :src="item.cover" alt="" />
    </div>
    <div class="title" @click="toMv(item.id)">
      {{ item.name }}
    </div>
    <div class="artists">
      <aritistName :artistList="item.artists"></aritistName>
    </div>
  </div>
</template>

<script>
import aritistName from "../../../components/common/aritistName.vue";
export default {
  props: ["item"],
  components: { aritistName },
  methods: {
    toMv(id) {
        this.$router.push({path:'/mvDetail',query:{id}})
    },
  },
};
</script>

<style lang="less" scoped>
.box {
    width: 100%;
    height: 100%;
    font-size: 1px;
  .pic {
    width: 100%;
    // height: 10%;
    img {
      height: 150px;
      width: 100%;
      border-radius: 3%;
    }
  }
  .title {
    color: black;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1% 0;
    &:hover {
      font-weight: 500;
    }
  }
}
</style>