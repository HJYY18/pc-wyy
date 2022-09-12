<template>
  <div class="box">
    <!-- <div class="input"> -->
    <!-- <textarea name="" id="" cols="10" rows="5" v-model="input"></textarea> -->
    <div ref="textarea" class="textarea" contenteditable="true"></div>
    <!-- <div>{{input}}</div> -->
    <button @click="commitInput" class="commitInput">评论</button>
    
    <!-- </div> -->
    <!-- <div>精彩评论</div> -->
    <div v-if="hot">
      <div class="hot">精彩评论</div>
      <commentItem
        v-for="item in hot"
        :key="item.commentId"
        :item="item"
        :id="id"
        :type="type"
        @reply="reply"
      ></commentItem>
      <div v-if="moreHot">更多精彩评论</div>
    </div>
    <!-- <div>最新评论</div> -->
    <div v-if="comments">
      <div class="comment">最新评论({{ total }})</div>
      <div class="commentsBox">
        <commentItem
          v-for="item in comments"
          :key="item.commentId"
          :item="item"
          :id="id"
          :type="type"
          @reply="reply"
        ></commentItem>
        <pagination
          class="pagination"
          :count="Math.ceil(total / 20)"
          @next="next"
          @pre="pre"
          @toPage="toPage"
        ></pagination>
      </div>
      <!-- <commentItem :comments="comments" :id="id" :type="type"></commentItem> -->
    </div>
    <div class="reply" v-if="showReply">
      <replayBox @comment="comment" @close="close"></replayBox>
    </div>
  </div>
</template>

<script>
import commentItem from "./commentItem.vue";
import replayBox from "./replayBox.vue";
import pagination from "../pagination.vue";
import {
  musicComment,
  mvComment,
  videoComment,
  musicListComment,
  albumComment,
  replyComment,
} from "@/http/api/comment";
export default {
  props: ["id", "type"],
  components: { commentItem, pagination, replayBox },
  data() {
    return {
      comments: "",
      hot: "",
      total: "",
      moreHot: "",
      offset: 0,
      showReply: false,
      //回复参数
      Cdata: "",
      //评论内容
      input: "",
    };
  },
  methods: {
    async getData() {
      //歌曲
      if (this.type == 0) {
        let res = await musicComment(this.id, this.offset);
        console.log(res);
        this.comments = res.data.comments;
        this.hot = res.data.hotComments;
        this.total = res.data.total;
        this.moreHot = res.data.moreHot;
        //mv
      } else if (this.type == 1) {
        let res = await mvComment(this.id, this.offset);
        console.log(res);
        this.comments = res.data.comments;
        this.hot = res.data.hotComments;
        this.total = res.data.total;
        this.moreHot = res.data.moreHot;
        //歌单
      } else if (this.type == 2) {
        let res = await musicListComment(this.id, this.offset);
        console.log(res);
        this.comments = res.data.comments;
        this.hot = res.data.hotComments;
        this.total = res.data.total;
        this.moreHot = res.data.moreHot;
        //专辑
      } else if (this.type == 3) {
        let res = await albumComment(this.id, this.offset);
        console.log(res);
        this.comments = res.data.comments;
        this.hot = res.data.hotComments;
        this.total = res.data.total;
        this.moreHot = res.data.moreHot;
        //视频
      } else if (this.type == 5) {
        let res = await videoComment(this.id, this.offset);
        console.log(res);
        this.comments = res.data.comments;
        this.hot = res.data.hotComments;
        this.total = res.data.total;
        this.moreHot = res.data.moreHot;
      }
    },
    next() {
      console.log("next");
      this.offset += 20;
      console.log(this.offset);
      this.getData();
    },
    pre() {
      console.log("pre");
      this.offset -= 20;
      console.log(this.offset);
      this.getData();
    },
    toPage(page) {
      console.log(page);
      this.offset = (page - 1) * 20;
      console.log(this.offset);
      this.getData();
    },
    //显示回复框，传递data
    async reply(data) {
      console.log('233')
      this.showReply = true;
      this.Cdata = data;
      // console.log(data)
      // let res = await likeComment(2, data.type, data.id, content,data.cid)
    },
    //发布回复
    async comment(content) {
      if (content.length > 140) {
        alert("字数超出限制");
      } else {
        let res = await replyComment(
          2,
          this.Cdata.type,
          this.Cdata.id,
          content,
          this.Cdata.cid
        );
        // if(res.data.)
        // console.log(res)
        if (res.data.code == 200) {
          alert("评论成功");
        } else {
          alert("评论失败");
        }
      }

      this.showReply = false;
    },
    //关闭回复框
    close() {
      this.showReply = false;
    },
    //评论
    async commitInput() {
      if (this.$refs.textarea.innerText == "") {
        alert("输入不能为空");
      } else {
        if (this.$refs.textarea.innerText.length > 140) {
          alert("字数超出限制");
        } else {
          let res = await replyComment(1, this.type, this.id,this.$refs.textarea.innerText);
          if (res.data.code == 200) {
            alert("评论成功");
          } else {
            alert("评论失败");
          }
        }
        this.$refs.textarea.innerText = "";
        // console.log(res)
      }
    },
  },
  created() {
    // this.input = this.$refs.textarea.innerText
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
  .textarea {
    width: 90%;
    height: 10vh;
    margin-left: auto;
    margin-right: auto;
    padding: 3px;
    outline: 0;
    border: 1px solid #d8dadd;
    font-size: 12px;
    line-height: 24px;
    padding: 2px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    // border-color: rgba(82, 168, 236, 0.8);
  }
  .commitInput {
    margin-left: auto;
    background-color: white;
    border: 0.1px solid rgb(212, 205, 205);
    padding: 0.2% 1%;
    border-radius: 100vh;
    margin-top: 1%;
    &:hover {
      background-color: rgb(242, 242, 242);
    }
  }
  .hot,
  .comment {
    // border: 1px solid black;
    margin-top: 2%;
    // margin-left: 0%;
  }
  .commentsBox {
    width: 100%;
    .pagination {
      // border: 1px solid black;
      margin: 5% 0 5% 25%;
      // display: flex;
      // justify-content: center;
    }
  }
  .reply {
    background-color: white;
    position: fixed;
    top: 35%;
    left: 40%;
    width: 30%;
    height: 28%;  
    border: 1px solid rgb(228, 228, 228);
  }
}
</style>