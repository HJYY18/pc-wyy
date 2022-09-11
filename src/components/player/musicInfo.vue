<template>
  <div class="box">
    <div class="musicImg">
      <div @click="changeIsShowMusicDetail" class="imgBox">
        <img :src="musicPic" alt="" />
        <!-- <span class="up">∧</span> -->
        <img class="up" src="@/assets/imgs/up.png" alt="" />
      </div>

      <!-- <transition name="musicDetail"> -->
        <!-- <musicDetail v-if="isShow" class="musicDetail"></musicDetail> -->
        <!-- <musicInfoDetail v-if="isShow" class="musicDetail"></musicInfoDetail>
      </transition> -->
      <!-- <button @click="test">222</button> -->
    </div>

    <div class="infoBox">
      <div class="info1">
        <div class="name">
          <span>
            {{ musicName }}
          </span>
          <span v-if="musicAlia"> ({{ musicAlia }}) </span>
          <span v-if="musicTransName"> ({{ musicTransName }}) </span>
        </div>

        <div class="like">
          <img v-if="!isLiked" src="@/assets/imgs/like.png" alt="" />
          <img v-if="isLiked" src="@/assets/imgs/liked.png" alt="" />
        </div>
      </div>
      <div class="info2">
        <aritistName :artistList="artistsList"></aritistName>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "@/store/helper/music";
import aritistName from "../common/aritistName.vue";
import { mapActions } from '@/store/helper/music';
// import musicDetail from "./musicDetail/musicDetail.vue";
// import musicInfoDetail from "./musicDetail/musicInfoDetail.vue";
export default {
  name: "musicInfo",
  components: { aritistName,
    //  musicDetail
    // musicInfoDetail
     },
  data() {
    return {
      followed: true,
      isShow: false,
    };
  },
  computed: {
    ...mapGetters([
      "musicPic",
      "isLiked",
      "artistsList",
      "musicName",
      "musicAlia",
      "musicTransName",
    ]),
  },
  methods: {
    ...mapActions(['changeIsShowMusicDetail']),
    changeFollowed() {
      this.followed = !this.followed;
    },
    test() {
      console.log(this.isShow);
    },
  },
};
</script>

<style lang="less" scoped>
// .musicDetail-leave-active,
// .musicDetail-enter-active {
//   transition: all 0.5s ease;
// }

// .musicDetail-leave-active,.musicDetail-enter{
//    height:0px !important;
//   }
//   .musicDetail-leave,.musicDetail-enter-active{
//    height: 90vh;
//   }
.box {
  display: flex;
  width: 100%;
  background-color: white;
  // position: relative;
  // z-index: 30;
}
.musicImg {
  position: relative;
  width: 13%;
  // width: 60px;
  // height: 25%;
  margin: 3% 3% 3% 2%;
  border: 0.1px solid rgb(226, 219, 219);
  .imgBox {
    position: relative;
    &:hover {
    :nth-child(1) {
      filter: blur(3px) brightness(80%);
    }
    :nth-child(2) {
      display: block;
    }
  }
    .up {
      width: 60%;
      height: 60%;
      font-size: 4vh;
      top: 20%;
      left: 25%;
      position: absolute;
      // z-index: 30;
      display: none;
    }
  }

  // .musicDetail {
  //   position: absolute;
  //   width: 100vw;
  //   height: 90vh;
  //   bottom: 124%;
  //   left: -19%;
  //   z-index: -1;
  //   background-color: rgb(255,255,255);
  // }
  // border: 1px solid black;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5%;
  }
}
.infoBox {
  position: relative;
  // border: 1px solid black;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 3% 0px;
  .info1 {
    display: flex;
    flex-direction: row;
    width: 50%;
    font-size: 16px;
    margin-top: 1%;
    // border: 1px solid black;
    .name {
      display: flex;
      width: 85%;
      // border: 1px solid black;
      overflow: hidden;
      white-space: nowrap;
    }
    .like {
      width: 10%;
      & img {
        width: 100%;
        margin-left: 10%;
        cursor: pointer;
      }
    }
    .info2 {
      font-size: 10px !important;
      overflow: hidden;
      white-space: nowrap;
    }
    // & >*{
    //   cursor: pointer;
    // }
  }
}
</style>