<template>
  <div class="box">
    <!-- <button @click="getData">test</button> -->
    <div class="title">独家放送</div>
    <div class="itemBox">
      <div v-for="item in list" :key="item.id" class="item">
        <div @click="toMv(item.id)"><img :src="item.picUrl" alt=""></div>
        <div @click="toMv(item.id)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {personalizedList} from '@/http/api/findMusic'
export default {
  data() {
    return {
      list: '',
    };
  },
methods: {
  async getData() {
    let res = await personalizedList()
    // console.log(res)
    this.list = res.data.result
  },
  toMv(id){
    this.$router.push({path:'mvDetail',query:{id}})
  }
},
created() {
  this.getData()
},

}
</script>

<style lang="less" scoped>
.box{
  width: 100%;
  display: flex;
  flex-direction: column;
  .title{
    font-size: 1.5rem;
    font-weight: 600;
  }
  .itemBox{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item{
      width: 30%;
      margin:1% 0 2% 2%;
      & :nth-child(2){
        cursor: pointer;
        font-size: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img{
        width: 100%;
        border-radius: 2%;
      }
    }
  }
}
</style>