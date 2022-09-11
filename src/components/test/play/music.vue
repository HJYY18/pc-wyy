<template>
  <div>
    <button @click="getURL">点击获取音乐url</button>
    <!-- <audio autoplay :src="url" class="player" ref="audio"></audio> -->
    <!-- <button @click="paly">play</button> -->
    <!-- <button @click="pause">pause</button> -->
    <!-- <div class="box">
      <div>
        <img src="@/assets/orderPlay.png" alt="" v-if="playType === 1" @click="changePlayType" class="playType">
        <img src="@/assets/listPlay.png" alt="" v-if="playType === 2" @click="changePlayType" class="playType">
        <img src="@/assets/singlePlay.png" alt="" v-if="playType === 3" @click="changePlayType" class="playType">
        <img src="@/assets/randPlay.png" alt="" v-if="playType === 4" @click="changePlayType" class="playType">
      </div>
      
      <img src="@/assets/preMusic.png" alt="">
      <div class="playbox">
        <img
          class="ctlPlay"
          src="@/assets/pause.png"
          alt=""
          v-if="playOrPause"
          @click="changePlay"
        />
        <img
          class="ctlPlay"
          src="@/assets/play.png"
          alt=""
          v-else
          @click="changePlay"
        />
      </div>
      <img src="@/assets/nextMusic.png" alt="">
      <img src="@/assets/lyric.png" alt="">
    </div> -->
  </div>
</template>

<script>
import { getMusic } from "@/http/api/music";
// import { mapState } from '@/store/helper/music';
import { mapActions } from '@/store/helper/music';
export default {
  name: "music",
  data() {
    return {
      url: "",
      playOrPause: true,
    };
  },
  // computed:{
  //   ...mapState(['playType']),
  // },
  methods: {
    ...mapActions(['getMusicURL']),
    // async getURL() {
    //   const res = await getMusic(139764);
    //   console.log(res)
    //   // console.log(res.data.data[0])
    //   this.url = res.data.data[0].url;
    // },
    // paly() {
    //   this.$refs.audio.play();
    // },
    // pause() {
    //   this.$refs.audio.pause();
    // },
    // //暂停，播放
    // changePlay() {
    //   this.playOrPause = !this.playOrPause;
    //   if (this.playOrPause === false) {
    //     this.$refs.audio.pause();
    //   } else {
    //     this.$refs.audio.play();
    //   }
    // },
    // changePlayType(){
    //   this.ChangePlayType()
    // }

    async getURL(){
      let res = await getMusic(139764);
      // console.log(res)
      this.getMusicURL(res.data.data[0].url)
    }
  },
};
</script>

<style scoped>
.box{
  display: flex;
  justify-content: center;
  align-items: center;
}
.box > *{
  margin-left: 30px;
    cursor: pointer;
}
.box img{
  height: 20px;
}
.player {
  border: 1px solid black;
}
.playbox {
  height: 40px;
  width: 40px;
  border-radius: 100%;
  background-color: rgb(244, 244, 244);
  display: flex;
  justify-content: center;
  align-items: center;
}
.playbox:hover {
  background-color: rgb(229, 229, 229);
}
.ctlPlay {
  height: 20px;
  /* background-color: red; */
}
.playType{
  height: 20px;
}
</style>