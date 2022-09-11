<template>
  <div>
    <button @click="getuserdetail">点击查看用户详情</button>
    <button @click="getuseraccount">点击查看账号信息</button>
    <button @click="getuserinfo">点击获取用户信息</button>
    <button @click="getuserlevelinfo">点击获取用户等级信息</button>
    <button @click="getusermusiclist">点击渲染用户歌单</button>
  </div>
</template>

<script>
import { mapState } from "@/store/helper/user";
import {
  getUserDetail,
  getUserAccount,
  getUserInfo,
  getUserLevelInfo,
  getUserMusicList,
} from "../../../http/api/user";
export default {
  name: "userinfo",
  computed: { 
    ...mapState(['userInfo'])
  },
  methods: {
    //用户详情
    async getuserdetail() {
      console.log(this.userInfo.userId)
      const data = await getUserDetail(this.userInfo.userId);
      console.log(data);
    },
    //账号信息
    async getuseraccount() {
      const data = await getUserAccount();
      console.log(data);
    },
    //用户信息
    async getuserinfo() {
      const data = await getUserInfo();
      console.log(data);
    },
    //等级信息
    async getuserlevelinfo() {
      const data = await getUserLevelInfo();
      console.log(data);
    },
    //歌单
    async getusermusiclist(){
      const data = await getUserMusicList(this.userInfo.userId)
      console.log(data)
      console.log(typeof(data.data.playlist))
    }
  },
};
</script>

<style>
</style>