<template>
  <div id="box">
    <div
      v-for="(item, index) in artists"
      :key="item.id"
      class="item"
      :class="{ style1: index % 2 == 0 }"
      @click="toArtist(item.id)"
    >
      <div class="img">
        <img :src="item.picUrl" alt="" />
      </div>
      <div class="name">
        <span>{{ item.name }}</span>
      </div>
      <div class="al">专辑:{{item.albumSize}}</div>
      <div class="mv">MV:{{item.mvSize}}</div>
    </div>
  </div>
</template>

<script>
import { artistSub } from "@/http/api/collect";
export default {
  data() {
    return {
      offset: 0,
      artists:''
    };
  },
methods: {
  async getData() {
    let res = await artistSub(this.offset)
    this.artists = res.data.data
    console.log(res)
  },
  toArtist(id){
      this.$router.push({path:'/artist',query:{id}})
    }
},
created() {
  this.getData()
},

}
</script>

<style lang="less" scoped>
.style1 {
  background-color: rgb(249, 249, 249);
}
#box {
  width: 100%;
  font-size: 1px;
  // border: 1px solid black;
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1% 0;
    cursor: pointer;
    &:hover {
      background-color: rgb(240, 241, 242);
    }
    .img {
      width: 5%;
      margin-right: 3%;
      img {
        width: 100%;
      }
    }
    .name {
      font-size: 1rem;
      width: 60%;
    }
    .al{
      width: 10%;
      margin-right: 5%;
    }
    .mv{
      width: 10%;
    }
  }
}
</style>