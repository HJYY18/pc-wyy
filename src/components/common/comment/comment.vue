<template>
  <div class="box">
    <div class="input"></div>
    <!-- <div>精彩评论</div> -->
    <div v-if="hot">
      <div class="hot">精彩评论</div>
      <commentItem v-for="(item) in hot" :key="item.commentId" :item="item" :id="id" :type="type"></commentItem>
      <div v-if="moreHot">更多精彩评论</div>
    </div>
    <!-- <div>最新评论</div> -->
    <div v-if="comments">
      <div  class="comment">最新评论({{total}})</div>
      <div class="commentsBox">
        <commentItem v-for="(item) in comments" :key="item.commentId" :item="item" :id="id" :type="type"></commentItem>
        <pagination class="pagination" :count="Math.ceil(total/20)" @next="next" @pre="pre" @toPage="toPage"></pagination>
      </div>
      <!-- <commentItem :comments="comments" :id="id" :type="type"></commentItem> -->
    </div>
  </div>
</template>

<script>
import commentItem from "./commentItem.vue";
import pagination from "../pagination.vue";
import { musicComment ,mvComment,videoComment,musicListComment,albumComment} from "@/http/api/comment";
export default {
  props: ["id", "type"],
  components: { commentItem,pagination },
  data() {
    return {
      comments: "",
      hot: "",
      total:'',
      moreHot:'',
      offset:0
    };
  },
  methods: {
    async getData() {
      //歌曲
      if (this.type == 0) {
        let res = await musicComment(this.id,this.offset);
        console.log(res);
        this.comments = res.data.comments;
        this.hot = res.data.hotComments;
        this.total = res.data.total
        this.moreHot = res.data.moreHot
      //mv
      }else if(this.type == 1){
        let res = await mvComment(this.id,this.offset);
        console.log(res);
        this.comments = res.data.comments;
        this.hot = res.data.hotComments;
        this.total = res.data.total
        this.moreHot = res.data.moreHot
      //视频
      }else if(this.type == 2){
        let res = await videoComment(this.id,this.offset);
        console.log(res);
        this.comments = res.data.comments;
        this.hot = res.data.hotComments;
        this.total = res.data.total
        this.moreHot = res.data.moreHot
        //歌单
      }else if(this.type == 3){
        let res = await musicListComment(this.id,this.offset);
        console.log(res);
        this.comments = res.data.comments;
        this.hot = res.data.hotComments;
        this.total = res.data.total
        this.moreHot = res.data.moreHot
      }else if(this.type == 4){
        let res = await albumComment(this.id,this.offset);
        console.log(res);
        this.comments = res.data.comments;
        this.hot = res.data.hotComments;
        this.total = res.data.total
        this.moreHot = res.data.moreHot
      }
    },
    next(){
      console.log('next')
      this.offset +=20
      console.log(this.offset)   
      this.getData()
    },
    pre(){
      console.log('pre')
      this.offset -= 20
      console.log(this.offset)   
      this.getData()
    },
    toPage(page){
      console.log(page)
      this.offset = (page-1) *20
      console.log(this.offset)   
      this.getData()
    }
  },
  created() {
    this.getData();
  },
  watch: {
    id() {
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  .hot, .comment{
    // border: 1px solid black;
    margin-top: 2%;
    // margin-left: 0%;
  }
  .commentsBox {
    width: 100%;
    .pagination{
      // border: 1px solid black;
      margin:5% 0 5% 25%;
      // display: flex;
      // justify-content: center;
    }
}
}
</style>