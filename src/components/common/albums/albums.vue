<template>
  <div class="box">
    <div class="listInfo">
      <img :src="coverImgUrl" alt="" />
      <div class="info">
        <div class="line1">
          <span>专辑</span>
          <span>{{ name }}</span>
        </div>
        <div class="line2">
          <div>
            <span>歌手：</span>
            <span>{{ userName }}</span>
          </div>
          <div>
            <span>时间：</span>
            <span>{{ creatTime }}</span>
          </div>
        </div>
        <div>
          <button @click="playAll" class="playAll">播放全部</button>
        </div>
      </div>
    </div>
    <div class="helper">
      <span :class="{ type: type == 1 }" @click="changeType">歌曲列表</span>
      <span :class="{ type: type == 2 }" @click="changeType"
        >评论({{ commentCount }})</span
      >
    </div>
    <div class="list" v-if="type == 1">
      <!-- <button @click="getlistDetail">歌单详情</button>
      <button @click="showQuery">显示query</button> -->
      <songsList ref="song" v-if="this.idList != ''" :songs="songs"></songsList>
    </div>
    <div class="comment" v-else>
      <comment :id="playListId" :type="4"></comment>
    </div>
  </div>
</template>

<script>
import { albumInfo, albumComment } from "@/http/api/album";
import songsList from "./songList.vue";
import comment from "../comment/comment.vue";
export default {
  name: "playList",
  components: { songsList, comment },
  data() {
    return {
      //id
      playListId: "",
      //创建时间
      creatTime: "",
      //创建者name
      userName: "",
      //封面
      coverImgUrl: "",
      //name
      name: "",
      //评论数
      commentCount: "",

      songs: "",
      type: 1,
    };
  },
  methods: {
    async getlistDetail() {
      let res = await albumInfo(this.playListId);
      console.log(res);
      this.coverImgUrl = res.data.album.picUrl;
      this.creatTime = this.changeData(res.data.album.publishTime);
      this.userName = res.data.album.artist.name;
      this.name = res.data.album.name;
      this.songs = res.data.songs;
      // this.idList = res.data.playlist.trackIds

      let res2 = await albumComment(this.playListId);
      this.commentCount = res2.data.total;
      // console.log(res2)
    },
    showQuery() {
      console.log(this.$route);
    },
    //转换时间戳为时间
    changeData(t) {
      t = new Date(t);
      return t.toLocaleDateString().replace(/\//g, "-");
    },
    updateQuery() {
      this.playListId = this.$route.query.id;
    },
    changeType() {
      if (this.type == 1) {
        this.type = 2;
      } else {
        this.type = 1;
      }
    },
    playAll(){
      // this.$refs.song
      this.$refs.song.playMusic(this.songs[0].id)
    },
  },
  created() {
    this.playListId = this.$route.query.id;
    this.getlistDetail();
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        this.updateQuery(newVal, oldVal);
        this.getlistDetail();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  .listInfo {
    display: flex;
    height: auto;
    width: 100%;
    // border: 1px solid black;
    & img {
      height: 200px;
    }
    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-left: 2%;
      .line1 {
        & :first-child {
          font-size: 1px;
          padding: 0.2%;
          color: red;
          border: 0.1px solid red;
          margin-right: 1%;
        }
        & :nth-child(2) {
          font-size: 1.5rem;
          font-weight: 600;
        }
      }
      .line2 {
        font-size: 1px;
        &>*{
          margin: 1% 0;
        }
        & :first-child {
          & :nth-child(2) {
            color: rgb(114, 164, 191);
            margin: 0% 1%;
            cursor: pointer;
          }
        }

        img {
          height: 20px;
        }
      }
      button {
        padding: 0.5% 1%;
        border: none;
        border-radius: 50px;
        margin-right: 1%;
      }
      .playAll {
        background-color: rgb(253, 84, 78);
        color: white;
      }
      .count {
        & :nth-child(1) {
          margin-right: 1%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .helper {
    & > * {
      margin-right: 2%;
      cursor: pointer;
      &:hover {
        color: black;
      }
    }
  }
  .type {
    font-weight: 600;
  }
}
</style>