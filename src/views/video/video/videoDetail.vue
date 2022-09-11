<template>
  <div class="box">
      <shipinDetail
        :url="url"
        :info="info"
        :likedCount="likedCount"
        :type="2"
      ></shipinDetail>
  </div>
</template>

<script>
import { videoURL,videoDetail, videoDetailInfo } from "@/http/api/video";
import shipinDetail from '../../../components/common/shipinDetail.vue';
export default {
components:{shipinDetail},
data() {
    return {
      url: "",
      info: {},
      commentCount: "",
      likedCount: "",
      liked: "",
    };
  },
  methods: {
    async getData() {
      console.log(233);
      let res = await videoURL(this.$route.query.id);
      // console.log(res);
      this.url = res.data.urls[0].url;
      let res2 = await videoDetail(this.$route.query.id);
      this.info['id'] = res2.data.data.vid
      this.info['avatar'] = res2.data.data.avatarUrl
      this.info['name'] = res2.data.data.creator.nickname
      this.info['title'] = res2.data.data.title
      this.info['publishTime'] = this.changeData(res2.data.data.publishTime)
      this.info['playCount'] = res2.data.data.playTime
      this.info['subCount'] = res2.data.data.subCount
      console.log(res2);
      // this.info = res2.data.data;
      //   console.log(res2)
      let res3 = await videoDetailInfo(this.$route.query.id);
      this.likedCount = res3.data.likedCount;
      this.commentCount = res3.data.commentCount;
      this.liked = res3.data.liked;
      // this.liked = res3.data.liked;
      //   this.mvInfo = res2.data.data
      // console.log(res3);
      //   console.log(res)
      //   console.log(this.$route.query.id)
    },
    //时间戳转时间
    changeData(t) {
      t = new Date(t);
      return (
        t.toLocaleDateString().replace(/\//g, "-")
      );
    },
  },
  created() {
    console.log(23)
    this.getData()
  },
  
}
</script>

<style lang="less" scoped>

</style>