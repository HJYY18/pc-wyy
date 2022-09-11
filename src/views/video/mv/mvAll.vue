<template>
  <div id="box" @scroll="scroll">
    <div class="title">全部MV</div>
    <div class="show">
      <div class="tabBox">
        <div class="tab">
          <span>地区：</span>
          <mySearchTab
            @itemClick="areaClick"
            :itemList="areaList"
            :name="area"
          ></mySearchTab>
        </div>
        <div class="tab">
          <span>类型：</span>
          <mySearchTab
            @itemClick="typeClick"
            :itemList="typeList"
            :name="type"
          ></mySearchTab>
        </div>
        <div class="tab">
          <span>排序：</span>
          <mySearchTab
            @itemClick="orderClick"
            :itemList="orderList"
            :name="order"
          ></mySearchTab>
        </div>
      </div>
      <div class="mvList">
        <div v-for="item in mvList" :key="item.id" class="item">
          <mvitem :item="item"></mvitem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mySearchTab from "@/components/common/my-searchTab.vue";
import mvitem from "./mvitem.vue";
import { mvAll } from "@/http/api/video";
export default {
  components: { mySearchTab,mvitem },
  data() {
    return {
      areaList: [
        { name: "全部" },
        { name: "内地" },
        { name: "港台" },
        { name: "欧美" },
        { name: "韩国" },
        { name: "日本" },
      ],
      typeList: [
        { name: "全部" },
        { name: "官方版" },
        { name: "原声" },
        { name: "现场版" },
        { name: "网易出品" },
      ],
      orderList: [{ name: "上升最快" }, { name: "最热" }, { name: "最新" }],
      area: "全部",
      type: "全部",
      order: "上升最快",
      mvList: "",
      offset: 0,
      loading:false
    };
  },
  methods: {
    async getData() {
      let res = await mvAll(this.area, this.type, this.order, 16, this.offset);
      this.mvList = res.data.data
      // console.log(res);
    },
    areaClick(item) {
      this.area = item.name
      this.getData()
    },
    typeClick(item) {
      this.type = item.type
      this.getData()
    },
    orderClick(item) {
      this.order = item.order
      this.getData()
    },
    async more(){
      this.loading = true
      this.offset +=16
      let res = await mvAll(this.area, this.type, this.order, 16, this.offset);
      this.mvList.push.apply(this.mvList,res.data.data)
      this.loading = false
    },
    scroll(e) {
      if (
        e.srcElement.scrollHeight <=
        Math.ceil(e.srcElement.scrollTop + e.srcElement.clientHeight)&&
        !this.loading
      ) {
        // console.log(this.list)
        this.more();
        // console.log(this.list)
        console.log("scrollHeight:" + e.srcElement.scrollHeight);
        console.log("scrollTop:" + e.srcElement.scrollTop);
        console.log("clientHeight:" + e.srcElement.clientHeight);
        // console.log(this.list)
      }

    //   // el.scrollHeight === el.scrollTop + el.clientHeight
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
  font-size: 1px;
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  .title{
    font-size: 1.5rem;
    font-weight: 600;
  }
  // padding: 10%;
  .show {
    padding: 2% 0% 0 5%;
    // border: 1px solid black;
    .tabBox {
      width: 100%;
      .tab {
        width: 100%;
        display: flex;
        // margin-bottom: 1.5%;
        span {
          width: 5%;
        }
      }
    }
    .mvList{
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 22%;
        margin: 0 2% 2% 0;
      }
    }
  }
}
</style>