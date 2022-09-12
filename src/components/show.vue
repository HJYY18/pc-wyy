<template>
  <div class="box">
    <div class="Menu">
      <router-link to="/findMusci/recommendation" exact class="menu-top"
        >发现音乐</router-link
      >
      <router-link to="/video" class="menu-top">视频</router-link>
      <router-link to="/collect" class="menu-top">收藏</router-link>
      <!-- <router-link to="/friends" class="menu-top">朋友</router-link> -->
      <!-- <div class="myMusic">
        <span>我的音乐</span>
        <router-link to="/localMusic">本地音乐</router-link>
        <router-link to="/download">下载管理</router-link>
        <router-link to="/colle">收藏</router-link>
      </div> -->
      <!-- <div class="test">
        <router-link to="/test">测试</router-link>
      </div> -->
      <!-- 用户歌单 -->
      <asideList></asideList>
    </div>

    <div class="Main">
      <router-view v-if="isRouterAlive"></router-view>
    </div>

    <!-- 音乐详情,写在这里方便不遮挡底部player -->
    <transition name="musicDetail">
      <musicInfoDetail
        v-if="isShowMusicDetail"
        class="musicDetail"
      ></musicInfoDetail>
    </transition>
  </div>
</template>

<script>
import asideList from "./asideList.vue";
import { mapGetters } from "@/store/helper/music";
import musicInfoDetail from "./player/musicDetail/musicInfoDetail.vue";
export default {
  components: { asideList, musicInfoDetail },
  data() {
    return {
      showMusicList: false,
      isRouterAlive: true,
    };
  },
  computed: {
    ...mapGetters(["isShowMusicDetail"]),
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Menu::-webkit-scrollbar {
  width: 6px;
  background-color: #fff;
}

.Menu:hover ::-webkit-scrollbar-track-piece {
  /*鼠标移动上去再显示滚动条*/
  background-color: #fff;
  /* 滚动条的背景颜色 */
  border-radius: 6px;
  /* 滚动条的圆角宽度 */
}

.Menu:hover::-webkit-scrollbar-thumb:vertical {
  background-color: rgb(225, 225, 225);
  border-radius: 6px;
}

.router-link-active {
  text-decoration: none;
  font-weight: 800;
  background-color: rgb(246, 246, 247);
}

a {
  text-decoration: none;
  color: black;
  margin-top: 10px;
  &:hover {
    background-color: rgb(246, 246, 247);
  }
}

.box {
  position: relative;
  display: flex;
  flex-direction: row;
  height: calc(100vh - 125px);
  text-align: left;
  padding-left: 20px;
  font-size: 17px;
  font-weight: 100;
  /* padding-top: 0px; */
}
.Menu {
  /* position: fixed; */
  width: 13%;
  /* left: 0px; */
  border-right: 1px solid rgb(224, 224, 224);
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  /* justify-content: flex-start; */
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.Main {
  width: 100%;
  height: calc(100vh - 142px);
  display: flex;
  overflow-y: scroll;
  padding: 15px 15px 0px 15px;
  /* border: 1px solid red; */
}
.Main::-webkit-scrollbar {
  width: 6px;
  background-color: #fff;
}

.Main:hover ::-webkit-scrollbar-track-piece {
  background-color: #fff;
  border-radius: 6px;
}
.Main:hover::-webkit-scrollbar-thumb:vertical {
  background-color: rgb(225, 225, 225);
  border-radius: 6px;
}
.myMusic {
  margin-bottom: 0px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  & :nth-child(1) {
    font-size: 1px;
    color: rgb(151, 144, 144);
  }
}
/* .myMusic >*{
  margin-top: 10px;
} */
.musicDetail {
  position: absolute;
  min-width: 100vw;
  width: 100vw;
  height: 110%;
  left: 0;
  top: -8%;
  // top: 102%;
  /* bottom: 124%; */
  /* left: -19%; */
  z-index: 50;
  // border: 1px solid black;
  background-color: rgb(255, 255, 255);
}
.musicListCreated :first-child {
  font-size: 1px;
}

.musicDetail-leave-active,
.musicDetail-enter-active {
  transition: all 0.5s ease;
}

.musicDetail-enter,
.musicDetail-leave-to {
  top: 102%;
}
.musicDetail-enter-to,
.musicDetail-leave {
  top: -8%;
}
/* .musicDetail-leave-active,
.musicDetail-enter {
  height: 70vh;
} */
/* .musicDetail-leave,
.musicDetail-enter-active {
  height: 0px;
} */
</style>