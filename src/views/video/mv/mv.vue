<template>
  <div class="box">
    <div class="latest">
      <div class="tab">
        <div @click="toMVall('全部','全部','最新')" class="title">最新MV ></div>
        <div class="tabList">
          <div
            class="tabItem"
            v-for="item in tabList"
            :key="item"
            @click="changeTab(item)"
            :class="{ style1: item == area }"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="list">
        <div v-for="item in latestList" :key="item.id" class="item">
          <mvitem :item="item"></mvitem>
        </div>
      </div>
    </div>
    <div class="hot">
      <div @click="toMVall('全部','全部','最热')" class="title">热播MV ></div>
      <div class="list">
        <div v-for="item in hotList" :key="item.id" class="item">
          <mvitem :item="item"></mvitem>
        </div>
      </div>
    </div>

    <div class="WangYi">
      <div @click="toMVall('全部','网易出品','最新')" class="title">网易独家 ></div>
      <div class="list">
        <div v-for="item in wangYiList" :key="item.id" class="item">
          <mvitem :item="item"></mvitem>
        </div>
      </div>
    </div>
    <!-- <button @click="test">test</button> -->
  </div>
</template>

<script>
import mvitem from "./mvitem.vue";
import { mvLatest, mvAll } from "@/http/api/video";
export default {
  components: { mvitem },
  data() {
    return {
      tabList: ["韩国", "日本", "欧美", "港台", "内地"],
      latestList: "",
      hotList: "",
      wangYiList: "",
      area: "",
    };
  },
  methods: {
    async getData() {
      let res = await mvLatest(this.area);
      this.latestList = res.data.data;

      let res2 = await mvAll("全部", "网易出品", "最新", 8);
      this.wangYiList = res2.data.data;

      let res3 = await mvAll("全部", "全部", "最热", 8);
      this.hotList = res3.data.data;
    },
    async update() {
      let res = await mvLatest(this.area);
      this.latestList = res.data.data;
    },
    changeTab(name) {
      this.area = name;
      this.update();
    },
    toMVall(area,type,order){
      this.$router.push({path:'/mvAll',query:{area,type,order}})
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.style1 {
  background-color: rgb(252, 235, 235);
  color: red;
  border-radius: 20px;
  &:hover {
    color: red !important;
  }
}
.box {
  width: 100%;
  .latest,
  .hot,
  .WangYi {
    width: 100%;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    .tab {
      width: 94%;
      display: flex;
      margin-bottom: 1%;
      // justify-content: space-between;
      .tabList {
        width: 80%;
        margin-left: auto;
        display: flex;
        flex-direction: row-reverse;
        .tabItem {
          font-size: 1px;
          width: 5%;
          text-align: center;
          cursor: pointer;
          &:hover {
            color: black;
          }
          // margin-left: 10px;
        }
      }
    }
  }

  .title {
    margin-bottom: 1%;
    width: 20%;
    font-size: 1.2rem;
    font-weight: 600;
    color: black;
    cursor: pointer;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    .item {
      width: 22%;
      margin-right: 2%;
      // height: 100%;
    }
  }
}
</style>