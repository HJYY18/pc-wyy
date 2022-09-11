<template>
  <div class="box">
    <div class="listOrHistory">
      <div>播放列表</div>
      <div>历史记录</div>
    </div>
    <div
      v-for="(item, index) in playList"
      :key="item.id"
      :class="{ item: true, style1: index % 2 != 0 }"
      @dblclick="playMusic(item.id)"
    >
      <!-- <div class="isPlaying"></div> -->
      <div class="name">
        <span>{{ item.name }}</span>
        <span v-if="item.alia[0]">({{ item.alia[0] }})</span>
      </div>
      <div class="artistName">
        <aritistName :artistList="item.ar"></aritistName>
      </div>
      <div class="time">{{ convertTIme(item.dt) }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "@/store/helper/music";
import aritistName from "../../common/aritistName.vue";
import { mapActions } from "@/store/helper/music";
export default {
  components: { aritistName },
  computed: {
    ...mapGetters(["playList"]),
  },
  methods: {
    ...mapActions(["setMusicInfo"]),
    convertTIme(t) {
      let time = Math.floor(t / 1000);
      let min = Math.floor(time / 60);
      let sec = time % 60;
      // console.log(min, sec);
      min = ("0" + min).slice(-2);
      sec = ("0" + sec).slice(-2);
      const res = min + ":" + sec;
      return res;
    },
    playMusic(id) {
      this.setMusicInfo(id);
    },
  },
  created() {
    console.log(this.playList);
  },
};
</script>

<style lang="less" scoped>
.style1 {
  background-color: rgb(249, 249, 249);
}
.box {
  // display: flex;
  // flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 1px;
  // border: 1px solid black;
  // justify-content: start;
  // align-items: center;
  .listOrHistory {
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
    width: 100%;
    // border: 1px solid rgb(180, 178, 178);
    // border-radius: 20px;
    // margin-bottom: 2%;
    div {
      font-size: 13px;
      width: 100%;
      text-align: center;
      border-radius: 20px;
      // border: 1px solid red;
      padding: 2%;
    }
  }
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: start;
    width: 100%;
    height: 4vh;
    cursor: pointer;
    &:hover {
      background-color: rgb(240, 241, 242);
    }
    // margin-left: 1%;
    .isPlaying {
      width: 5%;
      border: 0.1px solid black;
    }
    .name {
      text-align: left;
      width: 50%;
      margin-left: 3%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      & :nth-child(2) {
        color: rgb(193, 191, 196);
      }
    }
    .artistName {
      width: 30%;
      display: flex !important;
      flex-direction: row !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      width: 15%;
    }
  }
}
</style>