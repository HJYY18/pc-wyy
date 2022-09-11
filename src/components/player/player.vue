<template>
  <div class="player" id="player">
    <div class="musicInfo">
      <musicInfo></musicInfo>
    </div>
    <div class="playerUI">
      <playUI></playUI>
    </div>
    <div class="playList">
      <list></list>
    </div>
  </div>
</template>

<script>
import musicInfo from "./musicInfo.vue";
import playUI from "./playUI.vue";
import list from "./list/list.vue";
export default {
  components: { musicInfo, playUI, list },
};
</script>

<style lang="less" scoped>
#player {
  min-width: 1400px;
  width: 100%;
  position: fixed;
  height: 75px;
  z-index: 999;
  bottom: 0%;
  // background: #f8f8ff;
  // border-top: 1px solid #dddddd;
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
}
.player {
  // min-width: 1400px;
  // height: 75px;
  width: 100%;
  // position: fixed;
  // z-index: 999;
  // bottom: 0%;
  // border: 1px solid rgb(224, 224, 224);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .musicInfo {
    width: 25%;
    // z-index: 30;
    // border: 1px solid black;
  }
  .playerUI {
    // border: 1px solid black;
    width: 40%;
  }
  .playList {
    border: 1px solid black;
    width: 25%;
    // z-index: 200;
  }
}
</style>