<template>
  <div id="box">
    <div v-for="item in videos" :key="item.vid" class="item">
      <div class="img" @click="toVide(item.type,item.vid)">
        <img :src="item.coverUrl" alt="" />
      </div>
      <div class="title" @click="toVide(item.type,item.vid)">
        <span class="mv" v-if="item.type == 0">MV</span>
        <span>{{ item.title }}</span>
      </div>
      <div class="name" @click="toUser(item.type,item.creator[0].userId)">
        {{ item.creator[0].userName }}
      </div>
    </div>
  </div>
</template>

<script>
import { mvSub } from "@/http/api/collect";
export default {
  data() {
    return {
      videos: "",
      offset: 0,
    };
  },
  methods: {
    async getData() {
      let res = await mvSub(this.offset);
      this.videos = res.data.data;
      console.log(res);
    },
    toVide(type,id){
      if(type == 0) this.$router.push({path:'/mvDetail',query:{id}})
      else this.$router.push({path:'/videoDetail',query:{id}})
    },
    toUser(type,id){
      if(type == 1) this.$router.push({path:'/user',query:{id}})
      else this.$router.push({path:'/artist',query:{id}})
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
#box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 1px;
  .item {
    width: 20%;
    margin-right: 5%;
    margin-bottom: 2%;
    .img {
      width: 100%;
      img {
        width: 100%;
        height: 20vh;
      }
    }
    .title {
      margin: 1% 0;
      color: black;
      font-weight: 500;
      font-size: 1rem;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .mv{
        font-size: 1px;
        color: red;
        border: 0.1px solid red;
        margin-right: 2%;
      }
    }
    .name {
      cursor: pointer;
      &:hover {
        color: black;
      }
    }
  }
}
</style>