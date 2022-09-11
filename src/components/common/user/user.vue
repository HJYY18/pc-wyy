<template>
  <div class="box">
    <div class="userInfo">
      <div class="avatar">
        <img :src="user.profile.avatarUrl" alt="" />
      </div>
      <div class="info">
        <div class="name">{{ user.profile.nickname }}</div>
        <div class="detailInfo">
          <div v-if="user.identify" class="identify">
            <div class="img">
              <img :src="user.identify.imageUrl" alt="" />
            </div>
            <span>{{ user.identify.imageDesc }}</span>
          </div>
          <div class="lv">Lv{{ user.level }}</div>
          <div class="gender">
            <div v-if="user.profile.gender == 1">
              <img src="@/assets/imgs/man.png" alt="" />
            </div>
            <div v-if="user.profile.gender == 2">
              <img src="@/assets/imgs/woman.png" alt="" />
            </div>
          </div>
        </div>
        <div class="followAndFans">
          <div>
            <div>{{ user.profile.eventCount }}</div>
            <div>动态</div>
          </div>
          <div>
            <div>{{ user.profile.follows }}</div>
            <div>关注</div>
          </div>
          <div>
            <div>{{ user.profile.followeds }}</div>
            <div>粉丝</div>
          </div>
        </div>
        <!-- <div>
          <div>所在地区{{}}</div>
        </div> -->
      </div>
    </div>
    <div class="musicList">
      <songlist :id="user.profile.userId"></songlist>
    </div>
    <div class="collect"></div>
  </div>
</template>

<script>
import { getUserDetail } from "@/http/api/user";
import songlist from "./songlist.vue";
export default {
  components:{songlist},
  data() {
    return {
      id: "",
      user: "",
    };
  },
  methods: {
    async getData() {
      let res = await getUserDetail(this.$route.query.id);
      this.user = res.data;
      console.log(res);
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  font-size: 10px;
  .userInfo {
    width: 100%;
    display: flex;
    .avatar {
      width: 15%;
      img {
        width: 100%;
        border-radius: 100%;
      }
    }
    .info {
      width: 80%;
      margin-left: 2%;
      .name {
        font-size: 27px;
        font-weight: 600;
      }
      .detailInfo {
        display: flex;
        width: 100%;
        // height: 2.5%;
        padding: 1% 0;
        border-bottom: 0.1px solid rgb(240, 233, 233);
        & > * {
          margin-right: 1%;
        }
        .identify {
          display: flex;
          align-items: center;
          width: auto;
          border-radius: 60px;
          background-color: rgb(253, 228, 226);
          color: red;
          .img {
            width: 10%;
            img {
              width: 100%;
            }
          }
        }
        .lv {
          padding: 0 1%;
          text-align: center;
          vertical-align: middle;
          background-color: rgb(215, 210, 210);
          border-radius: 60px;
        }
        .gender {
          width: 2%;
          // margin-left: 0.5%;
          img {
            width: 100%;
            // background-color: red;
          }
        }
      }
      .followAndFans {
        display: flex;
        margin-top: 2%;
        & > * {
          text-align: center;
          padding: 0 25px;
          border-right: 0.1px solid rgb(240, 233, 233);
          & :first-child {
            font-size: 20px;
          }
          & :nth-child(2) {
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>