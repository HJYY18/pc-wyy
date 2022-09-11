<template>
  <div class="search">
    <div class="s-box">
      <img @click="search(keywords)" src="@/assets/imgs/search.png" alt="" />
      <div @click.stop>
        <input
          type="text"
          placeholder="搜索"
          @focus="getFocus"
          v-model="keywords"
          @keydown.enter="search(keywords)"
        />
        <div v-if="focused" class="dialogBox">
          <myDialog class="dialog" v-if="keywords == ''">
            <!-- <template v-slot:temp1>
              <history :history="history"></history>
            </template> -->
            <template v-slot:temp2>
              <hotSearch @hotsearch="hotsearch"></hotSearch>
            </template>
          </myDialog>
          <myDialog class="dialog" v-else>
            <template v-slot:temp1>
              <message></message>
            </template>
          </myDialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myDialog from "../common/my-dialog.vue";
// import history from "./history.vue";
import hotSearch from "./hotSearch.vue";
import message from "./message.vue";
export default {
  name: "elSearch",
  data() {
    return {
      focused: false,
      keywords: "",
      history:[]
    };
  },
  components: {
    myDialog,
    // history,
    hotSearch,
    message,
  },
  methods: {
    getFocus() {
      this.focused = true;
    },
    search(keywords) {
      this.focused = false;
      if(this.history.indexOf(keywords) == -1){
        this.history.push(keywords)
      }
      // console.log(keywords)
      this.$router.push({ path: "/search/songs", query: { s: keywords } });
    },
    hotsearch(data){
      this.focused = false;
      this.keywords = data
    }
  },
  mounted() {
    document.body.addEventListener(
      "click",
      () => {
        this.focused = false;
      },
      false
    );
  },
};
</script>

<style lang="less" scoped>
input {
  background-color: rgb(242, 80, 74) !important;
  color: white;
  border: none;
  width: 170px;
  height: 20px;
  line-height: 20px;
  outline: none;
}
.search {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: rgb(242, 80, 74); */
  margin-left: 60px;
  .s-box {
    width: 220px;
    height: 30px;
    border-radius: 30px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgb(242, 80, 74);
    .dialogBox {
      overflow: hidden;
      border-radius: 2%;
      top: 110%;
      left: -20%;
      position: absolute;
      width: 170%;
      height: 60vh;
      background-color: white;
      z-index: 30;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      .dialog {
        // top: 110%;
        // left: -20%;
        // position: absolute;
        // width: 180%;
        // height: 50vh;
        // background-color: white;
        // z-index: 20;
        // box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        overflow-y: auto;
        height: 100%;
      }
    }
  }
}

::-webkit-input-placeholder {
  color: rgba(188, 182, 182, 0.578);
}
.search img {
  width: auto;
  height: 15px;
}
</style>