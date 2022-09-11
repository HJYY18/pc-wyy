<template>
  <div class="box">
    <div v-for="(item, index) in list" :key="item.id" class="itemBox">
      <!-- {{item.name}} -->
      <div class="itemImg">
        <!-- 动态设定背景图片来达到两图重叠显示失败 -->
        <!-- <div
          v-if="coverImgs[index]"
          class="imgBox"
          :style="{
            backgroundImage:
              coverImgs[index] == ''
                ? `url(http://p4.music.126.net/crKNUUNZOpqOQWzeGn94EA==/109951167797488296.jpg)`
                : `url(${coverImgs[index]})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'contain',
          }"
        > -->

        <div v-if="coverImgs[index]" class="imgBox">
          <img @click="toMusicList(item.id)" :src="item.coverImgUrl" alt="" />
          <!-- <img :src="coverImgs[index]" alt="" /> -->
        </div>
      </div>
      <div class="itemSongs">
        <div
          v-for="(temp, key) in songs[index]"
          :key="temp.id"
          :class="{ song: true, style1: key % 2 === 0, style2: key < 3 }"
          @dblclick="play(temp.id)"
        >
          <span>{{ key + 1 }}</span>
          <span>{{ temp.name }}</span>
          <div>
            <aritistName :artistList="temp.ar"></aritistName>
          </div>
        </div>
        <div @click="toMusicList(item.id)" class="toMusicList">查看全部 ></div>
      </div>
    </div>
    <!-- <div>???</div> -->
  </div>
</template>

<script>
import { playListDetail } from "@/http/api/musicList";
import { toplistDetail } from "@/http/api/findMusic";
import aritistName from "@/components/common/aritistName.vue";
import { mapActions } from "@/store/helper/music";
export default {
  // props: ["id"],
  components: { aritistName },
  data() {
    return {
      //前四个歌单
      list: [],
      //每个歌单前五首歌
      songs: [],
      //前四个歌单的第一首歌封面，用来做背景虚化
      coverImgs: [],
    };
  },
  methods: {
    ...mapActions(["setMusicInfo"]),

    async getData() {
      let res = await toplistDetail();
      console.log(res);
      this.list = res.data.list.slice(0, 4);
      for (let i = 0; i < 4; i++) {
        let res2 = await playListDetail(this.list[i].id);
        // console.log(res2)

        this.coverImgs.push(res2.data.playlist.tracks[0].al.picUrl);
        this.songs.push(res2.data.playlist.tracks.slice(0, 5));
      }
      // let res2 = await playListDetail(this.id)
      // this.list = res.data.playlist
    },
    play(id) {
      this.setMusicInfo(id);
    },
    toMusicList(id) {
      this.$router.push({ path: "/playList", query: { id } });
    },
  },
  created() {
    // toplistDetail().then((res) => {
    //   // console.log(res)
    //   let temp = res.data.list;
    //   this.list = temp.slice(0,4)

    // //   for (let key in temp) {
    //     // console.log(key)
    //     // let t = parseInt(key);
    //     // console.log(t);
    //     // console.log(typeof t);
    //     // if (t < 4) {
    //     //   console.log("xiao");
    //     // } else {
    //     //   console.log("da");
    //     // }

    //     // if (parseInt(key) < 4) {
    //     //   this.topList.push(temp[key].id);
    //     // } else {
    //     //   this.otherList.push([
    //     //     temp[key].id,
    //     //     temp[key].name,
    //     //     temp[key].coverImgUrl,
    //     //   ]);
    //     // }
    // //   }
    // });
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.style1 {
  background-color: rgb(249, 249, 249);
}
.style2 {
  & span:nth-child(1) {
    color: red;
  }
}
.box {
  width: 100%;
  .itemBox {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 5%;
    .itemImg {
      width: 15%;
      .imgBox {
        position: relative;
        // background: image();
        img {
          width: 100%;
        }
      }
    }
    .itemSongs {
      display: flex;
      flex-direction: column;
      width: 85%;
      position: relative;
      margin-left: 3%;
      .song {
        display: flex;
        align-items: center;
        height: 20%;
        border-radius: 2%;
        font-size: 10px;
        span {
          margin-left: 1%;
        }
        & :nth-child(3) {
          margin-left: auto;
        }
      }
      .toMusicList {
        position: absolute;
        top: 105%;
        font-size: 10px;
        cursor: pointer;
        &:hover {
          color: black;
        }
      }
    }
  }
}
</style>