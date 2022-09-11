<template>
  <div id="box">
    <div class="type">
      {{ type == 2 ? "视频详情" : "MV详情" }}
    </div>
    <div class="show">
      <div class="video">
        <video :src="url" controls></video>
      </div>
      <div class="info">
        <div class="avatar">
          <div class="img"><img :src="info.avatar" alt="" /></div>
          <div>{{ info.name }}</div>
        </div>
        <div class="name">{{ info.title }}</div>
        <div class="count">
          <span>发布：{{ info.publishTime }}</span>
          <span>播放：{{ info.playCount }}次</span>
        </div>
        <div>
          <button>点赞({{ likedCount }})</button>
          <button>收藏({{ info.subCount }})</button>
        </div>
      </div>
      <div class="comment">
        <comment :id="info.id" :type="type"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "./comment/comment.vue";
export default {
  props: ["url", "type", "info", "likedCount"],
  components: { comment },
};
</script>

<style lang="less" scoped>
#box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // border: 1px solid black;
  .type{
    align-self: flex-start;
    font-size: 1.5rem;
    font-weight: 500;
  }

  .show {
    width: 60%;
  }
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    .avatar {
      display: flex;
      width: 100%;
      align-items: center;

      // height: 60px;
      .img {
        width: 8%;
        height: 0;
        padding-bottom: 8%;
        position: relative;
        margin-right: 2%;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .name {
      font-size: 1.5rem;
      font-weight: 800;
      margin: 2% 0;
    }
    .count {
      font-size: 1px;
      color: rgb(195, 189, 189);
      margin-bottom: 2%;
      & > * {
        margin-right: 2%;
      }
    }
  }
}
</style>