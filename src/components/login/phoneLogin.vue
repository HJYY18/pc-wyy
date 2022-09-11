<template>
  <div class="box">
    <div class="toQrLogin">
      <div @click="toQrLogin">扫码登录更安全</div>
      <div class="shut" @click="closeDialog">✕</div>
    </div>
    <div class="img">
      <img src="@/assets/imgs/phone.png" alt="" />
    </div>
    <div class="from">
      <div class="phoneNum">
        <input type="text" placeholder="请输入手机号" />
      </div>

      <div class="pwd">
        <input type="text" placeholder="请输入密码" />
        <div>重设密码</div>
      </div>
      <button class="login">登录</button>
      <div class="register">注册</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toQrLogin() {
      this.$emit("toQrLogin");
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
//   align-items: center;
  height: auto;
  .img {
    width: 100%;
    margin: 10% 0;
    img {
      width: 80%;
    }
  }
  .toQrLogin {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .from {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    input{
        border: none;
        height: 3.5vh;
    }
    .phoneNum{
        display: flex;
        width: 70%;
        border: 0.5px solid rgb(203, 196, 196);
        border-bottom: none;
    }
    .pwd{
        width: 70%;
        border: 0.5px solid rgb(203, 196, 196);
        display: flex;
        align-items: center;
        div{
            color:rgb(203, 196, 196) ;
            cursor: pointer;
        }
    }
    .login{
        width: 70%;
        height: 4vh;
        margin-top: 10%;
        background-color: rgb(234,72,72);
        color: white;
        border-radius: 1vh;
        border: none;
        &:hover{
            background-color: rgb(199,46,46);
        }
    }
    .register{
        margin: 10% 0;
            cursor: pointer;
    }
  }
}
</style>