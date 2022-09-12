<template>
  <div class="box">
    <div class="top">
      <div class="img"><img src="@/assets/imgs/top50.png" alt="" /></div>
      <div class="songBox">
        <div>热门50首</div>
        <div class="songList">
          <div
            v-for="(item, index) in songList"
            :key="item.id"
            :class="{ style1: index % 2 == 0 }"
          >
            <songItem v-if="item" @play="play" :item="item" :index="index"></songItem>
          </div>
          <div class="showall" @click="showAll" v-if="!showall && count>10">
            查看全部{{count}}首>
          </div>
        </div>
      </div>
    </div>
    <div>
        <div v-for="item in hotAlbums" :key="item.id">
            <albumItem :id="item.id"></albumItem>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "@/store/helper/music";
import { artistTop, artistAlbum } from "@/http/api/artist";
import songItem from "../songItem.vue";
import albumItem from "../albumItem.vue";
export default {
  components: { songItem ,albumItem},
  data() {
    return {
      songList: "",
      allList: "",
      showall: false,
      count:'',
      hotAlbums:'',
      hasMore:'',
      offset:0
    };
  },
  methods: {
    ...mapActions(["setPlayList"]),

    async getData() {
      let res1 = await artistTop(this.$route.query.id);
      this.allList = res1.data.songs;
      this.songList = this.allList.slice(0, 10);
      this.count = this.allList.length
      // console.log(res1)
      let res2 = await artistAlbum(this.$route.query.id,this.offset);
      this.hotAlbums = res2.data.hotAlbums
      console.log(res2);
      this.hasMore = res2.data.more
    },
    play() {
    //   console.log("play");
      this.setPlayList(this.allList);
    },
    showAll(){
        this.showall = true
        this.songList = this.allList 
    },
    async more(){
      if(this.hasMore){
        this.offset += 15
        let res = await artistAlbum(this.$route.query.id,this.offset)
        console.log(res)
        this.hasMore = res.data.more
        this.hotAlbums.push.apply(this.hotAlbums,res.data.hotAlbums)
      }
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.style1 {
  background-color: rgb(249, 249, 249);
}
.box {
  width: 100%;
  // overflow-y:hidden ;
  .top {
    width: 100%;
    display: flex;
    .img {
      width: 10%;
    }
    .songBox {
      margin-left: 10%;
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
}
</style>