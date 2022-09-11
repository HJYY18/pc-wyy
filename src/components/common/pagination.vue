<template>
  <div class="box">
    <div v-if="count <= 10" class="box2">
      <div class="btn" @click="pre1">←</div>
      <div
        v-for="item in count"
        :key="item"
        :class="{ style1: item == cur }"
        @click="toPage"
      >
        {{ item }}
      </div>
      <div class="btn" @click="next1">→</div>
    </div>
    <div v-else class="box2" ref="box2">
      <div class="btn" @click="pre2">←</div>
      <div @click="toPage">1</div>
      <div @click="toPage">{{ cur > 5 ? "..." : 2 }}</div>
      <div @click="toPage">
        {{ cur > 5 ? (count - cur > 4 ? cur - 3 : count - 7) : 3 }}
      </div>
      <div @click="toPage">
        {{ cur > 5 ? (count - cur > 4 ? cur - 2 : count - 6) : 4 }}
      </div>
      <div @click="toPage">
        {{ cur > 5 ? (count - cur > 4 ? cur - 1 : count - 5) : 5 }}
      </div>
      <div @click="toPage">
        {{ cur > 5 ? (count - cur > 4 ? cur : count - 4) : 6 }}
      </div>
      <div @click="toPage">
        {{ cur > 5 ? (count - cur > 4 ? cur + 1 : count - 3) : 7 }}
      </div>
      <div @click="toPage">
        {{ cur > 5 ? (count - cur > 4 ? cur + 2 : count - 2) : 8 }}
      </div>
      <div @click="toPage">
        {{ cur > 5 ? (count - cur > 4 ? cur + 3 : count - 1) : 9 }}
      </div>
      <div v-if="count - cur > 4">{{ "..." }}</div>
      <div @click="toPage">{{ count }}</div>
      <div class="btn" @click="next2">→</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["count"],
  data() {
    return {
      cur: 1,
      // count: 10,
    };
  },
  methods: {
    next1() {
      if (this.cur < this.count) {
        this.cur += 1;
        this.$emit("next");
      }
    },
    pre1() {
      if (this.cur > 1) {
        this.cur -= 1;
        this.$emit("pre");
      }
    },

    next2() {
      if (this.cur < this.count) {
        this.cur += 1;
        setTimeout(() => {
          this.test();
        }, 0);
        this.$emit("next");
      }
    },
    pre2() {
      if (this.cur > 1) {
        this.cur -= 1;
        setTimeout(() => {
          this.test();
        }, 0);
        this.$emit("pre");
      }
    },
    toPage(e) {
      // console.log(e)
      this.cur = parseInt(e.target.innerText);
      setTimeout(() => {
        this.test();
      }, 0);
      this.$emit("toPage", e.target.innerText);
    },

    test() {
      // console.log("cur:" + this.cur);
      // console.log(this.$refs.box2.children);
      let arr = this.$refs.box2.children;
      // console.log(typeof(arr))
      // console.log(arr.length)
      for (let key = 0; key < arr.length; key++) {
        if (parseInt(arr[key].innerText) == this.cur) {
          arr[key].className = "style1";
          // console.log(arr[key].innerText);
        } else {
          arr[key].className = "";
        }
      }
    },
    show() {
      console.log(this.cur, this.count);
    },
  },
  // created() {
  //   this.test()
  // },
  mounted() {
    this.test();
  },
};
</script>

<style lang="less" scoped>
.style1 {
  color: white;
  background-color: rgb(253, 84, 78);
  cursor: default !important;
  &:hover {
    background-color: rgb(253, 84, 78) !important;
  }
}
.box {
  // border: 1px solid black;
  display: flex;
  .box2 {
    width: 100%;
    display: flex;
    .btn {
      // height: 1.5rem;
      // width: 1.5rem;
      background-color: white;
    }
    & > * {
      font-size: 10px;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.5rem;
      border-radius: 20%;
      border: 0.1px solid rgb(240, 233, 233);
      cursor: pointer;
      &:hover {
        background-color: rgb(244, 244, 244);
      }
    }
  }
}
</style>