<template>
  <div class="box">
    <!-- zhuanji
    <button @click="getData">233</button> -->
    <div
      v-for="(item, index) in albums"
      :key="item.id"
      :class="{ item: true, style1: index % 2 != 0 }"
      @click="toAlbum(item.id)"
    >
      <div class="img"><img v-lazy="item.blurPicUrl" alt="" /></div>
      <div class="name">{{ item.name }}</div>
      <div class="artName" @click.stop>
        <div @click="toArtist(item.artist.id)">{{ item.artist.name }}</div>
        <div @click="toArtist(item.artist.id)" v-if="item.artist.trans">
          ({{ item.artist.trans }})
        </div>
      </div>
    </div>
    <div class="pagination">
      <pagination
      v-if="albumCount>50"
        @pre="pre"
        @next="next"
        @toPage="toPage"
        :count="Math.ceil(albumCount / 50)"
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
      albums: "",
      albumCount: "",
    };
  },
  methods: {
    ...mapActions(["setCount"]),
    async getData() {
      const res = await searchDetail(this.$route.query.s, 10, this.offset);
      console.log(res);
      this.albumCount = res.data.result.albumCount;
      this.albums = res.data.result.albums;
      // // console.log(this.songs)
      this.setCount(res.data.result.albumCount + "张专辑");
    },
    async more() {
      const res = await searchDetail(this.$route.query.s, 10, this.offset);
      this.albumCount = res.data.result.albumCount;
    },
    toArtist(id) {
      this.$router.push({ path: "/artist", query: { id } });
    },
    toAlbum(id) {
      this.$router.push({ path: "/albums", query: { id } });
    },
    pre() {
      if (this.offset > 0) {
        this.offset -= 50;
    this.more();
      }
    },
    next() {
      if ( this.offset < this.albumCount)  {
        this.offset += 50;
    this.more();

      }
    },
    toPage(page){
      this.offset = (page-1) *50
    this.more();

    }
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
  width: 100%;
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1% 0;
    cursor: pointer;
    & :nth-child(2){
    margin-left: 2%;
    }
    &:hover {
      background-color: rgb(240, 241, 242);
    }
    .img {
      width: 5%;
      border: 0.1px solid rgb(231, 223, 223);
      border-radius: 2%;
      img {
        width: 100%;
      }
    }
    .name {
      width: 45%;
      font-size: 15px;
    }
    .artName {
      width: 50%;
      font-size: 10px;
      display: flex;
      & :nth-child(1) {
        &:hover {
          color: black;
        }
      }
      & :nth-child(2) {
        margin-left: 1%;
        color: rgb(180, 170, 170);
      }
    }
  }
  .pagination {
    width: 100%;
    margin: 2% 0 0 35%;
  }
}
</style>