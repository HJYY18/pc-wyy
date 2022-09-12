<template>
  <div>
    <div class="desc">周深简介</div>
    <div class="detail">{{briefDesc}}</div>
  </div>
</template>

<script>
import { artistDesc } from "@/http/api/artist";
export default {
  data() {
    return {
      briefDesc: '',
    };
  },
  methods: {
    async getData() {
      let res = await artistDesc(this.$route.query.id)
      this.briefDesc = res.data.briefDesc
      // console.log(res)
    },
  },
  created() {
    this.getData()
  },
  
};
</script>

<style lang="less" scoped>
.desc{
  font-weight:700;
  margin-bottom: 1%;
}
.detail{
  font-size: 1rem;
  line-height: 200%;
}
</style>