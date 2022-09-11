<template>
  <div>
    <router-link to="/findMusci/latestMusic">最新音乐</router-link>
    <div class="snogsBox">
      <div v-for="item in songsList" :key="item.id" class="songsItem">
        <img :src="item.picUrl" alt="" @click="playMusic(item.id)" />
        <div class="nameBox" @dblclick="playMusic(item.id)">
          <div class="songName">
            <span>{{ item.name }}</span>
            <span v-if="item.song.alias[0]">({{ item.song.alias[0] }})</span>
            <span v-if="item.song.transName">({{ item.song.transName }})</span>
          </div>
          <div class="artName">
            <aritistName :artistList="item.song.artists"></aritistName>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aritistName from "@/components/common/aritistName.vue";
import { newsong } from "@/http/api/findMusic";
import { mapActions } from "@/store/helper/music";
export default {
  components: { aritistName },
  data() {
    return {
      songsList: [],
    };
  },
  methods: {
    ...mapActions(["setMusicInfo"]),
    async latestMusic() {
      let res = await newsong(12);
      console.log(res);
      this.songsList = res.data.result;
      console.log(this.songsList);
    },
     playMusic(id){
      //提交给vuex
      this.setMusicInfo(id);
    }
  },
  created() {
    this.latestMusic();
  },
};
</script>

<style lang="less" scoped>
.snogsBox {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // margin-bottom: 500px;
  .songsItem {
    width: 31%;
    // border: 1px solid black;
    margin: 0% 2% 20px 0%;
    display: flex;
    font-size: 80%;
    font-weight: 400;
    img {
      width: 15%;
      height: 100%;
      border-radius: 10%;
    }
    .nameBox {
      width: 100%;
      border-radius: 4%;
      padding-left: 3%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &:hover {
        background-color: rgb(234, 234, 234);
      }
      .songName {
        padding-top: 1%;
        & :not(:first-child) {
          padding-left: 1.5%;
          color: rgb(150, 136, 165);
        }
      }
      .artName {
        padding-bottom: 1%;
      }
    }
  }
}
</style>