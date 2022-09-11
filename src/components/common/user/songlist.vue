<template>
  <div class="box">
    <!-- <button @click="show">show</button> -->
    <div class="created">
      <div class="type">
        <span>歌单</span>
        <span>({{ create.length }})</span>
      </div>
      <div class="itemBox">
        <div
          v-for="item in create.slice(Coffset, Coffset + 18)"
          :key="item.id"
          class="item"
        >
          <!-- <div v-for="(item, index) in create" :key="item.id"> -->
          <div class="img" @click="toMusicList(item.id)">
            <img v-lazy="item.coverImgUrl" alt="" />
          </div>
          <div @click="toMusicList(item.id)">{{ item.name }}</div>
        </div>
      </div>
      <div class="pagination">
        <pagination
          :count="Math.ceil(create.length / 18)"
          @next="Cnext"
          @pre="Cpre"
          @toPage="CtoPage"
        ></pagination>
      </div>
      <!-- <button @click="Cnext">→</button>
      <button @click="Cpre">←</button> -->
    </div>
    <div class="followed">
      <div class="type">
        <span>收藏</span>
        <span>({{ followed.length }})</span>
      </div>
      <div class="itemBox">
        <div
          v-for="item in followed.slice(Foffset, Foffset + 18)"
          :key="item.id"
          class="item"
        >
          <!-- <div v-for="(item, index) in create" :key="item.id"> -->
          <div class="img" @click="toMusicList(item.id)">
            <img v-lazy="item.coverImgUrl" alt="" />
          </div>
          <div @click="toMusicList(item.id)">{{ item.name }}</div>
        </div>
      </div>
      <div class="pagination">
        <pagination
          :count="Math.ceil(followed.length / 18)"
          @next="Fnext"
          @pre="Fpre"
          @toPage="FtoPage"
        ></pagination>
      </div>
      <!-- <button @click="Cnext">→</button>
      <button @click="Cpre">←</button> -->
    </div>
  </div>
</template>

<script>
import { getUserMusicList } from "@/http/api/user";
import pagination from "../pagination.vue";
export default {
  props: ["id"],
  components: { pagination },
  data() {
    return {
      create: [],
      followed: [],
      offset: 0,
      more: "",
      Coffset: 0,
      // Ccur: 1,
      Foffset: 0,
      Fcur: 1,
    };
  },
  methods: {
    async getData() {
      let res = await getUserMusicList(this.id, this.offset);
      //   console.log(res);
      this.more = res.data.more;
      await res.data.playlist.forEach((element) => {
        if (element.userId == this.id) {
          this.create.push(element);
        } else {
          this.followed.push(element);
        }
      });
      while (this.more) {
        console.log("more");
        this.offset += 30;
        await this.getData(this.id, this.offset);
      }
      //   console.log(this.created.length);
      //   console.log(this.followed.length);
    },
    Cnext() {
      if (this.Coffset + 18 < this.create.length) {
        this.Coffset = this.Coffset + 18;
      }
      console.log(this.Coffset);
    },
    Cpre() {
      if (this.Coffset - 18 >= 0) {
        this.Coffset = this.Coffset - 18;
      }
      console.log(this.Coffset);
    },
    Fnext() {
      if (this.Foffset + 18 < this.followed.length) {
        this.Foffset = this.Foffset + 18;
      }
      console.log(this.Foffset);
    },
    Fpre() {
      if (this.Foffset - 18 >= 0) {
        this.Foffset = this.Foffset - 18;
      }
      console.log(this.Foffset);
    },
    CtoPage(page) {
      this.Coffset = (page - 1) * 18;
    },
    FtoPage(page) {
      this.Foffset = (page - 1) * 18;
    },
    show() {
      console.log(this.create);
      console.log(this.followed);
      //   const uniqueNumbers = [...new Set(this.create)]
      //   console.log(uniqueNumbers)
      //   let arr = [
      //     {id:1,name:'tom'},
      //     {id:1,name:'tom'},
      //     {id:2,name:'jack'},
      //   ]
      //   const arrd = [...new Set(arr)]
      //   console.log(arrd)
    },
    toMusicList(id) {
      this.$router.push({ path: "playList", query: { id } });
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
  font-size: 15px !important;
  //   border: 1px solid black;
  .created,
  .followed {
    margin-top: 4%;
    // width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .type {
      align-self: flex-start;
      & :first-child {
        font-size: 1.2rem;
        color: black;
        font-weight: 600;
        margin-right: 5px;
      }
      & :nth-child(2) {
        font-size: 1px;
        // padding-left: 1%;
      }
    }
    // flex-wrap: wrap;
    // border: 1px solid black;
    .itemBox {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      //   border: 1px solid black;
      .item {
        width: 15%;
        margin: 1% 1.5% 2% 0;
        & :nth-child(2) {
          cursor: pointer;
          &:hover {
            color: black;
          }
        }

        .img {
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          position: relative;
          img {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 3%;
          }
        }
      }
    }
  }
  .pagination {
    margin-bottom: 5%;
    font-size: 100;
  }
}
</style>