<template>
  <div>
    <router-link to="/personalList">独家播放</router-link>
    <div class="privateBox">
      <div v-for="item in priList" :key="item.id" class="privateItem">
        <img :src="item.sPicUrl" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { privatecontent } from "@/http/api/findMusic";
export default {
  data() {
    return {
      //独家放送
      priList: [],
    };
  },
  methods: {
    //获得独家放送信息
    async getPrivatecontent() {
      let res = await privatecontent();
      this.priList = res.data.result;
      console.log(this.priList);
      // console.log(typeof(this.priList))
    },
  },
  created() {
    this.getPrivatecontent();
  },
};
</script>

<style lang="less" scoped>
.privateBox {
  display: flex;
  width: 100%;
  margin-bottom: 4%;
  font-size: 90%;
  font-weight: 400;
  & :not(:first-child) {
    margin-left: 2%;
  }
  // height: auto;
  .privateItem {
    width: 31%;
    img {
      width: 100%;
      // height: 100%;
      border-radius: 2%;
      margin-bottom: 10px;
    }
    // height: 100%;
  }
}
</style>