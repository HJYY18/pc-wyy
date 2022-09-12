<template>
  <div class="box">
    <div class="router">
      <router-link to="/collect/album">专辑</router-link>
      <router-link to="/collect/artist">歌手</router-link>
      <router-link to="/collect/video">MV</router-link>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.router-link-active {
  text-decoration: none;
  font-weight: 800;
}
.box {
  width: 100%;
//   border: 1px solid black;
  display: flex;
  flex-direction: column;
  .router {
    width: 100%;
    margin-bottom: 2%;
    &>*{
        margin-right: 1%;
    }
  }
  .view {
    width: 100%;
  }
}
</style>