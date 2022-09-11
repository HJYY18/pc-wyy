<template>
  <div class="box">
    <div class="tab">
      <div class="tab1">
        <span
          v-for="item in typeList"
          :key="item.type"
          :class="{ tab1: true, style1: item.type == $route.query.type }"
          @click="change(item.type)"
        >
          {{ item.name }}
        </span>
      </div>
      <div class="tab2">
        <span>播放全部</span>
        <span>收藏全部</span>
      </div>
    </div>
    <div class="itemBox">
      <!-- 新歌速递+{{this.$route.query.type}} -->
      <div v-for="(item, index) in songList" :key="item.id" :class="{item:true,style2:index%2 == 0}" @dblclick="playMusic(item.id)">
        <div class="item1">
          <span>{{ ("0" + (index+1)).slice(-2) }}</span>
          <div class="item1Img">
            <img v-lazy="item.album.picUrl" alt="" />
          </div>
          <div class="name">
            <div>{{ item.name }}</div>
            <span v-if="item.alias[0]"> ({{ item.alias[0] }}) </span>
            <span v-if="item.transNames"> ({{ item.transNames[0] }}) </span>
          </div>
          <div class="mv" v-if="item.mvid != 0">MV</div>
        </div>
        <div class="item2">
          <aritistName :artistList="item.artists"></aritistName>
        </div>
        <div class="item3">
          {{ item.album.name }}
        </div>
        <div class="item4">
          {{ convertTIme(item.duration) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { latestSong } from "@/http/api/findMusic";
import aritistName from "../../../components/common/aritistName.vue";
import { mapActions } from "@/store/helper/music";
export default {
  components: { aritistName },
  data() {
    return {
      typeList: [
        { type: 0, name: "全部" },
        { type: 7, name: "华语" },
        { type: 96, name: "欧美" },
        { type: 16, name: "韩国" },
        { type: 8, name: "日本" },
      ],
      tab1Index: 0,
      songList: [],
    };
  },
  methods: {
    ...mapActions(['setMusicInfo']),
    playMusic(id){
      this.setMusicInfo(id)
    },
    getData() {
      latestSong(this.type).then((res) => {
        // console.log(res);
        this.songList = res.data.data;
      });
    },
    change(type) {
      // console.log(type)
      this.$router.push({ path: "/findMusci/latestMusic", query: { type } });
      // console.log(this.$route.query)
      // this.$route.query['type'] = type
      // console.log(this.$route.query)
    },
    //处理时间为 分:秒
    convertTIme(t) {
      let time = Math.floor(t / 1000);
      let min = Math.floor(time / 60);
      let sec = time % 60;
      // console.log(min, sec);
      min = ("0" + min).slice(-2);
      sec = ("0" + sec).slice(-2);
      const res = min + ":" + sec;
      return res;
    },
    updateQuery() {
      this.type = this.$route.query.type;
    },
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        this.updateQuery(newVal, oldVal);
        this.getData();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.style1 {
  font-weight: 800;
  color: black;
  // background-color: red;
}
.style2{
  background-color: rgb(249,249,249);
}
.box {
  width: 100%;
  .tab {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .tab1 {
      width: 60%;
      & > * {
        margin-left: 2.5%;
        cursor: pointer;
        &:hover {
          color: black;
        }
      }
    }
  }
  .itemBox {
    display: flex;
    flex-direction: column;
    width: 100%;
    .item {
      display: flex;
      align-items: center;
      width: 100%;
      // border: 1px solid black;
      padding: 1% 1% 1% 2%;
      &:hover{
        background-color: rgb(240,241,242);
      }
      .item1 {
        width: 45%;
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-right: 1%;
        .item1Img {
          width: 15%;
          margin: 0 2%;
          border: 0.5px solid rgb(221, 217, 217);
          border-radius: 5%;
          img {
            width: 100%;
            border-radius: 5%;
          }
        }
        .name {
          // width: 75%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span {
            margin-left: 1%;
            color: rgb(158, 156, 156);
          }
        }
        .mv {
          margin-left: 1%;
          border-radius: 20%;
          font-size: 10px;
          font-weight: 600;
          color: rgb(253, 84, 78);
          border: 2px solid rgb(253, 84, 78);
        }
      }
    }
    .item2 {
      width: 25%;
      margin-right: 1%;
      font-size: 14px;
    }
    .item3 {
      width: 25%;
      margin-right: 1%;
      font-size: 14px;
    }
    .item4 {
      width: 5%;
      font-size: 14px;
      // margin-right: 1%;
    }
  }
}
</style>