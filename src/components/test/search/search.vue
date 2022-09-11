<template>
  <div>

    <button @click="hotList">点击测试热榜</button>
    <button @click="hotListDetail">点击测试热榜详细</button>
    <div>
        <input type="text" v-model="keywords">
        <button>点击返回搜索建议</button>
        <button @click="Search(keywords)">点击搜索</button>
    </div>
  </div>
</template>

<script>
import {getSearchHot,getSearchHotDetail} from '@/http/api/search.js'
export default {
    name:"search",
    data() {
        return {
            keywords: '',
        };
    },
    methods: {
        async hotList() {
            console.log(await getSearchHot()) 
        },
        async hotListDetail(){
            console.log(await getSearchHotDetail()) 
        },
        Search(keywords){
            // console.log(await search(keywords))
            this.$router.push({path:'search/songs',query:{s:keywords}})
            // console.log(this.$router)
        }
    },
};
</script>

<style>
</style>