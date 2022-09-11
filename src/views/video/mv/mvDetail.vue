<template>
  <div class="box">
    <!-- mvDetail -->
    <!-- <button @click="getData">test</button> -->
    <div class="detail">
      <shipinDetail
        :url="url"
        :info="info"
        :likedCount="likedCount"
        :type="1"
      ></shipinDetail>
    </div>
  </div>
</template>

<script>
import { mvURL, mvDetail, mvDetailInfo } from "@/http/api/video";
import shipinDetail from "../../../components/common/shipinDetail.vue";
export default {
  components: { shipinDetail },
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
      // console.log(233);
      let res = await mvURL(this.$route.query.id);
      this.url = res.data.data.url;
      let res2 = await mvDetail(this.$route.query.id);
      this.info['id'] = res2.data.data.id
      this.info['avatar'] = res2.data.data.artists[0].img1v1Url
      this.info['name'] = res2.data.data.artists[0].name
      this.info['title'] = res2.data.data.name
      this.info['publishTime'] = res2.data.data.publishTime
      this.info['playCount'] = res2.data.data.playCount
      this.info['subCount'] = res2.data.data.subCount
      // this.mvInfo = res2.data.data;
        // console.log(res2)
      // console.log(this.info)
      let res3 = await mvDetailInfo(this.$route.query.id);
      this.likedCount = res3.data.likedCount;
      this.commentCount = res3.data.commentCount;
      this.liked = res3.data.liked;
      //   this.mvInfo = res2.data.data
      // console.log(res3);
      //   console.log(res)
      //   console.log(this.$route.query.id)
    },
  },
  created() {
      // console.log(233);
      this.getData()
    },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  .detail {
    width: 100%;
  }
}
</style>