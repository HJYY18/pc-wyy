<template>
  <div class="box">
    <div class="listInfo">
      <img :src="coverImgUrl" alt="" />
      <div class="info">
        <div class="line1">
          <span>歌单</span>
          <span>{{ name }}</span>
        </div>
        <div class="line2">
          <img :src="avatarUrl" alt="" />
          <span>{{ userName }}</span>
          <span>{{ creatTime }}创建</span>
        </div>
        <div>
          <button @click="playAll" class="playAll">播放全部</button>
          <button @click="collect" v-if="subscribed" class="collect">已收藏({{subscribedCount}})</button>
          <button @click="collect" v-else class="collect">收藏({{subscribedCount}})</button>
        </div>
        <div class="count">
          <span>歌曲：{{ musicCount }}</span>
          <span>播放：{{ playCount }}</span>
        </div>
        <div class="desc">
          简介：{{desc}}
        </div>
      </div>
    </div>
    <div class="helper">
      <span :class="{type:type == 1}" @click="changeType">歌曲列表</span>
      <span :class="{type:type == 2}" @click="changeType">评论({{ commentCount }})</span>
    </div>
    <div class="list" v-if="type==1">
      <!-- <button @click="getlistDetail">歌单详情</button>
      <button @click="showQuery">显示query</button> -->
      <songsList ref="song" :idList="idList"></songsList>
    </div>
    <div class="comment" v-else>
      <comment :id="this.playListId" :type="3"></comment>
    </div>
  </div>
</template>

<script>
import { playListDetail,playListSubscribe } from "@/http/api/musicList";
import comment from "../comment/comment.vue";
import songsList from "./songsList.vue";
export default {
  name: "playList",
  components: { songsList,comment },
  data() {
    return {
      //歌单id
      playListId: "",
      //歌单创建时间
      creatTime: "",
      //歌单创建者name
      userName: "",
      //歌单封面
      coverImgUrl: "",
      //创建者头像
      avatarUrl: "",
      //歌单name
      name: "",
      //歌单总音乐数
      musicCount: "",
      //歌单播放数
      playCount: "",
      //收藏数
      subscribedCount:'',
      //简介
      desc:'',
      //歌单评论数
      commentCount: "",
      //歌曲ids
      idList: "",
      //是否收藏
      subscribed:'',
      type:1
    };
  },
  methods: {
    async getlistDetail() {
      let res = await playListDetail(this.playListId);
      console.log(res);
      this.coverImgUrl = res.data.playlist.coverImgUrl;
      this.creatTime = this.changeData(res.data.playlist.createTime);
      this.userName = res.data.playlist.creator.nickname;
      this.avatarUrl = res.data.playlist.creator.avatarUrl;
      this.name = res.data.playlist.name;
      this.musicCount = res.data.privileges.length;
      this.playCount = res.data.playlist.playCount;
      this.subscribedCount = res.data.playlist.subscribedCount
      this.desc = res.data.playlist.description
      this.commentCount = res.data.playlist.commentCount;
      this.idList = res.data.playlist.trackIds;
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
    //播放全部
    playAll(){
      // this.$refs.song
      this.$refs.song.playMusic(this.idList[0].id)
    },
    //收藏歌单
    collect(){
      if(this.subscribed){
        playListSubscribe(2,this.playListId)
        this.subscribed = false
        this.subscribedCount -=1
      }else{
        playListSubscribe(1,this.playListId)
        this.subscribed = true
        this.subscribedCount +=1
      }
    },
    changeType(){
      if(this.type == 1){
        this.type = 2
      }else{
        this.type = 1
      }
    }
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
}
.listInfo {
  display: flex;
  height: auto;
  width: 100%;
  // border: 1px solid black;
}
.listInfo img {
  height: 200px;
}
.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  font-size: 1px;
  & > * {
    margin-top: 1%;
    // height: 20%;
  }
  .line1{
    width: 100%;
    & :nth-child(1){
      font-size: 1px;
      padding: 0.2%;
      color: red;
      border: 0.1px solid red;
      margin-right: 1%;
    }
    & :nth-child(2){
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
  .line2 {
    font-size: 1px;

    & :nth-child(2){
      color: rgb(114, 164, 191);
      margin: 0% 1%;
    }
  }
  img {
    height: 3vh;
    border-radius: 100%;
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
  .count{
    & :nth-child(1){
      margin-right: 1%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.helper{
  &>*{
    margin-right: 2%;
    cursor: pointer;
    &:hover{
      color: black;
    }
  }
}
.type{
  font-weight: 600;
}
.comment{
  width: 100%;
  // margin-left: 25%;
}
</style>