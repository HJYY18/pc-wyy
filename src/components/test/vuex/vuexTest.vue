<template>
  <div>
    <h2>2333</h2>
    <h2>{{ temp }}</h2>
    <div>
      <input type="text" v-model="newTemp" />
      <button @click="settemp(newTemp)">点击修改temp</button>
      <button @click="showUserInfo">输出userInfo</button>
      <button @click="showUserImg">输出userInfo内用户信息</button><br>
      <span>测试vuex内对象内属性是否为响应式==>用户名:{{userInfo.nickname}}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "../../../store/helper/user";
import { mapState } from "../../../store/helper/user";
export default {
  data() {
    return {
      newTemp: "",
    };
  },
  computed: {
    ...mapState(["temp",'userInfo']),
  },
  methods: {
    ...mapActions(["setTemp"]),
    settemp(temp) {
      this.setTemp(temp);
    },
    showUserInfo(){
      console.log(this.userInfo)
    },
    showUserImg(){
      console.log('头像地址：'+this.userInfo.avatarUrl)
      console.log('用户名：'+this.userInfo.nickname)
    }
  },
};
</script>

<style>
</style>