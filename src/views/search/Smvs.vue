<template>
  <div class="box">
    <div class="itemBox">
      <div v-for="item in mvs" :key="item.id" class="item">
        <div @click="toMv(item.id)" class="img">
          <img v-lazy="item.cover" alt="" />
        </div>
        <div @click="toMv(item.id)">{{ item.name }}</div>
        <div @click="toArtist(item.artistId)">{{ item.artistName }}</div>
      </div>
    </div>
    <div class="pagination">
      <pagination
        v-if="mvCount > 50"
        @pre="pre"
        @next="next"
        @toPage="toPage"
        :count="Math.ceil(mvCount / 50)"
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
      mvs: "",
      mvCount: "",
    };
  },
  methods: {
    ...mapActions(["setCount"]),
    async getData() {
      const res = await searchDetail(this.$route.query.s, 1004, this.offset);
      console.log(res);
      this.mvs = res.data.result.mvs;
      this.mvCount = res.data.result.mvCount;
      // // // console.log(this.songs)
      this.setCount(res.data.result.mvCount + "张专辑");
    },
    async more() {
      const res = await searchDetail(this.$route.query.s, 1004, this.offset);
      this.mvs = res.data.result.mvs;
    },
    toArtist(id) {
      this.$router.push({ path: "/artist", query: { id } });
    },
    toMv(id) {
      this.$router.push({ path: "/mv", query: { id } });
    },
    pre() {
      if (this.offset > 0) {
        this.offset -= 50;
        this.more();
      }
    },
    next() {
      if (this.offset < this.mvCount) {
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
.box {
  width: 100%;
  .itemBox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    .item {
      display: flex;
      flex-direction: column;
      width: 22%;
      margin: 0 2% 1% 0;
      font-size: 1px;
      & div {
        overflow: hidden;
        text-overflow: ellipsis;
        &:nth-child(2) {
          margin-top: 1%;
          cursor: pointer;
        }
        &:nth-child(3) {
          margin-top: 1%;
          color: rgb(223, 217, 217);
          cursor: pointer;
          &:hover {
            color: rgb(159, 150, 150);
          }
        }
        white-space: nowrap;
      }
      // border: 1px solid black;
      .img {
        width: 100%;
        img {
          width: 100%;
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