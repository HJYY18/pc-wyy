<template>
  <div class="box">
    <!-- <button @click="Key">点击测试生成二维码key</button>
    <button @click="Create">点击测试生成二维码base64</button>
    <button @click="Check">点击查看二维码状态</button> -->
    <button @click="login">LoginQR</button>
    <div>
        <img :src="qrimg" alt="">
    </div>
    <!-- <span>{{cookie}}</span> -->
  </div>
</template>

<script>
import {qrKey,qrCreate,qrCheck,loginStatus} from '../../../http/api/login'
import {getUserMusicList} from '@/http/api/user'
import { mapActions } from "../../../store/helper/user";
import { mapState } from "../../../store/helper/user";
export default {
data() {
    return {
        key: '',
        base64:'',
        qrimg:''
    };
},
computed: {
    ...mapState(['cookie','userInfo']),
    property() {
        return this.property;
    },

},
methods: {
    ...mapActions(['setCookie','setUserInfo','loginStatusTrue','setUserMusicList']),
    
    login: async function() {
				let nowtime = Date.now();
				//调第一个接口拿key
				let key = (await qrKey({
                    t:nowtime
                })).data.data.unikey
				//调第二个接口拿二维码图片
				let sginImgURL = (await qrCreate({
                    key:key,
                    qrimg: true,
                    t: Date.now()
                })).data.data.qrimg
				// this.$store.state.signShow = true
				this.qrimg = sginImgURL
				// 800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功
				//每三秒check一次
				let check = setInterval(async () => {
					let nowtime2 = new Date().getTime();
					let res = await qrCheck({
                        key:key,
                        t:nowtime2}).then()
					console.log(res.data.message, '---')
					if (res.data.code == 800) {
						alert(res.data.message)
						clearInterval(check)
					}
					if (res.data.code == 803) {
                        console.log(res)
                        this.setCookie(res.data.cookie)
						alert(res.data.message)
						clearInterval(check)
                        this.loginStatusTrue()
                        let temp = await loginStatus()
                        this.setUserInfo(temp.data.data.profile)
                        let MusicList = await getUserMusicList(this.userInfo.userId)
                        this.setUserMusicList(MusicList.data.playlist)
					}
				}, 3000)
			},
    
    // async Key() {
    //     let params = {
    //         timestamp: Date.now()
    //     }
    //     this.key = await qrKey(params)
    //     console.log(this.key)
    // },
    //     async Create() {
    //     let params = {
    //         key: this.key,
    //         qrimg: true,
    //         timestamp: Date.now()
    //     }
    //     this.base64 = await qrCreate(params)
    //     this.qrimg = this.base64.data.data.qrimg
    //     console.log(this.base64)
    // },
    // async Check(){
    //     let params ={
    //         key:this.key,
    //         timestamp: new Date().getTime()
    //     }
    //     const qrState = await qrCheck(params)
    //     console.log(qrState)
    // } 
},
}
</script>

<style scoped>
.box img{
    width: 200px;
    height: 200px;
    border: 1px solid;
}
</style>