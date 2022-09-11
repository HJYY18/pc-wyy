<template>
  <div>
    <div class="item">
      <!-- 头像 -->
      <div class="avatar" @click="toUser(item.user.userId)">
        <img :src="item.user.avatarUrl" alt="" />
      </div>
      <!-- 右侧 -->
      <div class="info">
        <div class="comment">
          <!-- 名字 -->
          <span @click="toUser(item.user.userId)" class="nickname"
            >{{ item.user.nickname }}:
          </span>
          <span></span>
          <!-- 评论内容 -->
          <span>{{ item.content }}</span>
        </div>
        <!-- 回复 -->
        <div class="beReplied" v-if="item.beReplied[0]">
          <!-- 被回复人 -->
          <span @click="toUser(item.beReplied[0].user.userId)" class="nickname"
            >@{{ item.beReplied[0].user.nickname }}:
          </span>
          <span></span>
          <!-- 被回复内容 -->
          <span class="repContent">{{ item.beReplied[0].content }}</span>
        </div>
        <!-- 时间和点赞评论 -->
        <div class="time">
          <!-- 时间 -->
          <div>{{ item.timeStr }}</div>
          <div class="zanBox">
            <!-- 评论 -->
            <div class="reply">
              <img src="@/assets/imgs/reply.png" alt="" />
            </div>
            <!-- 赞数量 -->
            <div class="count">{{ item.likedCount }}</div>
            <!-- 点赞 -->
            <div class="zan">
              <img
                @click="
                  like(id, item.commentId, item.liked ? 0 : 1, type, item.liked)
                "
                v-if="item.liked"
                src="@/assets/imgs/zaned.png"
                alt=""
              />
              <img
                @click="
                  like(id, item.commentId, item.liked ? 0 : 1, type, item.liked)
                "
                v-else
                src="@/assets/imgs/zan.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { likeComment } from "@/http/api/comment";
export default {
  props: ["item", "type", "id"],
  data() {
    return {
      // comments: "",
      // isShow:false
    };
  },
  methods: {
    like(id, cid, t, type) {
      console.log("like");
      console.log(id, cid, t, type);
      likeComment(id, cid, t, type)
        .then((res) => {
          if (res.data.code === 200) {
            if (t == 0) {
              this.item.likedCount = this.item.likedCount - 1;
							this.item.liked = !this.item.liked;
              console.log(this.item)
            } else {
              this.item.likedCount = this.item.likedCount + 1;
							this.item.liked = !this.item.liked;
              console.log(this.item)
            }
          }
        })
        .catch(() => {
          console.log("点赞失败,请稍后重试!");
          // this.$message.error("点赞失败,请稍后重试!")
        });
    },
    toUser(id) {
      this.$router.push({ path: "/user", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
  .item {
    // border: 1px solid black;
    border-bottom: 0.1px solid rgb(240, 233, 233);
    width: 100%;
    display: flex;
    padding: 3% 0;
    // align-items: center;
    .avatar {
      width: 5%;
      img {
        width: 100%;
        border-radius: 100%;
      }
    }
    .info {
      margin-left: 2%;
      width: 100%;
      font-size: 10px;
      .nickname {
        color: rgb(14, 110, 151);
        cursor: pointer;
        &:hover {
          color: rgb(0, 65, 122);
          // color: black;
        }
      }
      .comment{
        width: 100%;
      }
      .beReplied {
        width: 100%;
        background-color: rgb(245, 245, 245);
        padding: 1%;
        margin: 1% 0;
      }
      .time {
        width: 100%;
        display: flex;
        margin-top: 1%;
        .zanBox {
          margin-left: auto;
          display: flex;
          flex-direction: row-reverse;
          width: 30%;
          // border: 0.1px solid black;
          .zan,
          .reply {
            width: 8%;
            img {
              width: 100%;
            }
          }
          .zan {
            display: flex;
          }
          .count {
            border-right: 0.1px solid rgb(240, 233, 233);
            // margin: 0 10% 0 1%;
            padding: 0 5% 0 2%;
            margin-right: 5%;
            // bottom: 0;
            // vertical-align: bottom;
            display: flex;
            align-items: flex-end;
          }
        }
      }
      // .repContent{
      //   background-color: rgb(245,245,245);
      // }
    }
  }
</style>