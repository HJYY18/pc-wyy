<template>
  <div class="box">
    <div v-for="(item,index) in artists" :key="item.id" class="item" @click="toArtist(item.id)" :class="{style1:index%2 != 0}">
      <img :src="item.img1v1Url" alt="">
      <div>{{item.name}}</div>
      <div v-if="typeof(item.alia) =='object'">（{{item.alia[0]}}）</div>
      <div v-if="typeof(item.transNames) =='object'">（{{item.transNames[0]}}）</div>
      <!-- <div>{{typeof(item.transNames)}}</div> -->
    </div>
    <div class="pagination">
      <pagination
      v-if="artistCount>50"
        @pre="pre"
        @next="next"
        @toPage="toPage"
        :count="Math.ceil(artistCount / 50)"
      ></pagination>
  </div>
  </div>
</template>

<script>
import {searchDetail} from '@/http/api/search'
import { mapActions } from "@/store/helper/search";
import pagination from "../../components/common/pagination.vue";
export default {
  components: { pagination },
  data() {
    return {
      offset: 0,
      artists:[],
      artistCount:''
    };
  },
  methods: {
    ...mapActions(["setCount"]),
    async getData(){
        // console.log(this.query)
      let res = await searchDetail(this.$route.query.s,100,this.offset)
      this.artistCount = res.data.result.artistCount
      // console.log(res)
      this.artists = res.data.result.artists
      this.setCount(res.data.result.artistCount + "位歌手");
      // console.log(this.artists)
    },
    async more() {
      const res = await searchDetail(this.$route.query.s, 100, this.offset);
      this.artistCount = res.data.result.artistCount
    },
    toArtist(id){
      this.$router.push({path:'/artist',query:{id}})
    },
    pre() {
      if (this.offset > 0) {
        this.offset -= 50;
    this.more();
      }
    },
    next() {
      if ( this.offset < this.artistCount)  {
        this.offset += 50;
    this.more();

      }
    },
    toPage(page){
      this.offset = (page-1) *50
    this.more();

    }
  },
  created() {
    console.log(this.$route.query)
    this.getData()
  },
  //   watch: {
  //   $route: {
  //     handler() {
  //       // this.keywords = this.$route.query.s;
  //       // console.log(newVal,oldVal)
  //       this.getData();
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  
}
</script>

<style lang="less" scoped>
.style1 {
  background-color: rgb(249, 249, 249);
}
.box{
  display: flex;
  flex-direction: column;
}
.item{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1%;
  cursor: pointer;
  & :nth-child(2){
    margin-left: 2%;
  }
  &:hover {
    background-color: rgb(240, 241, 242);
  }
  /* border: 1px solid black; */
}
.item img{
  height: 70px;
  border-radius: 5%;
}
.pagination {
    width: 100%;
    margin: 2% 0 0 35%;
  }
</style>