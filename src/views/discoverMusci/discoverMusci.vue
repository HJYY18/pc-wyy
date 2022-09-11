<template>
  <div class="box">
    <!-- 发现音乐2333 -->
    <!-- <faxian></faxian> -->
    <div class="itemBox">
      <router-link v-for="item in itemList" :key="item.path" :to="item.path">
        {{ item.name }}
      </router-link>
    </div>
    <div class="show">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import faxian from '@/components/test/findMusic/faxian.vue'
export default {
  // components: { faxian },
  data() {
    return {
      itemList: [
        {
          name: "个性推荐",
          path: "/findMusci/recommendation",
        },
        {
          name: "歌单",
          path: { path: "/findMusci/playList", query: { cat: "华语" } },
        },
        {
          name: "排行榜",
          path: "/findMusci/rank",
        },
        {
          name: "歌手",
          path: "/findMusci/artists",
        },
        {
          name: "最新音乐",
          path: {path:'/findMusci/latestMusic/Song',query:{type:0}},
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.router-link-active {
  text-decoration: none;
  font-weight: 800;
  /* color: yellow; */
}
.box {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.itemBox {
  position: fixed;
  top: 7vh;
  width: 100%;
  height: 7vh;
  background-color: white;
  z-index: 20;
  vertical-align: middle;
  & >*{
    margin-right: 2%;
  }
}
.show {
  display: flex;
  // min-width: 100% - 200px;
  width: 100vw - 200px;
  // width: 100vw - 25px;
  // border: 1px solid black;
  margin: 70px 100px 0px 100px;
}
</style>