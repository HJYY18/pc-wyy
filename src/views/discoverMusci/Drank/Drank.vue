<template>
  <div class="box">
    <!-- Drank -->
    <!-- <button @click="allRank">所有榜单内容摘要</button> -->
    <div>
      <div>
        <topRank ></topRank>
        <allRank></allRank>
      </div>
    </div>
  </div>
</template>

<script>
import { toplistDetail } from "@/http/api/findMusic";
import topRank from "./topRank.vue";
import allRank from "./allRank.vue";
export default {
  components: { topRank,allRank },
  data() {
    return {
      topList: [],
      otherList: [],
      flag :false
    };
  },
  methods: {
    async allRank() {
      console.log(await toplistDetail());
    },
  },
  // watch: {
  //   topList:function(newValue) {
  //     this.topList = newValue
  //     this.flag = true
  //   },
  // },

};
</script>

<style lang="less" scoped>
</style>