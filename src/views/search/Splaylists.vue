<template>
  <div class="box">
    <div
      v-for="(item, index) in playlists"
      :key="item.id"
      :class="{ item: true, style1: index % 2 != 0 }"
      @click="toPlayList(item.id)"
    >
      <div class="img"><img v-lazy="item.coverImgUrl" alt="" /></div>
      <div class="name">{{ item.name }}</div>
      <div class="count">{{ item.trackCount }}首</div>
      <div class="user">
        <span>by</span>
        <span @click.stop @click="toUser(item.userId)">{{
          item.creator.nickname
        }}</span>
      </div>
    </div>
    <div class="pagination">
      <pagination
        v-if="playlistCount > 50"
        @pre="pre"
        @next="next"
        @toPage="toPage"
        :count="Math.ceil(playlistCount / 50)"
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
      playlists: "",
      playlistCount: "",
    };
  },
  methods: {
    ...mapActions(["setCount"]),
    async getData() {
      const res = await searchDetail(this.$route.query.s, 1000, this.offset);
      // console.log(res);
      this.playlists = res.data.result.playlists;
      this.playlistCount = res.data.result.playlistCount;
      // // // console.log(this.songs)
      this.setCount(res.data.result.playlistCount + "个歌单");
    },
    //获取其他页的数据
    async more() {
      const res = await searchDetail(this.$route.query.s, 1000, this.offset);
      this.playlists = res.data.result.playlists;
    },
    toUser(id) {
      this.$router.push({ path: "/user", query: { id } });
    },
    toPlayList(id) {
      this.$router.push({ path: "/playList", query: { id } });
    },
    pre() {
      if (this.offset > 0) {
        this.offset -= 50;
        this.more();
      }
    },
    next() {
      if (this.offset < this.playlistCount) {
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
  font-size: 14px;
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1% 0;
    cursor: pointer;
    &:hover {
      background-color: rgb(240, 241, 242);
    }
    .img {
      width: 5%;
      img {
        width: 100%;
        border-radius: 10%;
      }
    }
    .name {
      width: 45%;
      margin-left: 1%;
      &:hover {
        color: black;
      }
    }
    .count {
      width: 15%;
      font-size: 10px;
    }
    .user {
      width: 35%;
      font-size: 10px;
      & :first-child {
        color: rgb(232, 229, 229);
      }
      & :nth-child(2) {
        margin-left: 1%;
        color: rgb(88, 87, 87);
        &:hover {
          color: black;
        }
      }
    }
  }
}
.pagination {
  width: 100%;
  margin: 2% 0 0 35%;
}
</style>