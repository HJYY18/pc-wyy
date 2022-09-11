<template>
  <div class="box" @scroll="scroll">
    <!-- <button @click="getData">test</button> -->
    <div class="user">
      <div class="avatar">
        <img v-if="info.user" :src="info.user.avatarUrl" alt="">
        <img v-else :src="info.artist.cover" alt="">
      </div>
      <div class="info">
        <div>{{info.artist.name}}</div>
        <div>
          <button>收藏</button>
          <button>个人主页</button>
        </div>
        <div>
          <span>单曲数:{{info.artist.musicSize}}</span>
          <span>专辑数:{{info.artist.albumSize}}</span>
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
  // artistAlbum,
  // artistDesc,
  artistDetail,
} from "@/http/api/artist";
export default {
  data() {
    return {
      top: '',
      mv:'',
      albums:'',
      desc:'',
      info:'',
      loading:false
    };
  },
  methods: {
    async getData() {
      // //top50
      // let res = await artistTop(this.$route.query.id);
      // console.log("top50");
      // console.log(res);

      // //mv
      // let res2 = await artistMv(this.$route.query.id);
      // console.log("mv");
      // console.log(res2);

      // //请求太快得不到数据
      // setTimeout(() => {}, 100);

      // //专辑
      // let res3 = await artistAlbum(this.$route.query.id);
      // console.log("album");
      // console.log(res3);

      // //歌手描述
      // let res4 = await artistDesc(this.$route.query.id);
      // console.log("desc");
      // console.log(res4);
      
      // //请求太快得不到数据
      // setTimeout(() => {}, 100);

      //歌手信息
      let res = await artistDetail(this.$route.query.id);
      this.info = res.data.data
      // console.log("detail");
      console.log(res);
    },
    //加载更多
    scroll(e){
      if (
        e.srcElement.scrollHeight <=
        Math.ceil(e.srcElement.scrollTop + e.srcElement.clientHeight)&&
        !this.loading
      ) {
        this.$refs['main'].more()
        // this.more();
        // console.log(this.list)
        // console.log("scrollHeight:" + e.srcElement.scrollHeight);
        // console.log("scrollTop:" + e.srcElement.scrollTop);
        // console.log("clientHeight:" + e.srcElement.clientHeight);
      }
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
      margin-left: 2%;
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