<template>
  <div class="box">
    <div class="box1">
      <div class="img">
        <img
          class="img1"
          :class="{ swichsPlay: isPlaying, switchsPause: !isPlaying }"
          src="@/assets/imgs/cp1.png"
          alt=""
        />
        <div class="img2 record-rotate" :class="{ startRotate: isPlaying }">
          <img class="cp2" src="@/assets/imgs/cp2.png" alt="" />
          <img class="musicPic" :src="nowMusicDetail.musicPic" alt="" />
        </div>
      </div>
      <div class="musicInfo">
        <!-- <button @click="temp = !temp">test</button> -->
        <div class="info">
          <div class="musicName">
            {{ nowMusicDetail.musicName }}
          </div>
          <div class="alia">
            <span v-if="nowMusicDetail.musicAlia">{{
              nowMusicDetail.musicAlia
            }}</span>
            <span v-if="nowMusicDetail.musicTransName">{{
              nowMusicDetail.musicTransName
            }}</span>
          </div>
          <div class="artName">
            <aritistName :artistList="nowMusicDetail.artistsList"></aritistName>
          </div>
          <div class="alName">
            {{ nowMusicDetail.alName }}
          </div>
        </div>
        <div class="lyric" ref="lyricMove">
          <!-- <button @click="showLyric">test</button> -->
          <!-- <div class="lyricMove"> -->
          <div
            v-for="(item, index) in formatlyric"
            :key="index"
            class="lyricItem"
          >
            <!-- <div>
                <span>{{item.time}}</span>
                <span>{{currentSecond}}</span>
              </div> -->
            <div :class="{ currentRow: curRow == index }">
              {{ item.text }}
            </div>
            <div :class="{ currentRow: curRow == index }">
              {{ item.transTest }}
            </div>
            <!-- <div v-if="formatTlyric.time == item.time">{{formatTlyric[item.time]}}</div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
      <!-- <div class="recommend">33</div> -->
    </div>
    <div class="box2">
      <comment :id="nowMusicDetail.musicId" :type="0"></comment>
      <!-- 22222222222 -->
    </div>
    <!-- <div class="box3"></div> -->
  </div>
</template>

<script>
import { mapGetters } from "@/store/helper/music";
import aritistName from "../../common/aritistName.vue";
import { getMusicLyric } from "@/http/api/music";
import { mapActions } from "@/store/helper/music";
import comment from "../../common/comment/comment.vue";
export default {
  components: { aritistName, comment },
  data() {
    return {
      temp: false,
      //原词
      formatlyric: [],
      //译文
      formatTlyric: [],
      //
      curRow: "",
    };
  },
  methods: {
    ...mapActions(["setCurrentRow"]),
    showLyric() {
      console.log(this.formatlyric);
      // console.log(this.formatTlyric);
      // this.formatlyric.map((el) => {
      //   console.log(this.formatTlyric.find(item => item.time == el.time)?.text)
      // });
      // console.log(this.formatlyric);
    },
    //获取歌词
    async getLyric() {
      let res = await getMusicLyric(this.nowMusicDetail.musicId);
      console.log(res);
      let lyric = res.data.lrc.lyric;
      let Tlyric = res.data.tlyric.lyric;
      this.formatlyric = this.formatLyric(lyric);
      this.formatTlyric = this.formatLyric(Tlyric);
      this.formatlyric.map((el) => {
        el.transTest = this.formatTlyric.find(
          (item) => item.time == el.time
        )?.text;
      });
    },
    //格式化歌词
    formatLyric(lyric_str) {
      let tempRes = [];
      // 将歌词字符串 根据换行符 转换为 数组
      let lyric_arr = lyric_str.split("\n");
      // 遍历歌词数组
      for (let i = 0; i < lyric_arr.length; i++) {
        //得到每一行歌词
        let lyric_row = lyric_arr[i];
        //再将每一行歌词根据”]“分隔为时间和歌词,变为每行歌词数组
        let lyric_row_arr = lyric_row.split("]");
        // 通过pop()方法得到每行歌词文本
        let lryic_row_text = lyric_row_arr.pop();
        // 处理每行歌词时间
        lyric_row_arr.forEach((item) => {
          let LyricRowObj = {};
          let time_arr = item.substr(1, item.length - 1).split(":"); //去掉"[",并且分离出 分钟和秒
          // 将每行歌词时间转换为秒
          let seconds_row = time_arr[0] * 60 + Math.ceil(time_arr[1]);
          // 将每行歌词时间和文本添加到每行歌词对象中
          if (lryic_row_text.trim().length !== 0) {
            LyricRowObj.time = seconds_row;
            LyricRowObj.text = lryic_row_text;
            //再将每行歌词对象添加到数组中
            tempRes.push(LyricRowObj);
          }
        });
      }
      // 根据时间对歌词排序
      tempRes.sort((a, b) => {
        return a.time - b.time;
      });
      return tempRes;
    },
  },
  computed: {
    ...mapGetters(["nowMusicDetail", "isPlaying", "currentSecond"]),
  },
  created() {
    console.log(this.nowMusicDetail);
    this.getLyric();
  },
  watch: {
    // 监听当前时间的变化，实现滚动
    currentSecond() {
      this.formatlyric.forEach((el, index) => {
        if (this.currentSecond == el.time) {
          this.curRow = index;
          console.log(this.curRow);
          // this.$nextTick(()=>{
          if (index > 3) {
            this.$refs.lyricMove.scrollTo({
              top: 55 * (index - 3),
              behavior: "smooth",
            });
          }

          // });

          console.log(this.$refs.lyricMove.scrollTop);
          // console.log(this.$refs.lyricMove.top)
          // this.$refs.lyricMove.scrollTop = 50 +'rem';
        }
        // console.log(index)
      });
    },
    // 监听当前歌曲变化
    nowMusicDetail: {
      handler() {
        // console.log("newVal:", newVal);
        if (Object.keys(this.nowMusicDetail).length != 0) {
        // 歌曲改变后从新获取歌词
        this.formatlyric = [];
        // this.$refs.scrollLyric.style.transform = "translateY(0px)";
        this.getLyric();
      }
    },
      // 立即处理 进入页面就触发
      immediate: true,
      // 深度监听 属性的变化
      deep: true,
      // console.log('songChange')
      // if (Object.keys(this.nowMusicDetail).length != 0) {
      //   // 歌曲改变后从新获取歌词
      //   this.formatlyric = [];
      //   // this.$refs.scrollLyric.style.transform = "translateY(0px)";
      //   this.getLyric();
      // this.$store.commit("saveCurrentRow", null);
      // }
    },
    // 当打开歌曲详情页时歌词立即滚动到当前播放行
    // isShowSongDetail() {
    //   if (
    //     this.isShowSongDetail &&
    //     Object.keys(this.nowSongDetail).length != 0
    //   ) {
    //     this.$refs.scrollLyric.scrollTop = 45 * this.currentRow;
    //     this.$refs.playingSongDetail.scrollTop = 0;
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
.box {
  // min-width: 1400px;
  // min-width: 1400px;
  width: 100%;
  display: flex;
  flex-direction: column !important;
  // justify-content: center;
  align-items: center;
  z-index: -1;
  overflow-y: scroll;
  // background-color: red;
  // border: 1px solid black;
  .box1 {
    width: 80%;
    height: 70vh;
    display: flex;
    margin-bottom: 2%;
    // background-color: red;
    .img {
      width: 30%;
      position: relative;
      // background-color: red;
      .img1 {
        position: absolute;
        width: 30%;
        left: 40%;
        top: 15%;
        // background-color: red;
        z-index: 40;
      }
      //   .transImg1 {
      //     transform: translate(-50%, -50%);
      //   }
      .swichsPlay {
        animation-name: switchsPlay;
        animation-duration: 0.5s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        // transform: rotate(60deg);
      }
      .switchsPause {
        animation-name: switchsPause;
        animation-duration: 0.5s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }
      @keyframes switchsPlay {
        0% {
          transform: rotate(-15deg);
          transform-origin: left top;
        }
        100% {
          transform: rotate(15deg);
          transform-origin: left top;
        }
      }
      @keyframes switchsPause {
        0% {
          transform: rotate(15deg);
          transform-origin: left top;
        }
        100% {
          transform: rotate(-15deg);
          transform-origin: left top;
        }
      }
      .img2 {
        position: relative;
        width: 80%;
        left: 0;
        top: 25%;
        .musicPic {
          position: absolute;
          border-radius: 100%;
          width: 70%;
          top: 15%;
          left: 15%;
        }
        img {
          width: 100%;
        }
      }
      .record-rotate {
        animation-name: recordrotate;
        animation-duration: 20s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        // animation-fill-mode: forwards;
        animation-play-state: paused;
      }
      .startRotate {
        animation-play-state: running;
      }
      @keyframes recordrotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
    .musicInfo {
      width: 36%;

      // justify-content: center;
      //   background-color: black;
      .info {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10%;
        width: 100%;
        height: 20%;
        margin-bottom: 5%;
        // background-color: yellow;
        .musicName {
          font-size: 30px;
          margin-bottom: 1%;
        }
        & :not(:first-child) {
          color: rgba(110, 101, 101, 0.662);
        }
      }
      .lyric {
        // position: relative;
        // width: 100%;
        height: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        // background-color: red;
        overflow-y: scroll;
        // .lyricMove {
        //   display: flex;
        //   flex-direction: column;
        //   align-items: center;
        //   text-align: center;
        // position: absolute;
        .lyricItem {
          // border: 0,1px solid black;
          flex-shrink: 0;
          height: 15%;
          font-size: 15px;
          // margin-bottom: 4%;
          .currentRow {
            color: black;
            font-weight: 600;
          }
        }
        // }
      }
    }
    .recommend {
      width: 20%;
      background-color: blue;
    }
  }

  .box2 {
    width: 50%;
  }
}
</style>