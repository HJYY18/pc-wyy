<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <phone></phone> -->
    <!-- <userInfo></userInfo> -->
    <Header></Header>
    <show></show>
    <Player></Player>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import phone from './components/test/loginTest/phone.vue'
// import userInfo from './components/test/userTest/userInfo.vue'
import Header from './components/Header.vue'
import show from './components/show.vue'
import Player from './components/player/player.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // phone,
    // userInfo,
    Header,
    show,
    Player
  }
}

</script>

<style>
@import 'assets/css/base.css';
html,body { margin:0 auto; padding: 0 auto; }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
  min-height: 100vh;
  width: 100vw;
  min-width: 1300px;
  position: fixed
  /* min-height: 100vh; */
}
</style>
