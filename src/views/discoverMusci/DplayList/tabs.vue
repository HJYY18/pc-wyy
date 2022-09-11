<template>
  <div class="box">
    <div class="all" @click="changeToAll">全部歌单</div>
    <div class="tabBox">
      <div class="tab" v-for="index in 5" :key="index">
        <div class="category">{{ categories[index - 1] }}</div>
        <div class="subBox">
          <div :class="cat == item?'sub chosen':'sub'" v-for="item in sub[index - 1]" :key="item" @click="changeQuery(item)">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { playlistCatlist } from "@/http/api/findMusic";
export default {
  data() {
    return {
      categories: ["语种", "风格", "场景", "情感", "主题"],
      sub: [[], [], [], [], []],
      cat:''
    };
  },
  methods: {
    changeQuery(name) {
      this.$router.push({path:'/findMusci/playList',query:{cat:name}})
      this.$emit('change');
    },
    changeToAll(){
      this.$router.push({path:'/findMusci/playList',query:{cat:'全部'}})
    }
  },
  created() {
    playlistCatlist().then((res) => {
      // console.log(res)
      let sub = res.data.sub;
      //分类存放
      for (let key in sub) {
        if (sub[key].category == 0) {
          this.sub[0].push(sub[key].name);
        } else if (sub[key].category == 1) {
          this.sub[1].push(sub[key].name);
        } else if (sub[key].category == 2) {
          this.sub[2].push(sub[key].name);
        } else if (sub[key].category == 3) {
          this.sub[3].push(sub[key].name);
        } else if (sub[key].category == 4) {
          this.sub[4].push(sub[key].name);
        }
      }
      this.cat = this.$router.query.cat
    //   console.log(this.sub);
      //   this.categories = res.data.categories;
      //   this.sub = res.data.sub;
    });
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  .all {
    width: 100%;
    // background-color: green;
    border-bottom: 1px solid rgb(190, 186, 186);
    padding: 2%;
  }
  .tabBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    .tab {
      width: 100%;
      display: flex;
      margin-bottom: 2%;
      font-size: 15px;
      margin-top: 1%;
      .category {
        width: 15%;
        color: rgba(176, 168, 168, 0.675);
        //   display: flex;
        //   flex-direction: column;
        // background-color: red;
      }
      .subBox {
        width: 85%;
        display: flex;
        flex-direction: row;
        // background-color: black;
        flex-wrap: wrap;
        .sub{
            width: 16%;
            margin-bottom: 2%;
            display: flex;
            // margin-right: 10px;
        }
      }
    }
  }
}
.chosen{
    border-radius: 5%;
    background-color: rgb(254,246,245);
    color: red;
}
</style>