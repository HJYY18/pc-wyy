<template>
  <div class="box">
    <router-link to="/findMusci/playList">推荐歌单</router-link>
    <div class="listBox">
      <!-- <div class="list">
        <img src="" alt="" />
        <span>每日推荐</span>
      </div> -->
      <div
        v-for="item in recList"
        :key="item.id"
        class="list"
        @click="toMusciList(item.id)"
      >
        <img :src="item.picUrl" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!-- <div class="privatecBox">
      <div v-for="item in priList" :key="item.id" class="privateItem">
        <img :src="item.picUrl" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div> -->
    <!-- <button @click="everyList">每日推荐歌单</button>
    <button @click="list">推荐歌单</button>
    <button @click="songs">推荐歌曲</button> -->
    <!-- <button @click="getPrivatecontent">独家放送</button> -->
    <!-- <button @click="latestMusic">最新音乐</button> -->
  </div>
</template>

<script>
import { mapGetters } from "@/store/helper/user";
import {
  recommendMusicList,
  // recommendMusic,
  privatecontent,
  newsong,
} from "@/http/api/findMusic";
export default {
  data() {
    return {
      //推荐歌单
      recList: [],
      //独家放送
      // priList: [],
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    //获得推荐歌单
    everyList() {

        recommendMusicList(10).then((res) => {
          this.recList = res.data.result;
          // console.log(this.recList);
        });
    },

    //获得独家放送信息
    // async getPrivatecontent() {
    //   let res = await privatecontent();
    //   this.priList = res.data.result;
    //   console.log(this.priList);
    //   // console.log(typeof(this.priList))
    // },
    // async list() {
    //   console.log(await recommendMusicList(1));
    // },
    // async songs() {
    //   console.log(await recommendMusic());
    // },
    async person() {
      console.log(await privatecontent());
    },
    async latestMusic() {
      console.log(await newsong(12));
    },
    toMusciList(id) {
      this.$router.push({ path: "/playList", query: { id: id } });
    },
  },
  created() {
    this.everyList();
    // this.getPrivatecontent()
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 4%;
  font-weight: lighter;
  color: rgba(0, 0, 0, 0.833);
}
.listBox {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  .list {
    width: 200px;
    height: 200px;
    // border: 1px solid black;
    span {
      text-align: left;
      margin-left: 0px;
      font-size: 15px;
      cursor: pointer;
      &:hover {
        color: rgba(0, 0, 0);
      }
    }
  }
  & :not(:first-child) {
    margin-left: 20px;
  }
  & :nth-child(6) {
    margin-left: 0px;
  }
  & > * {
    margin-bottom: 70px;
  }
  img {
    width: 100%;
    border-radius: 5%;
    margin-bottom: 10px;
  }
}
</style>