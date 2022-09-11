<template>
  <div class="box">
    <div class="tabBox">
      <div class="tab">
        <span>语种:</span>
        <mySearchTab @itemClick="areaClick" :itemList="list[0]" :name="Aname"></mySearchTab>
      </div>
      <div class="tab">
        <span>分类:</span>
        <mySearchTab @itemClick="typeClick" :itemList="list[1]" :name="Tname"></mySearchTab>
      </div>
      <div class="tab">
        <span>筛选:</span>
        <mySearchTab
          @itemClick="initialClick"
          :itemList="list[2]"
          :name="Iname"
        ></mySearchTab>
      </div>
    </div>
    <div class="itemBox">
      <div v-for="item in artistsList" :key="item.id" class="item">
        <img :src="item.img1v1Url" alt="" @click="toArtist(item.id)" />
        <div class="userInfo">
          <span @click="toArtist(item.id)">
            {{ item.name }}
          </span>
          <img
            v-if="item.accountId"
            src="@/assets/imgs/accountUser.png"
            alt=""
            @click="toUser(item.accountId)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { artistList } from "@/http/api/findMusic";
import mySearchTab from "@/components/common/my-searchTab.vue";
export default {
  components: { mySearchTab },
  data() {
    return {
      Aname:'全部',
      Tname:'全部',
      Iname:'热门',
      list: [
        [
          { area: -1, name: "全部" },
          { area: 7, name: "华语" },
          { area: 96, name: "欧美" },
          { area: 8, name: "日本" },
          { area: 16, name: "韩国" },
          { area: 0, name: "其它" },
        ],
        [
          { type: -1, name: "全部" },
          { type: 1, name: "男歌手" },
          { type: 2, name: "女歌手" },
          { type: 3, name: "乐队" },
        ],
        [
          { initial: -1, name: "热门" },
          { initial: "a", name: "A" },
          { initial: "b", name: "B" },
          { initial: "c", name: "C" },
          { initial: "d", name: "D" },
          { initial: "e", name: "E" },
          { initial: "f", name: "F" },
          { initial: "g", name: "G" },
          { initial: "h", name: "H" },
          { initial: "i", name: "I" },
          { initial: "j", name: "J" },
          { initial: "k", name: "K" },
          { initial: "l", name: "L" },
          { initial: "m", name: "M" },
          { initial: "n", name: "N" },
          { initial: "o", name: "O" },
          { initial: "p", name: "P" },
          { initial: "q", name: "Q" },
          { initial: "r", name: "R" },
          { initial: "s", name: "S" },
          { initial: "t", name: "T" },
          { initial: "u", name: "U" },
          { initial: "v", name: "V" },
          { initial: "w", name: "W" },
          { initial: "x", name: "X" },
          { initial: "y", name: "Y" },
          { initial: "z", name: "Z" },
          { initial: 0, name: "#" },
        ],
      ],
      area: "-1",
      type: "-1",
      initial: "-1",
      artistsList: [],
    };
  },
  methods: {
    areaClick(item) {
      // console.log('tabClick')
      this.area = item.area;
      this.Aname = item.name
      this.getData(this.type, this.area, this.initial);
      console.log(item.area);
    },
    typeClick(item) {
      // console.log('tabClick')
      this.type = item.type;
      this.Tname = item.name
      this.getData(this.type, this.area, this.initial);
      console.log(item.type);
    },
    initialClick(item) {
      // console.log('tabClick')
      this.initial = item.initial;
      this.Iname = item.name
      this.getData(this.type, this.area, this.initial);
      console.log(item.initial);
    },
    getData(type, area, initial) {
      artistList(type, area, initial).then((res) => {
        console.log(res);
        this.artistsList = res.data.artists;
      });
    },
    toArtist(id) {
      this.$router.push({ path: "/artist", query: { id } });
    },
    toUser(id) {
      this.$router.push({ path: "/user", query: { id } });
    },
  },
  created() {
    this.getData(this.type, this.area, this.initial);
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  font-size: 12px;
  & span {
    cursor: pointer;
  }
  .tabBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    .tab {
      width: 100%;
      display: flex;
      // margin-bottom: 1.5%;
      span {
        width: 5%;
      }
    }
  }
  .itemBox {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .item {
      width: 15%;
      margin-right: 1.5%;
      margin-bottom: 1%;
      font-size: 15px;
      img {
        width: 100%;
        border-radius: 3%;
        margin-bottom: 5%;
      }
      .userInfo {
        width: 100%;
        display: flex;
        justify-content: space-between;
        span {
          text-align: center;
          width: auto;
          &:hover {
            color: black;
          }
        }
        & img {
          background-color: red;
          width: 8%;
          padding: 1%;
          margin-bottom: 2%;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>