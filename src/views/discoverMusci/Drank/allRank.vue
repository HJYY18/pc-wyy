<template>
  <div>
    <div>全球榜单</div>
    <div class="itemBox">
      <div v-for="item in list" class="item" :key="item.id">
        <img :src="item.coverImgUrl" alt="" @click="toMusicList(item.id)" />
        <div class="wordInfo" @click="toMusicList(item.id)">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toplistDetail } from "@/http/api/findMusic";
export default {
  data() {
    return {
      //全部歌单
      list: [],
    };
  },
  methods: {
    async getData() {
      let res = await toplistDetail();
      this.list = res.data.list.slice(4);
    },
    toMusicList(id) {
      this.$router.push({ path: "/playList", query: { id } });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.itemBox {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .item {
    width: 19%;
    margin-right: 1%;
    // border: 1px solid black;
    font-size: 15px;
    margin-bottom: 2%;
    img {
      width: 100%;
      border-radius: 2%;
      margin-bottom: 2%;
    }
    .wordInfo {
      cursor: pointer;
      &:hover {
        color: black;
      }
    }
  }
}
</style>