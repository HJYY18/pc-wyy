<template>
  <div class="box" @click.stop>
    <div class="img" @click="isShow = !isShow">
      <img src="@/assets/imgs/playingList.png" alt="" />
    </div>
    <myDialog class="dialog" v-if="isShow">
      <template v-slot:temp1 v-if="judge == 1" class="dialogShow">
        <curList></curList>
      </template>
      <template v-slot:temp2 v-if="judge == 2" class="dialogShow">
        <historyList></historyList>
      </template>
    </myDialog>
  </div>
</template>

<script>
import myDialog from "../../common/my-dialog.vue";
import curList from "./curList.vue";
import historyList from "./historyList.vue";
export default {
  components: { myDialog, curList, historyList },
  data() {
    return {
      isShow: false,
      judge: 1,
    };
  },
  mounted() {
    document.body.addEventListener(
      "click",
      () => {
        this.isShow = false;
      },
      false
    );
  },
};
</script>

<style lang="less" scoped>
.box {
  // display: flex;
  // flex-direction: row-reverse;
  // align-items: center;
  // text-align: right;
  position: relative;
  width: 100%;
  // z-index: 999;
  // border: 1px solid black;
  // height: 100%;
  .img {
    width: 7%;
    // border: 1px solid black;
    margin-right: 5%;
    img {
      width: 100%;
    }
  }
  .dialog {
    width: 110%;
    height: 83vh;
    position: absolute;
    background-color: white;
    bottom: 100%;
    left: -10%;
    border: 1px solid black;
    overflow-y: scroll;
    padding-bottom: -100px;
  }
}
</style>