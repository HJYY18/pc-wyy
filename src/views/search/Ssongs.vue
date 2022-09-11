<template>
  <div class="box">
    <div class="header">
      <span class="header1"></span>
      <span class="header2">音乐标题</span>
      <span class="header3">歌手</span>
      <span class="header4">专辑</span>
      <span class="header5">时长</span>
    </div>
    <div
      v-for="(item, index) in songs"
      :key="item.id"
      :class="{ item: true, style1: index % 2 === 0 }"
      @dblclick="playMusic(item.id)"
    >
      <div class="item1">
        <span>{{ ("0" + (index + 1)).slice(-2) }}</span>
        <img
          src="@/assets/imgs/like.png"
          alt=""
          v-if="likedsongIds.indexOf(item.id) == -1"
          @click="like(item.id, false)"
        />
        <img
          src="@/assets/imgs/liked.png"
          alt=""
          v-else
          @click="like(item.id, true)"
        />
        <!-- <img src="@/assets/download.png" alt="" /> -->
      </div>
      <div class="item2">
        <span>{{ item.name }}</span>
      </div>
      <div class="item3">
        <!-- <router-link to="/">{{ artistName(item.artists)}}</router-link> -->
        <aritistName :artistList="item.artists"></aritistName>
      </div>
      <div class="item4">
        <router-link to="/">{{ item.album.name }}</router-link>
      </div>
      <div class="item5">
        <span>{{ convertTIme(item.duration) }}</span>
      </div>
    </div>
    <div class="pagination">
      <pagination
        v-if="songCount > 50"
        @pre="pre"
        @next="next"
        @toPage="toPage"
        :count="Math.ceil(songCount / 50)"
      ></pagination>
    </div>
  </div>
</template>

<script>
// import { getMusic } from "@/http/api/music";
import { searchDetail } from "@/http/api/search";
import { mapActions } from "@/store/helper/search";
import { mapActions as MPAmusic } from "@/store/helper/music";
import { mapActions as mapActionsUser } from "@/store/helper/user";
import { mapState } from "@/store/helper/user";
import aritistName from "@/components/common/aritistName.vue";
import pagination from "../../components/common/pagination.vue";
export default {
  components: { aritistName, pagination },
  data() {
    return {
      keywords: "",
      songs: [],
      songCount: 0,
      offset: 1,
    };
  },
  computed: {
    ...mapState(["likedsongIds"]),
  },
  methods: {
    ...mapActions(["setCount"]),
    ...MPAmusic(["setMusicInfo"]),
    ...mapActionsUser(["likeMusic"]),
    like(id, status) {
      this.likeMusic({ id: id, status: status });
      // console.log(id,status)
    },
    //请求数据
    async getData() {
      const res = await searchDetail(this.keywords, 1, this.offset);
      // console.log(res)
      this.songs = res.data.result.songs;
      // console.log(this.songs)
      this.songCount = res.data.result.songCount;
      this.setCount(this.songCount + "首歌曲");
    },
    //获取其他页的数据
    async more() {
      const res = await searchDetail(this.keywords, 1, this.offset);
      this.songs = res.data.result.songs;
    },
    //处理时间为 分:秒
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
    async playMusic(id) {
      // let res = await getMusic(id);
      // console.log(res.data.data[0].url)
      this.setMusicInfo(id);
    },
    pre() {
      if (this.offset > 0) {
        this.offset -= 50;
        this.more();
      }
    },
    next() {
      if (this.offset < this.songCount) {
        this.offset += 50;
        this.more();
      }
    },
    toPage(page) {
      this.offset = (page - 1) * 50;
      this.more();
    },
  },
  created() {
    // console.log(this.$route.query)
    this.keywords = this.$route.query.s;
    this.getData();
  },
  // watch: {
  //   $route: {
  //     handler() {
  //       this.keywords = this.$route.query.s;
  //       // console.log(newVal,oldVal)
  //       // console.log(this.query)
  //       this.getData();
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: rgb(137, 123, 150);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
a:hover {
  color: #000 !important;
}
.box {
  font-size: 13px;
  color: rgb(150, 136, 165);
}
.header {
  display: flex;
  height: 40px;
}
.item {
  /* border: 1px solid black; */
  display: flex;
}
.item:hover {
  background-color: rgb(240, 241, 242);
}
.item span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.style1 {
  background-color: rgb(249, 249, 249);
}
.item1,
.item2,
.item3,
.item4,
.item5 {
  height: 30px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header1,
.header2,
.header3,
.header4,
.header5 {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
}
.item1,
.header1 {
  width: 5%;
  justify-content: center;
  /* flex-grow: 1; */
}
.item1 img {
  height: 20px;
  padding-left: 15px;
}
.item2,
.header2 {
  width: 40%;
  color: black;
  font-weight: 200px;
  /* flex-grow: 4; */
}
.item3,
.header3 {
  width: 25%;
  /* flex-grow: 2.5; */
}
.item4,
.header4 {
  width: 20%;
  /* flex-grow: 1.5; */
}
.item5,
.header5 {
  width: 10%;
  /* flex-grow: 1; */
  justify-content: center;
}
.pagination {
  width: 100%;
  margin: 2% 0 0 35%;
}
</style>