<template>
  <div class="box">
    <div class="logo">
      <img src="@/assets/imgs/cloudMusicLogo.jpeg" alt="" />
      <span>网 易 云 音 乐</span>
    </div>
    <div class="search">
      <search></search>
      <!-- 233 -->
    </div>
    <!-- <elSearch></elSearch> -->
    <a class="user">
      <login></login>
      <!-- 2444 -->
    </a>
  </div>
</template>

<script>
// import { mapState } from "@/store/helper/user";
// import elSearch from "./header/elSearch.vue";
import login from "./login/login.vue";
import search from "./header/search.vue";
export default {
  name: "header",
  components: {
    // elSearch,
    search,
    login,
  },
  data() {
    return {
      urlDefault: require("@/assets/imgs/defaultAvatar.jpeg"),
      test1: 1111,
    };
  },
  computed: {
    // ...mapState(["userInfo"]),
    // url() {
    //   if (Object.keys(this.userInfo) == 0) return this.urlDefault;
    //   else return this.userInfo.avatarUrl;
    // },
    // test() {
    //   return 3333;
    // },
  },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: black;
}
.box {
  height: 7vh;
  width: 100%;
  background-color: rgb(253, 84, 78);
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  // margin-top: 10px;
  position: fixed;
  top: 0px;
  z-index: 30;
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      margin-left: 15px;
      margin-right: 10px;
    }
  }
  .search{
    margin-left: 10%;
  }
  .user{
    width: 10%;
    height: 50px;
    margin-left: auto;
    padding-right: 5%;
  }
}
</style>