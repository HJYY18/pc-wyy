<template>
  <div class="box">
    <div class="songOrAlbum">
      <router-link :to= "{path:'/findMusci/latestMusic',query:{type:0}}" >新歌速递</router-link>
      <router-link to="/findMusci/latestMusic/Album">新碟上架</router-link>
    </div>
    <!-- <div class="tab">
      <div class="tab1">
        <span
          v-for="(item, index) in typeList"
          :key="item.type"
          :class="{ tab1: true, style1: tab1Index == index }"
          @click="tab1Index = index"
        >
          {{ item.name }}
        </span>
      </div>
      <div class="tab2">
        <span>播放全部</span>
        <span>收藏全部</span>
      </div>
    </div> -->
    <router-view class="show"> </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeList: [
        { type: 0, name: "全部" },
        { type: 7, name: "华语" },
        { type: 96, name: "欧美" },
        { type: 8, name: "韩国" },
        { type: 16, name: "日本" },
      ],
      tab1Index: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.style1 {
  font-weight: 800;
  color: black;
  // background-color: red;
}
.router-link-active{
    background-color: red;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .songOrAlbum {
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
    width: 22%;
    border: 1px solid rgb(180, 178, 178);
    border-radius: 20px;
    margin-bottom: 2%;
    a {
      font-size: 13px;
      width: 100%;
      text-align: center;
      border-radius: 20px;
      // border: 1px solid red;
      padding: 2%;
    }
  }
  .tab {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .tab1 {
      width: 60%;
      & > * {
        margin-left: 2.5%;
        cursor: pointer;
        &:hover {
          color: black;
        }
      }
    }
  }
}
</style>