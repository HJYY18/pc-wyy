<template>
  <div class="box">
    <div
      v-for="(item, index) in userprofiles"
      :key="item.userId"
      :class="{ item: true, style1: index % 2 != 0 }"
      @click="toUser(item.userId)"
    >
      <div class="img">
        <img v-lazy="item.avatarUrl" alt="" />
        <div v-if="item.avatarDetail">
          <img src="@/assets/imgs/anchor.png" alt="">
        </div>
        
      </div>
        <div class="name">{{ item.nickname }}</div>
        <div class="gender">
          <div v-if="item.gender == 1">
            <img src="@/assets/imgs/man.png" alt="" />
          </div>
          <div v-if="item.gender == 2">
            <img src="@/assets/imgs/woman.png" alt="" />
          </div>
        </div>
        <div class="sign">
          <div v-if="item.avatarDetail">网易云音乐人</div>
          <div v-else>{{item.signature}}</div>
        </div>
    </div>
    <div class="pagination">
      <pagination
        v-if="userprofileCount > 50"
        @pre="pre"
        @next="next"
        @toPage="toPage"
        :count="Math.ceil(userprofileCount / 50)"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { searchDetail } from "@/http/api/search";
import { mapActions } from "@/store/helper/search";
import pagination from "../../components/common/pagination.vue";
export default {
  components: { pagination },
  data() {
    return {
      offset: 0,
      userprofiles: "",
      userprofileCount:''
    };
  },
  methods: {
    ...mapActions(["setCount"]),
    async getData() {
      const res = await searchDetail(this.$route.query.s, 1002, this.offset);
      console.log(res);
      this.userprofiles = res.data.result.userprofiles;
      this.userprofileCount = res.data.result.userprofileCount
      // // // console.log(this.songs)
      this.setCount(res.data.result.userprofileCount + "位用户");
    },
    //获取其他页的数据
    async more(){
      const res = await searchDetail(this.$route.query.s, 1002, this.offset);
      this.userprofiles = res.data.result.userprofiles;
    },
    toUser(id) {
      this.$router.push({ path: "/user", query: { id } });
    },
    pre() {
      if (this.offset > 0) {
        this.offset -= 50;
        this.more();
      }
    },
    next() {
      if (this.offset < this.userprofileCount) {
        this.offset += 50;
        this.more();
      }
    },
    toPage(page) {
      this.offset = (page - 1) * 50;
      this.more();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.style1 {
  background-color: rgb(249, 249, 249);
}
.box {
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.8%;
    cursor: pointer;
    &:hover {
      background-color: rgb(240, 241, 242);
    }
    .img {
      position: relative;
      width: 4.5%;
      & :nth-child(2){
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 25%;
        border-radius: 100%;
        position: absolute;
        background-color: red;
        text-align: center;
        top: 70%;
        left: 70%;
        img{
          width: 80%;
        }
      }
      img {
        border-radius: 100%;
        width: 100%;
      }
    }
    .name{
      margin-left: 1%;
      font-size: 14px;
    }
    .gender{
      width: 1%;
      margin-left: 0.5%;
      img{
        width: 100%;
        // background-color: red;
      }
    }
    .sign{
      font-size: 1px;
      margin-left: auto;
    }
  }
}
.pagination {
  width: 100%;
  margin: 2% 0 0 35%;
}
</style>