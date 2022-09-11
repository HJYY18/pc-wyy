<template>
  <div class="box">
    <div class="history">
      <ul>
        <li>历史记录</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>

      </ul>
    </div>
    <div class="hotList">
      <span>热搜榜</span>
      <ul>
        <li>2</li>
        <li>2</li>
        <li>2</li>
        <li>2</li>
        <li>2</li>
        <li>2</li>
        <li>2</li>
        <li>2</li>
        <li>2</li>
        <li>2</li>
        <li>2</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "inputDialog",
  props: {
    inputValue: {
      type: String,
      default: "",
    },
    focused: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.box::-webkit-scrollbar {
  width: 6px;
  background-color: #fff;
}

.box:hover ::-webkit-scrollbar-track-piece {
  /*鼠标移动上去再显示滚动条*/
  background-color: #fff;
  /* 滚动条的背景颜色 */
  border-radius: 6px;
  /* 滚动条的圆角宽度 */
}

/* .Menu:hover::-webkit-scrollbar-thumb:hover {
    background-color: #c0cecc;
} */

.box:hover::-webkit-scrollbar-thumb:vertical {
  background-color: rgb(225, 225, 225);
  border-radius: 6px;
}
.box {
  /* float: left; */
  width: 300px;
  height: 300px;
  background-color: white;
  border: 1px solid black;
  position: relative;
  top: 170px;
  left: -230px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>