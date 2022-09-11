<template>
  <div class="box">
    <!-- <div class="allBox">
      <div
        @click="changeToAll"
        class="all"
        :class="{ style1: cat == '全部视频' }"
      >
        全部视频
      </div>
    </div> -->
    <div class="itemBox">
      <div
        v-for="item in groupList"
        :key="item.id"
        class="item"
        :class="{ style1: cat == item.name }"
        @click="changeQuery(item.name,item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["groupList", "cat"],
  data() {
    return {
      //   cur: "全部视频",
    };
  },
  methods: {
    changeQuery(name,id) {
      this.$emit("change", name,id);
      //   this.cur = name
    },
    // changeToAll() {
    //   this.$emit("change", "全部视频");
    // },
  },
};
</script>

<style lang="less" scoped>
.style1 {
  background-color: rgb(252, 235, 235);
  color: red;
  border-radius: 20px;
}
.box {
  font-size: 1px;
  display: flex;
  flex-direction: column;
  //   flex-wrap: wrap;
  .allBox {
    // width: 15%;
    // margin:2% 0 0 5%;
    padding: 2% 0 2% 5%;
    border-bottom: 0.1px solid rgb(214, 208, 208);
    // .all {
    //   width: 10%;
    //   text-align: center;
    //   cursor: pointer;
    //   &:hover {
    //     color: red;
    //   }
    // }
  }
  .itemBox {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2%;
    .item {
      font-size: 1px;
      text-align: center;
      width: 10%;
      margin: 0 4% 5% 0;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
}
</style>