<template>
  <div class="box">
    <!-- <div class="boutique" v-if="this.highTags.indexOf(this.cat) != -1" @click="toHighList">
      精品歌单
      <button @click="t1">歌单分类</button>
      <button @click="t2">热门歌单分类</button>
      <button @click="t3">歌单 ( 网友精选碟 )</button>
      <button @click="t4">精品歌单标签列表</button>
      <button @click="t5">获取精品歌单</button>
      <div>
        <img :src="highList[0].coverImgUrl" alt="">
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div> -->
    <div class="tabList">
      <div class="dialogBox" @click.stop>
        <div class="dialogBtn" @click="tabsShow">华语 ></div>
        <myDialog class="dialog" v-if="isShow">
          <template v-slot:temp1>
            <tabs @change="OnChange"></tabs>
          </template>
        </myDialog>
      </div>

      <div class="hotTagsBox">
        <div class="hotTags">
          <span
            v-for="item in tags"
            :key="item.name"
            @click="changeQuery(item.name)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="musicList">
      <div v-for="item in musicList" :key="item.id" class="item">
        <div class="itemImg" @click="toPlayList(item.id)">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <span @click="toPlayList(item.id)">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import myDialog from "@/components/common/my-dialog.vue";
import tabs from "./tabs.vue";
import {
  playlistCatlist,
  playlisthot,
  topPlaylist,
  playlisHighTag,
  playlistHighquality,
} from "@/http/api/findMusic";
export default {
  components: { myDialog, tabs },
  data() {
    return {
      isShow: false,
      tags: [],
      cat: "",
      musicList: [],
      highTags: [],
      highList: "",
    };
  },
  methods: {
    async t1() {
      console.log(await playlistCatlist());
    },
    async t2() {
      console.log(await playlisthot());
    },
    async t3() {
      console.log(await topPlaylist(this.cat));
    },
    async t4() {
      console.log(await playlisHighTag());
    },
    async t5() {
      console.log(await playlistHighquality(this.cat));
    },
    tabsShow() {
      this.isShow = !this.isShow;
      console.log(this.$route);
    },
    changeQuery(name) {
      this.$router.push({ path: "/findMusci/playList", query: { cat: name } });
    },
    updateQuery() {
      this.cat = this.$route.query.cat;
    },
    async getData() {
      //获取对应的歌单列表
      let res = await topPlaylist(this.cat);
      this.musicList = res.data.playlists;
      //获取有精品歌单的tag
      // let res2 = await playlisHighTag();
      // this.highTags = []
      // for(let key in res2.data.tags){
      //   this.highTags.push(res2.data.tags[key].name)
      //   // console.log(tag)
      // }
      // this.highTags = res2.data.tags;

      //如果有精品歌单就渲染
      // if (this.highTags.indexOf(this.cat) != -1) {
      //   console.log('inin')
      //   let res3 = await playlistHighquality(this.cat);
      //   this.highList = res3.data.playlists
      // }
    },
    OnChange() {
      // console.log('change')
      this.isShow = false;
    },
    //跳转到对应歌单页
    toPlayList(id) {
      this.$router.push({ path: "/playList", query: { id } });
    },
  },
  created() {
    // this.highList = ''
    //渲染hotlist
    playlisthot().then((res) => {
      this.tags = res.data.tags.reverse();
    });
    //从query获取对应cat
    this.cat = this.$route.query.cat;
    //获取数据
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
      handler(newVal, oldVal) {
        this.updateQuery(newVal, oldVal);
        // console.log(newVal,oldVal)
        this.getData();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: auto;
}
// .boutique {
//   width: 100%;
//   // height: calc(~'100vh * 20%') ;
//   height: 100vh * 0.2;
//   border: 1px solid black;
//   margin-bottom: 20px;
// }
.tabList {
  width: 100%;
  // display: flex;
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
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
      width: 200%;
      position: absolute;
      background-color: white;
      border: 1px solid rgb(190, 186, 186);
    }
  }
  .hotTagsBox {
    width: 60%;
    // position: relative;
    text-align: right;
    .hotTags {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      font-size: 1px;
      text-align: right;
      cursor: pointer;
      & > * {
        margin-right: 2.5%;
      }
    }
  }
}

.musicList {
  width: 100%;
  // border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  .item {
    display: flex;
    flex-direction: column;
    width: 19%;
    padding-right: 1%;
    padding-bottom: 2%;
    .itemImg {
      // width: 20%;
      // border: 1px solid black;
      img {
        width: 100%;
        border-radius: 5%;
      }
    }
    span {
      font-size: 15px;
      color: rgb(80, 78, 77);
      cursor: pointer;
      &:hover {
        color: rgb(0, 0, 0);
      }
    }
  }
}
</style>