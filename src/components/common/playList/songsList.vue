<template>
  <div class="box">
    <div class="header">
      <span class="header1"></span>
      <span class="header2">音乐标题</span>
      <span class="header3">歌手</span>
      <span class="header4">专辑</span>
      <span class="header5">时长</span>
    </div>
    <div
      v-for="(item, index) in songs"
      :key="item.id"
      :class="{ item: true, style1: index % 2 === 0 }"
      @dblclick="playMusic(item.id)"
    >
      <div class="item1">
        <span>{{ ("0" + (index + 1)).slice(-2) }}</span>
        <!-- <img :src="likedsongIds.indexOf(item.id) == -1?imgs[0]:imgs[1]" alt="" @click="test(item.id)" /> -->
        <!-- <img :src="imgs[0].src" alt="" @click="test(item.id)" /> -->
        <img
          src="@/assets/imgs/like.png"
          alt=""
          v-if="likedsongIds.indexOf(item.id) == -1"
          @click="like(item.id,false)"
        />
        <img
          src="@/assets/imgs/liked.png"
          alt=""
          v-else
          @click="like(item.id,true)"
        />
      </div>
      <div class="item2">
        <span>{{ item.name }}</span>
        <span v-if="item.alia[0]">({{ item.alia[0] }})</span>
        <span v-if="item.transName">({{ item.song.transName }})</span>
      </div>
      <div class="item3">
        <aritistName :artistList="item.ar"></aritistName>
      </div>
      <div class="item4">
        <router-link to="/">{{ item.al.name }}</router-link>
      </div>
      <div class="item5">
        <span>{{ convertTIme(item.dt) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "@/store/helper/music";
import { mapActions as mapActionsUser }  from "@/store/helper/user";
import aritistName from "@/components/common/aritistName.vue";
import { getMusicDetail } from "@/http/api/music";
import { mapState } from "@/store/helper/user";
export default {
  components: { aritistName },
  props: ["idList"],
  data() {
    return {
      ids: "",
      songs: [],
      //   songCount: 0,
      //   offset: 1,
    };
  },
  computed: {
    ...mapState(["likedsongIds"]),
  },
  methods: {
    // ...mapActions(["setCount"]),
    ...mapActions(["setMusicInfo", "setPlayList"]),
    ...mapActionsUser(['likeMusic']),
    like(id,status){
      this.likeMusic({'id':id,'status':status})
      // console.log(id,status)
    },
    //处理trackIds
    convertIds(trackIds) {
      console.log("233");
      for (let key in trackIds) {
        this.ids += trackIds[key].id + ",";
      }
      this.ids = this.ids.slice(0, -1);
      console.log(this.ids);
    },

    //获取歌单音乐信息
    async getData() {
      // this.songs = [];
      await this.convertIds(this.idList);
      this.songs = [];
      let res = await getMusicDetail(this.ids);
      this.songs = res.data.songs;
      console.log(res);
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
    //播放音乐
    playMusic(id) {
      this.setPlayList(this.songs);
      // console.log(id)
      this.setMusicInfo(id);
    },
  },
  created() {
    this.getData();
  },

  watch: {
    idList: {
      handler() {
        console.log("change");
        // this.updateQuery(newVal,oldVal)
        this.getData();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: rgb(137, 123, 150);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
a:hover {
  color: #000 !important;
}
.box {
  color: rgb(150, 136, 165);
  font-size: 13px;
}
.header {
  display: flex;
  height: 40px;
}
.item {
  /* border: 1px solid black; */
  display: flex;
  &:hover {
    background-color: rgb(240, 241, 242);
  }
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.style1 {
  background-color: rgb(249, 249, 249);
}
.item1,
.item2,
.item3,
.item4,
.item5 {
  height: 30px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header1,
.header2,
.header3,
.header4,
.header5 {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
}
.item1,
.header1 {
  width: 5%;
  justify-content: center;
  /* flex-grow: 1; */
}
.item1 {
  img {
    height: 20px;
    padding-left: 15px;
  }
}
.item2 :not(:first-child) {
  padding-left: 1.5%;
  color: rgb(150, 136, 165);
}

.item2,
.header2 {
  width: 40%;
  color: black;
  font-weight: 200px;
  /* flex-grow: 4; */
}
.item3,
.header3 {
  width: 25%;
  /* flex-grow: 2.5; */
}
.item4,
.header4 {
  width: 20%;
  /* flex-grow: 1.5; */
}
.item5,
.header5 {
  width: 10%;
  /* flex-grow: 1; */
  justify-content: center;
}
</style>