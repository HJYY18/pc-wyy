<template>
  <div class="box">
    <audio
      autoplay
      :src="musicURL"
      class="player"
      ref="audio"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
    <div class="btnbox">
      <div>
        <img
          src="@/assets/imgs/orderPlay.png"
          alt=""
          v-if="playType === 1"
          @click="changePlayType"
          class="playType"
        />
        <img
          src="@/assets/imgs/listPlay.png"
          alt=""
          v-if="playType === 2"
          @click="changePlayType"
          class="playType"
        />
        <img
          src="@/assets/imgs/singlePlay.png"
          alt=""
          v-if="playType === 3"
          @click="changePlayType"
          class="playType"
        />
        <img
          src="@/assets/imgs/randPlay.png"
          alt=""
          v-if="playType === 4"
          @click="changePlayType"
          class="playType"
        />
      </div>

      <img src="@/assets/imgs/preMusic.png" alt="" />
      <div class="playbox">
        <img
          class="ctlPlay"
          src="@/assets/imgs/pause.png"
          alt=""
          v-if="isPlaying"
          @click="onPause"
        />
        <img
          class="ctlPlay"
          src="@/assets/imgs/play.png"
          alt=""
          v-else
          @click="onPlay"
        />
      </div>
      <img src="@/assets/imgs/nextMusic.png" alt="" />
      <img src="@/assets/imgs/lyric.png" alt="" />
    </div>
    <div class="processBox">
      <span>{{ curTime }}</span>
      <div class="process-box" ref="processBox" @mousedown="mouseDown">
        <div class="process" ref="process"></div>
      </div>
      <span>{{ maxTime }}</span>
    </div>
  </div>
</template>

<script>
// import { getMusic } from "@/http/api/music";
import { mapGetters } from "@/store/helper/music";
import { mapActions } from "@/store/helper/music";
export default {
  name: "playUI",
  data() {
    return {
      playOrPause: true,
      audio: "",
      duration: 0,
      maxTime: "00:00",
      curTime: "00:00",
    };
  },
  computed: {
    ...mapGetters(["musicURL", "playType", "isPlaying"]),
  },
  mounted() {
    this.audio = this.$refs.audio;
  },

  methods: {
    ...mapActions(["play", "pause", "ChangePlayType",'setCurrentSeconds']),
    // async getURL() {
    //   const res = await getMusic(139764);
    //   console.log(res)
    //   // console.log(res.data.data[0])
    //   this.url = res.data.data[0].url;
    // },
    onPlay() {
      this.play();
      this.audio.play();
    },
    onPause() {
      this.pause();
      this.audio.pause();
    },
    //暂停，播放
    // changePlay() {
    //   this.playOrPause = !this.playOrPause;
    //   if (this.playOrPause === false) {
    //     this.audio.pause();
    //   } else {
    //     this.audio.play();
    //   }
    // },
    //改变播放模式
    changePlayType() {
      this.ChangePlayType();
    },
    //监测播放到哪一时刻
    onTimeupdate(res) {
      // this.$store.dispatch("saveCurrentSeconds", res.target.currentTime);
      let currentTime = res.target.currentTime;

      this.setCurrentSeconds(Math.round(currentTime))
      // console.log(res.target.currentTime);
      // this.$store.dispatch("saveCurrentSeconds", res.target.currentTime);

      //给用户看的时间
      this.curTime = this.formatTime(currentTime);
      //刷新进度条
      let rate = currentTime / this.duration;
      this.updateProcess(rate);

      //给浏览器存储的时间
      // console.log("update");
    },
    //获取音乐时长
    onLoadedmetadata(res) {
      // console.log(res)
      this.duration = res.target.duration;
      this.maxTime = this.formatTime(this.duration);
    },
    //点击进度条跳转到指定时间
    mouseDown() {
      let pgsWidth = this.$refs.processBox.offsetWidth;
      console.log(pgsWidth);
      let rate = event.offsetX / pgsWidth;
      console.log(rate);
      //操作audio的currentTime属性来跳转音乐时间
      this.audio.currentTime = this.audio.duration * rate;
      //改变显示的时间
      this.curTime = this.formatTime(this.audio.currentTime);
      //刷新进度条
      this.updateProcess(rate);
    },
    //刷新进度条
    updateProcess(value) {
      this.$refs.process.style.width = value * 100 + "%";
    },
    //转换时间格式为 时：分
    formatTime(data) {
      let min = Math.floor(data / 60);
      let sec = Math.floor(data % 60);
      min = ("0" + min).slice(-2);
      sec = ("0" + sec).slice(-2);
      // console.log(min,sec)
      return min + ":" + sec;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: white;
  .btnbox {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 5px;

    & :not(:first-child) {
      margin-left: 30px;
      cursor: pointer;
    }

    & :first-child {
      cursor: pointer;
    }
    img {
      height: 20px;
    }

    .playType {
      height: 20px;
    }
    .playbox {
      height: 40px;
      width: 40px;
      border-radius: 100%;
      background-color: rgb(244, 244, 244);
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: rgb(229, 229, 229);
      }
      .ctlPlay {
        height: 20px;
        /* background-color: red; */
      }
    }
  }

  .processBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span {
      font-size: 1px;
      margin: 0px 10px 0px 10px;
    }

    .process-box {
      height: 3px;
      // width: 400px;
      width: 70%;
      background-color: rgb(205, 205, 205);

      .process {
        height: 3px;
        width: 0px;
        background-color: rgb(255, 97, 91);
      }

      &:hover {
        border-radius: 6px;
        height: 6px;
        .process {
          border-radius: 6px;
          height: 6px;
        }
      }
    }
  }
}

</style>