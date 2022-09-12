<template>
  <div id="box" @scroll="scroll">
    <div v-for="item in mvs" :key="item.id" class="item">
      <div class="pic">
        <img @click="toMv(item.id)" :src="item.imgurl16v9" alt="" />
      </div>
      <div class="title" @click="toMv(item.id)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { artistMv } from "@/http/api/artist";
export default {
  data() {
    return {
      mvs: "",
      offset:0,
      hasMore:false,
      loading:false
    };
  },
  methods: {
    async getData() {
      let res = await artistMv(this.$route.query.id, 20,this.offset);
      this.mvs = res.data.mvs;
      this.hasMore = res.data.hasMore
      // console.log(res);
      // console.log(this.offset);
    },
    toMv(id) {
      this.$router.push({ path: "/mvDetail", query: { id } });
    },
    async more(){
      this.offset += 20
      this.loading = true
      let res = await artistMv(this.$route.query.id, 20,this.offset);
      this.mvs.push.apply(this.mvs,res.data.mvs)
      // console.log(res)
      this.hasMore = res.data.hasMore
      this.loading = false
    },
    scroll(e){
      if (
        e.srcElement.scrollHeight <=
        Math.ceil(e.srcElement.scrollTop + e.srcElement.clientHeight)&&
        !this.loading
      ) {
        if(this.hasMore){
      console.log(this.offset);
          this.more()
        }
      }
    },
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
  .item {
    width: 18%;
    // height: 20vh;
    margin: 0 2% 2% 0;
    .pic {
      width: 100%;
      height: 18vh;
      img {
        width: 100%;
        height: 100%;
        border-radius: 2%;
      }
    }
    .title {
      cursor: pointer;
      margin-top: 2%;
      font-size: 0.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
      // font-weight: 500;
      color: black;
    }
    }
  }
}
</style>