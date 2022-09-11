<template>
  <div class="box">
    <div class="shut" @click="closeDialog">✕</div>
    <!-- <button @click="login">LoginQR</button> -->
    <div class="info">
      <div class="info1">扫码登录</div>
      <img :src="qrimg" alt="" />
      <div class="info2">请使用网易云app扫码登陆</div>
    </div>
    <button @click="test1">setTest</button>
    <div class="otherLogin" @click="changeLogin">选择其他登录模式 ></div>
    <!-- <span>{{cookie}}</span> -->
  </div>
</template>

<script>
import { qrKey, qrCreate, qrCheck, loginStatus} from "@/http/api/login";
import { getUserMusicList ,getUserLikelist} from "@/http/api/user";
import { mapActions } from "@/store/helper/user";
// import { mapState } from "@/store/helper/user";
export default {
  data() {
    return {
      key: "",
      base64: "",
      qrimg: "",
      timer: "",
    };
  },
  computed: {
    // ...mapState(["cookie", "userInfo"]),
    property() {
      return this.property;
    },
  },
  methods: {
    ...mapActions([
      "setCookie",
      "setUserInfo",
      "changeLoginStatus",
      "setUserMusicList",
      'setlikedsongIds'
    ]),
    test1() {
      console.log(111);
      // localStorage.setItem("isLogin", true);
      this.setItem("objTest", 
      {
        'name' :'tom',
        'age' : 23,
        'friends': [
          {'1':'aaaa','2':'bbbb','3':"cccc"},
          {'a':'1111','b':'2222'}
        ],
        'temp':[555,444,333,222,'1']
      });
    },
    closeDialog() {
      clearInterval(this.timer);
      this.$emit("closeDialog")
    },
    changeLogin() {
      console.log("qr内触发了change");
      this.$emit("toPhoneLogin");
      clearInterval(this.timer);
    },

    login: async function () {
      let nowtime = Date.now();
      //调第一个接口拿key
      let key = (
        await qrKey({
          t: nowtime,
        })
      ).data.data.unikey;
      //调第二个接口拿二维码图片
      let sginImgURL = (
        await qrCreate({
          key: key,
          qrimg: true,
          t: Date.now(),
        })
      ).data.data.qrimg;
      // this.$store.state.signShow = true
      this.qrimg = sginImgURL;
      // 800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功
      //每三秒check一次
      this.timer = setInterval(async () => {
        let nowtime2 = new Date().getTime();
        let res = await qrCheck({
          key: key,
          t: nowtime2,
        }).then();
        console.log(res.data.message, "---");
        if (res.data.code == 800) {
          alert(res.data.message);
          clearInterval(this.timer);
        }
        if (res.data.code == 803) {
          //浏览器存储登录成功的信息
          // this.setItem("isLogin", true);
          console.log(res);
          this.setCookie(res.data.cookie);
          alert(res.data.message);
          clearInterval(this.timer);
          //vuex提交登陆成功
          this.changeLoginStatus(true);

          //vuex提交用户信息
          let temp = await loginStatus();
          this.setUserInfo(temp.data.data.profile);
          //浏览器存储用户信息
          // this.setItem("userInfo", res.data.profile);

          //vuex提交歌单信息
          let MusicList = await getUserMusicList(temp.data.data.profile.userId);
          console.log(MusicList.data.playlist)
          this.setUserMusicList(MusicList.data.playlist);
          // this.setItem("userMusicList", MusicList.data.playlist);

          let res2 = await getUserLikelist(temp.data.data.profile.userId)
          this.setlikedsongIds(res2.data.ids)
          // console.log(res2)

          //关闭弹窗
          this.closeDialog();
        }
      }, 3000);
    },
  },
  created() {
    this.login()
  },
};
</script>

<style lang="less" scoped>
.box {
  //   border: 1px solid black;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  .shut {
    font-size: 20px;
    color: rgb(217, 205, 205);
    align-self: flex-end;
    margin: 0 2%;
    cursor: pointer;
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    .info1 {
      font-size: 25px;
      font-weight: 400;
      color: black;
      margin: 10% 0;
    }
    .info2 {
      margin-top: 10%;
      font-size: 15px;
    }
    img {
      width: 100%;
      //   height: 200px;
      //   border: 1px solid;
    }
  }
  .otherLogin {
    margin: 20% 0 15% 0;
    font-size: 10px;
  }
}
</style>