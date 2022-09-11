<template>
  <div class="box">
    <div v-if="!isLogin" class="login">
      <div class="awatar" @click="showLogin">
        <img src="@/assets/imgs/defaultAvatar.jpeg" alt="" />
      </div>
      <div @click="showLogin" class="name">请登录 ▾</div>
      <div class="loginDialog" v-if="isShowLoginDalog">
        <myDialog class="dialog">
          <template v-slot:temp1 v-if="loginStatus == 1">
            <qrLogin @closeDialog="closeDialog" @toPhoneLogin="toPhoneLogin"></qrLogin>
          </template>
          <template v-slot:temp2 v-if="loginStatus == 2" >
            <phoneLogin  @toQrLogin="toQrLogin"></phoneLogin>
          </template>
        </myDialog>
      </div>
    </div>

    <div v-if="isLogin" class="login">
      <div class="awatar">
        <img :src="avatarUrl" alt="" />
      </div>
      <div class="name">{{ userName }}</div>
    </div>
  </div>
</template>

<script>
import myDialog from "@/components/common/my-dialog.vue";
import qrLogin from "./qrLogin.vue";
import phoneLogin from './phoneLogin.vue'
import { mapGetters } from "@/store/helper/user";
export default {
  components: { myDialog, qrLogin ,phoneLogin},
  data() {
    return {
      urlDefault: require("@/assets/imgs/defaultAvatar.jpeg"),
      isShowLoginDalog: false,
      loginStatus:1
    };
  },
  computed: {
    ...mapGetters(["isLogin", "userName", "avatarUrl"]),
  },
  methods: {
    showLogin() {
      this.isShowLoginDalog = true;
    },
    closeDialog() {
      console.log('233')
      this.isShowLoginDalog = false;
      this.loginStatus = 1
    },
    toPhoneLogin(){
      console.log('login内触发了toPhone')
      this.loginStatus = 2
    },
    toQrLogin(){
      this.loginStatus = 1
    }
  },
};
</script>

<style lang="less" scoped>
.box {
  //   height: 50px;
  width: 100%;
  .login {
    display: flex;
    align-items: center;
    .awatar {
      width: 4%;
      img {
        width: 100%;
        border-radius: 100%;
      }
    }
    .name {
      color: rgb(248, 247, 247);
      cursor: pointer;
      &:hover{
        color: white;
      }
      margin-left: 2%;
    }
  }
  .loginDialog {
    background-color: white;
    width: 20%;
    // height: 30%;
    position: fixed;
    top: 20%;
    left: 40%;
    .dialog {
      z-index: 999;
      // width: 200px;
    }
  }
}
</style>