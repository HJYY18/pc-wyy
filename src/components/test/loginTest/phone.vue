<template>
  <div>
    <input type="text" placeholder="输入手机号" v-model="phoneNum">
    <input type="text" placeholder="输入密码" v-model="pwd">
    <button @click="login">登录</button>
    <button @click="showLoginStatus">查询登录状态</button>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
// import axios from 'axios'
// import requests from '../../../utils/requests.js'
// import  {get}  from '../../../utils/request.js';
import {phoneLogin,loginStatus,logOut} from '../../../http/api/login'
import { mapActions } from "../../../store/helper/user";
export default {
name:'phone',
data() {
    return {
        phoneNum: '',
        pwd:'',
    };
},
methods: {
    ...mapActions(['changeLoginStatus']),
   async login() {
        let params = {
            phone:this.phoneNum,
            password:this.pwd
        }
        const data = await phoneLogin(params)
        console.log(data)
    },
    async showLoginStatus(){
        console.log('showLoginStatus')
        const res = await loginStatus()
        console.log(res)
        // console.log(res.data.data.profile)
    },
    async logout(){
        console.log('logout')
        console.log(await logOut())
        this.changeLoginStatus()
    }
},

// methods: {
//     login() {
//         // axios.get(`http://localhost:3000/login/cellphone?phone=${this.phoneNum}&password=${this.pwd}`).then(
//         // axios.get(`http://localhost:3000/login/cellphone?phone=15716505661&password=DCYSMIMA`).then(
//         //    axios.get('http://localhost:3000/login/cellphone',{
//         //     params:{
//         //         phone:this.phoneNum,
//         //         password:this.pwd
//         //     }
//         //    }).then(
//         //     res=>{
//         //         console.log('登录成功')
//         //         console.log(res)
//         //     },
//         //     err=>{
//         //         console.log('登录失败')
//         //         console.log(err)
//         //     }
//         // )
//         get('login/cellphone',{
//             phone:this.phoneNum,
//             password:this.pwd
//             }).then(
//             res =>{
//                 console.log('请求成功了',res)
//             },
//             rej =>{
//                 console.log('请求失败了',rej)
//             }
//         )
//             //         axios.get('http://localhost:8000/axios-server').then(
//             //     res =>{
//             //         console.log('请求成功了',res.data)
//             //     },
//             //     rej =>{
//             //         console.log('请求失败了',rej)
//             //     }
//             // )
//     },
//     showLoginStatus(){
//         // axios.get('http://localhost:3000/login/status').then(
//         //     res=>{
//         //         console.log('查询状态')
//         //         console.log(res)
//         //     },
//         //     err=>{
//         //         console.log('查询状态')
//         //         console.log(err)
//         //     }
//         // )
//         get('login/status').then(
//             res=>{
//                 console.log('查询状态ok')
//                 console.log(res)
//             },
//             err=>{
//                 console.log('查询状态err')
//                 console.log(err)
//             }
//         )
//     },
//     logout(){
//         // axios.get('http://localhost:3000/logout').then(
//         //     res=>{
//         //         console.log('退出')
//         //         console.log(res)
//         //     },
//         //     err=>{
//         //         console.log('退出')
//         //         console.log(err)
//         //     }
//         // )
//         get('logout').then(
//             res=>{
//                 console.log('退出')
//                 console.log(res)
//             },
//             err=>{
//                 console.log('退出')
//                 console.log(err)
//             }
//         )
//     }
// },
}
</script>

<style>

</style>