<template>
  <div class="box" ref="box" @mouseover="boxMouseover" @mouseout="boxMouseout">
    <!-- 左翻页 -->
    <span class="left" @click="left">◀</span>
    <!-- 轮播图 -->
    <div ref="imgs" class="imgs">
      <div v-for="item in banner" :key="item.imageUrl">
        <img :src="item.imageUrl" alt="" @click="playMusic(item)" />
      </div>
    </div>
    <!-- 右翻页 -->
    <span class="right" @click="right">▶</span>
    <!-- 下方圆点 -->
    <ul class="list" ref="list">
      <li
        v-for="(item, index) in imgs.length"
        :key="item"
        :style="setActiveDot(index)"
        @mouseover="liMouseover(index)"
      ></li>
    </ul>
    <!-- <div>
      <button @click="left">ToLeft</button>
      <button @click="right">ToRight</button>
    </div> -->
    <!-- <div>
      {{ list }}
    </div> -->
  </div>
</template>

<script>
import { mapActions } from "@/store/helper/music";
// import {playMusic} from '@/utils/playMusic'
// import {
//   // getMusic,
//   getMusicDetail
//    } from "@/http/api/music";
export default {
  props: ["banner"],
  data() {
    return {
      classList: [
        "num0",
        "num1",
        "num2",
        "num3",
        "num4",
        "num5",
        "num6",
        "num7",
      ],
      imgs: [],
      autoPlay: null,
      currentIndex: 1,
    };
  },
  methods: {
    ...mapActions(["setMusicInfo"]),

    //播放音乐 或 跳转到 专辑/歌单
    playMusic(item) {
      if (item.targetType == 1) {
        this.setMusicInfo(item.targetId);
      } else if (item.targetType == 1000) {
        this.$router.push({ path: "/playList", query: { id: item.targetId } });
      } else if (item.targetType == 10) {
        this.$router.push({ path: "/albums", query: { id: item.targetId } });
      }
    },
    //向右翻页
    right() {
      //通过改变class来控制样式改变
      //将最后一个class插入第一个,并删除最后一个class
      this.classList.unshift(this.classList[7]);
      this.initClass();
      if (this.currentIndex + 1 > 7) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
    },
    //向左
    left() {
      this.classList.push(this.classList[0]);
      this.classList.shift();
      this.initClass();
      if (this.currentIndex - 1 < 0) {
        this.currentIndex = 7;
      } else {
        this.currentIndex -= 1;
      }
    },
    //初始化图片class
    initClass() {
      for (let i = 0; i < this.imgs.length; i++) {
        this.imgs[i].className = this.classList[i];
      }
    },

    //小圆点跟随图片变成红色
    setActiveDot(index) {
      return index === this.currentIndex
        ? {
            backgroundColor: "#ff0000",
          }
        : {
            backgroundColor: this.color,
          };
    },
    boxMouseover() {
      clearInterval(this.autoPlay);
    },
    boxMouseout() {
      this.autoPlay = setInterval(() => {
        this.right();
      }, 5000);
    },
    //鼠标移至小圆点,图片变化逻辑
    liMouseover(index) {
      if (
        (index > this.currentIndex &&
          Math.abs(index - this.currentIndex) < 4) ||
        (index < this.currentIndex && Math.abs(index - this.currentIndex) > 4)
      ) {
        while (index != this.currentIndex) {
          this.right();
        }
      } else {
        while (index != this.currentIndex) {
          this.left();
        }
      }
    },
  },

  updated() {
    this.imgs = this.$refs.imgs.children;
    this.initClass();
  },
  mounted() {
    //挂载后自动开启自动轮播
    this.autoPlay = setInterval(() => {
      this.right();
    }, 5000);
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 800px;
  height: 250px;
  position: relative;
  top: 0;
  left: 24%;
}
.left,
.right {
  position: absolute;
  z-index: 10;
  background-color: #ff0000;
  font-size: 24px;
  color: white;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background-color: black;
  border-radius: 18px;
  /* 添加半透明 */
  opacity: 0.3;
  top: 30%;
}
.left {
  left: -32%;
}
.right {
  right: -2%;
}
img {
  width: 100%;
  border-radius: 20px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}
.imgs {
  position: absolute;
  width: 530px;
  height: 244px;
  top: 0;
  left: 35%;
  transform: translate(-50%, 0%);
}
.imgs div {
  position: absolute;
  // width: 730px;
  transition: 0.5s;
}
.num0 {
  transform: translateX(-300px) scale(0.9);
  z-index: 1;
}
.num1 {
  z-index: 2;
}
.num2 {
  transform: translateX(300px) scale(0.9);
  z-index: 1;
}
.num3,
.num4,
.num5,
.num6,
.num7 {
  transform: scale(0.9);
}
.list {
  position: absolute;
  bottom: 5%;
  left: 20%;
  // margin-left: -81px ;
  z-index: 5;
  li {
    list-style: none;
    float: left;
    width: 8px;
    height: 8px;
    background-color: rgb(230, 230, 230);
    border-radius: 50%;
    margin: 0 6px;
    cursor: pointer;
  }
  // .change {
  //   background-color: rgb(236, 65, 65);
  // }
}
</style>