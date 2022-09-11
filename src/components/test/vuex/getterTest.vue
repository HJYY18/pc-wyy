<template>
  <div>
    <button @click="list">歌单</button>
    <button @click="resList">分类歌单</button>
  </div>
</template>

<script>
import { mapGetters } from '@/store/helper/user';
export default {
name:'getterTest',
computed: {
...mapGetters(['userMusicList','musicList'])
},
methods: {
    list() {
        console.log(this.userMusicList[0])
    },
        resList() {
        console.log(this.musicList['resCreat'][0])
    },
},
}
</script>

<style>

</style>