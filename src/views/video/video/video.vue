<template>
  <div class="box" @scroll="scroll($event)">
    <div class="tabList">
      <div class="dialogBox" @click.stop>
        <div class="dialogBtn" @click="tabShow">{{ cat }} ></div>
        <myDialog class="dialog" v-if="isShow">
          <template v-slot:temp1>
            <tab :groupList="groupList" :cat="cat" @change="OnChange"></tab>
          </template>
        </myDialog>
      </div>

      <div class="hotTagsBox">
        <div class="hotTags">
          <div
            v-for="item in categoryList"
            :key="item.name"
            @click="changeQuery(item.name,item.id)"
            class="hottag"
            :class="{ style1: cat == item.name }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="videoList">
      <div v-for="item in list" :key="item.data.vid" class="item">
          <videoItem :item="item"></videoItem>
      </div>
    </div>
    <div class="loading">loading·······</div>
  </div>
</template>

<script>
import myDialog from "@/components/common/my-dialog.vue";
import tab from "./tab.vue";
import videoItem from './videoItem.vue'
import { videoGroupList, videoCategoryList, getVideo } from "@/http/api/video";
export default {
  components: { myDialog, tab,videoItem },
  data() {
    return {
      isShow: false,
      groupList: "",
      categoryList: "",
      id: 58100,
      list: "",
      offset: 0,
      loading:false
    };
  },
  methods: {
    async start() {
      let res1 = await videoGroupList();
      this.groupList = res1.data.data;
      let res2 = await videoCategoryList();
      this.categoryList = res2.data.data;
    },
    async getData() {
      {
        let res1 = await getVideo(this.id, this.offset);
        let res2 = await getVideo(this.id, this.offset + 8);
        this.offset = 16;
        res1.data.datas.push.apply(res1.data.datas, res2.data.datas);
        this.list = res1.data.datas;
        // console.log(res4);
      }
      // console.log(res1)
      // console.log(res2)
    },
    async more() {
      this.loading = true
      console.log(this.offset);
      let res = await getVideo(this.id, this.offset);
      // console.log(res);
      this.list.push.apply(this.list, res.data.datas);
      this.offset += 8;
      this.loading = false
    },
    tabShow() {
      this.isShow = !this.isShow;
      // console.log(this.$route);
    },
    OnChange(name, id) {
      this.id = id;
      this.isShow = false;
      this.$router.push({ path: "/video/video", query: { cat: name } });
      // this.cat = name;
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
    changeQuery(name,id){
      this.id = id;
      this.$router.push({ path: "/video/video", query: { cat: name } });
    },
    test() {
      console.log(this.cat);
      console.log(this.$route.query.cat);
    },
  },
  created() {
    // console.log(23);
    this.start();
    // console.log(this.$route.query.cat)
    this.cat =
      this.$route.query.cat != undefined ? this.$route.query.cat : "现场";
    // console.log(this.cat)
    this.getData();
  },

  mounted() {
    document.body.addEventListener(
      "click",
      () => {
        this.isShow = false;
      },
      false
    );
  },
  watch: {
    $route: {
      handler() {
        // this.updateQuery(newVal, oldVal);
        // console.log(newVal,oldVal)
        this.cat = this.$route.query.cat;
        this.getData();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
html,
body {
  height: 120%;
}
.style1 {
  background-color: rgb(252, 235, 235);
  color: red;
  border-radius: 20px;
}
.box {
  width: 100%;
  overflow-y: scroll;
  height: 120%;
  // border: 1px solid black;
  .tabList {
    width: 100%;
    display: flex;
    margin-top: 4%;
    // border: 1px solid black;
    // justify-content: space-between;
    .dialogBox {
      position: relative;
      width: 40%;
      // border: 1px solid black;
      margin-bottom: 20px;
      .dialogBtn {
        text-align: center;
        width: 100px;
        height: 30px;
        border-radius: 30px;
        border: 1px solid rgb(190, 186, 186);
        // background-color: red;
      }
      .dialog {
        top: 110%;
        width: 150%;
        height: 50vh;
        position: absolute;
        background-color: white;
        border: 1px solid rgb(190, 186, 186);
        overflow-y: scroll;
      }
    }
    .hotTagsBox {
      width: 60%;
      // border: 1px solid black;
      .hotTags {
        margin-right: 1.5%;
        width: 80%;
        // width: auto;
        // border: 1px solid black;

        display: flex;
        flex-direction: row-reverse;
        font-size: 1px;
        // text-align: right;
        margin-left: auto;
        cursor: pointer;
        .hottag {
          // border: 1px solid black;
          width: auto;
          padding: 0.2% 0.5%;
          // display: flex;
          margin-right: 2.5%;
          &:hover {
            color: black;
          }
        }
      }
    }
  }
  .videoList {
    font-size: 1px;
    height: 95%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 23%;
      margin: 1% 2% 4% 0;

    }
  }
}
</style>