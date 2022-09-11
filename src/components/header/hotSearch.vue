<template>
  <div class="box">
    <div>热搜榜</div>
    <div class="itemBox">
      <div
        v-for="(item, index) in list"
        :key="item.searchWord"
        class="item"
        @click="search(item.searchWord)"
      >
        <div class="index">{{ index + 1 }}</div>
        <div class="info">
          <div class="name">
            <div>{{ item.searchWord }}</div>
            <div>{{ item.score }}</div>
          </div>
          <div class="content">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchHotDetail } from "@/http/api/search.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async getData() {
      let res = await getSearchHotDetail();
      this.list = res.data.data;
    },
    search(keywords) {
      console.log('search')
      this.$emit('hotsearch',keywords);
      this.$router.push({ path: "/search/songs", query: { s: keywords } });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.box {
  .itemBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 10px;
    .item {
      display: flex;
      height: 6vh;
      // border: 1px solid black;
      align-items: center;
      cursor: pointer;
      &:hover{
        background-color: rgb(242,242,242);
      }
      .index {
        width: 10%;
        font-size: 20px;
      }
      .info {
        width: 85%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: start;
        margin-left: 2%;
        // border: 1px solid black;
        .name {
          display: flex;
          flex-direction: row;
          & :nth-child(1) {
            color: rgb(42, 40, 40);
          }
          & :nth-child(2) {
            color: rgb(198, 188, 188);
            // overflow: hidden;
          }
        }
        .content {
          color: rgb(198, 188, 188);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>