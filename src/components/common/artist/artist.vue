<template>
  <div class="box" @scroll="scroll">
    <!-- <button @click="getData">test</button> -->
    <div class="user">
      <div class="avatar">
        <img v-if="info.user" :src="info.user.avatarUrl" alt="">
        <img v-else :src="info.artist.cover" alt="">
      </div>
      <div class="info">
        <div class="name">{{info.artist.name}}</div>
        <div>
          <button @click="sub" v-if="followed">已收藏</button>
          <button @click="sub" v-else>收藏</button>
          <button @click="toUser">个人主页</button>
        </div>
        <div class="count">
          <span>单曲数:{{info.artist.musicSize}}</span>
          <span>专辑数:{{info.artist.albumSize}}</span>
          <span>mv数:{{info.artist.mvSize}}</span>
        </div>
      </div>
    </div>
    <div class="router">
      <router-link :to="{path:'album',query:{id:this.$route.query.id}}">专辑</router-link>
      <router-link :to="{path:'mv',query:{id:this.$route.query.id}}">MV</router-link>
      <router-link :to="{path:'detail',query:{id:this.$route.query.id}}">歌手详情</router-link>
    </div>
    <div class="main">
      <router-view ref="main"></router-view>
    </div>
  </div>
</template>

<script>
import {
  // artistTop,
  // artistMv,
  artistAlbum,
  // artistDesc,
  artistDetail,
  artistSub
} from "@/http/api/artist";
export default {
  data() {
    return {
      top: '',
      mv:'',
      albums:'',
      desc:'',
      info:'',
      loading:false,
      followed:'',
      userId:''
    };
  },
  methods: {
    async getData() {
      //歌手信息
      let res = await artistDetail(this.$route.query.id);
      this.info = res.data.data
      this.userId = res.data.data.user.userId
      // console.log("detail");
      console.log(res);
      let res2 = await artistAlbum(this.$route.query.id,0);
      this.followed = res2.data.artist.followed
    },
    //加载更多
    scroll(e){
      if (
        e.srcElement.scrollHeight <=
        Math.ceil(e.srcElement.scrollTop + e.srcElement.clientHeight)&&
        !this.loading
      ) {
        this.$refs['main'].more()
      }
    },
    async sub(){
       let res = await artistSub(this.$route.query.id,this.followed?2:1)
       if(res.data.code == 200){
        this.followed = !this.followed
       }else{
        alert('操作失败')
       }
    },
    toUser(){
      this.$router.push({path:'/user',query:{id:this.userId}})
    }
  },
  created() {
    this.getData()
  },
  
};
</script>

<style lang="less" scoped>
.box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  .user{
    width: 100%;
    display: flex;
    .avatar{
      width: 15%;
      img{
        width: 100%;
        border-radius: 2%;
      }
    }
    .info{
      width: 100%;
      margin-left: 2%;
      .name{
        font-size: 1.5rem;
        font-weight: 600;
      }
      .count{
        &>*{
          margin-right: 2%;
          font-size: 1px;
        }
      }
      button{
        background-color: white;
        padding: 0.5% 2%;
        margin: 1% 1% 1% 0;
        border-radius: 100vh;
        border: 0.1px solid rgb(209, 204, 204);
        &:hover{
          background-color: rgb(242,242,242);
        }
      }
    }
  }

  .router{
    margin: 2% 0 1% 0;
    &>*{
      margin-right: 2%;
      // margin:2% 2% 1% 0;
      // border: 1px solid black;
    }
  }
}
</style>