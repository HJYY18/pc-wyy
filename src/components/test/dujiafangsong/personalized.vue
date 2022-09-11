<template>
  <div>
    <button @click="dujiafangsong">点击测试独家放送</button>
    <button @click="dujiafangsongList">点击测试独家放送（返回列表）</button>
    <button @click="dujiafangsongMV">点击测试独家放送跳转到对应mv</button>
    <button @click="dujiafangsongMVVideo">点击测试独家放送跳转到对应mv播放地址</button>
  </div>
</template>

<script>
import { personalized, personalizedList,getDetailMV,getMVVideo } from "../../../http/api/findMusic";
export default {
    data() {
        return {
            mvid: 14514232,
        };
    },
  methods: {
    async dujiafangsong() {
      console.log(await personalized());
    },
    async dujiafangsongList() {
      console.log(await personalizedList());
    },
    async dujiafangsongMV(){
        let params = {
            mvid:this.mvid
        }
        console.log(await getDetailMV(params) )
    },
    async dujiafangsongMVVideo(){
        let params ={
            id:14514232
        }
        console.log(await getMVVideo(params))
    }
  },
};
</script>

<style>
</style>