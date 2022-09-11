<template>
  <div>
    <!-- recommendation
    <button @click="getbanner">banner</button> -->
    <banner :banner="banner"></banner>
    <recmmendLis></recmmendLis>
    <personal></personal>
    <latestMusic></latestMusic>
  </div>
</template>

<script>
import banner from './banner.vue';
import recmmendLis from './recmmendList/recmmendList.vue';
import personal from './personal/personal.vue';
import latestMusic from './latestMusic.vue';
import {getBanner} from '@/http/api/findMusic'
export default {
  components:{banner,recmmendLis,personal,latestMusic},
data() {
  return {
    banner: '',
  };
},
methods: {
  async getbanner() {
    let res = await getBanner()
    console.log(res)
    console.log(this.banner)
  },
},
created() {
  getBanner().then(res=>{
    // console.log(2333)
    this.banner = Object.values(res.data.banners) 
    // console.log(res)
  })
},


}
</script>

<style lang="less" scoped>

</style>