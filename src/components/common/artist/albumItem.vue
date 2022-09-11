<template>
  <div class="box">
    <div class="left">
      <div class="img">
        <img :src="album.blurPicUrl" alt="" />
      </div>
      <div>{{changeData(album.publishTime) }}</div>
    </div>
    <div class="right">
      <div>{{ album.name }}</div>
      <div class="songList">
        <div
          v-for="(item, index) in songs"
          :key="item.id"
          :class="{ style1: index % 2 == 0 }"
        >
          <songItem @play="play" :item="item" :index="index"></songItem>
        </div>
        <div class="showall" @click="toAlbum(album.id)" v-if="!showall && count > 10">
          查看全部{{ count }}首>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { albumInfo } from "@/http/api/album";
import songItem from "./songItem.vue";
import { mapActions } from "@/store/helper/music";
export default {
  props: ["id"],
  components: { songItem },
  data() {
    return {
      songs: "",
      album: "",
      allSongs: "",
      count: "",
      showall: false,
    };
  },
  methods: {
    ...mapActions(["setPlayList"]),

    async getData() {
      let res = await albumInfo(this.id);
      this.album = res.data.album;
      this.allSongs = res.data.songs;
      this.count = this.allSongs.length;
      this.songs = this.allSongs.slice(0, 10);
      // console.log(res);
    },
    play() {
      //   console.log("play");
      this.setPlayList(this.songs);
    },
    //转换时间戳为时间
    changeData(t) {
      t = new Date(t);
      return t.toLocaleDateString().replace(/\//g, "-");
    },
    toAlbum(id){
      this.$router.push({path:'/albums',query:{id}})
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  display: flex;
  margin: 3% 0;
  .left {
    width: 15%;
    .img {
      width: 100%;
      img {
        width: 100%;
        border-radius: 5%;
      }
    }
  }
  .right {
    margin-left: 5%;
    width: 75%;
    font-size: 0.8rem;
    .songList {
      & > * {
        height: 3.5vh;
        &:hover {
          background-color: rgb(240, 241, 242);
        }
      }
      .showall {
        cursor: pointer;
        font-size: 1px;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        background-color: rgb(249, 249, 249);
        color: rgb(183, 178, 178);
        &:hover {
          background-color: rgb(240, 241, 242);
          color: black;
        }
      }
    }
  }
}
</style>