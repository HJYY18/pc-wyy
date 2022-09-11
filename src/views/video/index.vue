<template>
  <div class="box">
    <div class="router">
      <router-link :to="{ path: '/video/video' }"
        >视频</router-link
      >
      <router-link to="/video/mv">MV</router-link>
    </div>

    <router-view class="main"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.router-link-active {
  font-size: 23px;
  font-weight: 600;
} 
.box {
  width: 100%;
  display: flex;
  flex-direction: column;
  .router {
    width: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    position: fixed;
    height: 6%;
    background-color: white;
    // border: 1px solid black;
    & :first-child{
      margin-right: 1.5%;
    }
  }
  .main {
    width: 90%;
    height: 96%;
    padding: 0 0 0 7%;
  }
}
</style>