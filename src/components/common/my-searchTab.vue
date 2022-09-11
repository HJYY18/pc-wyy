<!-- 点击tab内文字来检索 -->
<template>
  <div class="box">
    <div
      v-for="(item) in itemList"
      :key="item.name"
      @click="itemClick(item)"
      :class="{ item: true, style1: name == item.name }"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["itemList",'name'],
  data() {
    return {
      // curName: '',
    };
  },
  methods: {
    itemClick(data) {
      // this.curIndex = index;
      // console.log(data,index)
      this.$emit("itemClick", data);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .item {
    width: 5%;
    margin-left: 2%;
    text-align: center;
    margin-bottom: 1.5%;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
}
.style1 {
  background-color: rgb(254, 246, 245);
  border-radius: 10px;
  color: red;
  &:hover {
    color: red !important;
    background-color: rgb(254,238,238);
  }
}
</style>