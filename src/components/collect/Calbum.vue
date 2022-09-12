<template>
  <div id="box">
    <div
      v-for="(item, index) in albums"
      :key="item.id"
      class="item"
      :class="{ style1: index % 2 == 0 }"
      @click="toAlbum(item.id)"
    >
      <div class="img">
        <img :src="item.picUrl" alt="" />
      </div>
      <div class="name">
        <span>{{ item.name }}</span>
        <span v-if="item.alias[0]">({{ item.alias[0] }})</span>
      </div>
      <div class="artist">
        <aritistName :artistList="item.artists"></aritistName>
      </div>
      <div class="size">{{ item.size }}首</div>
    </div>
  </div>
</template>

<script>
import { albumSub } from "@/http/api/collect";
import aritistName from "../common/aritistName.vue";
export default {
  components: { aritistName },
  data() {
    return {
      offset: 0,
      albums: "",
    };
  },
  methods: {
    async getData() {
      let res = await albumSub(this.offset);
      this.albums = res.data.data;
      console.log(res);
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
      width: 50%;
    }
    .artist {
      width: 30%;
    }
    .size {
      width: 10%;
    }
  }
}
</style>