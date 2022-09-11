<template>
  <div class="box">
    <div class="link">
      <div class="link1">找到{{ count }}{{ type }}</div>
      <div class="link2">
        <router-link
          v-for="item in res"
          :key="item.path"
          class="item"
          :to="item.path"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
    <div class="view" v-if="isRouterAlive">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "@/store/helper/search";
export default {
  // inject: ['reload'],
  data() {
    return {
      isRouterAlive:true,
      itemList: [
        {
          name: "单曲",
          path: "/search/songs?s=",
        },
        {
          name: "歌手",
          path: "/search/artists?s=",
        },
        {
          name: "专辑",
          path: "/search/albums?s=",
        },
        {
          name: "视频",
          path: "/search/mvs?s=",
        },
        {
          name: "歌单",
          path: "/search/playlists?s=",
        },
        {
          name: "用户",
          path: "/search/userprofiles?s=",
        },
      ],
      res: [],
    };
  },
  computed: {
    ...mapState(["count", "type"]),
  },
  methods: {
     reload(){
                this.isRouterAlive = false
                this.$nextTick(function(){
                    this.isRouterAlive = true
                })
            },
    route() {
      console.log(this.$route);
    },
    list() {
      console.log(this.itemList);
      console.log(this.res);
    },
    updateItemList() {
      let temp = JSON.parse(JSON.stringify(this.itemList));
      for (let i = 0; i < temp.length; i++) {
        temp[i]["path"] += this.$route.query.s;
      }
      this.res = temp;
    },
    created() {
      this.res = [];
      this.updateItemList();
    },
  },
  watch: {
    $route: {
      handler() {
        // console.log(this.reload)
        this.updateItemList();
        this.reload()
      },
      deep: true,
      immediate: true,
    },
    // $route(to, from) {
    //   if (to !== from) {
    //     this.reload();
    //   }
    // },
  },
  // watch: {
  //   // 路由push相同地址不同参数时 不会自动刷新页面，这里通过watch监听路由变化，一但发生变化reload刷新
  //   $route(to, from) {
  //     if (to !== from) {
  //       this.reload();
  //     }
  //   },
  // },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.router-link-active {
  text-decoration: none;
  font-weight: 800;
  /* color: yellow; */
}
a {
  text-decoration: none;
  font-weight: 400;
  color: black;
}
.link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  width: 100%;
}
.link1 {
  margin-bottom: 15px;
  font-weight: 850;
  font-size: 18px;
  color: black;
}
.link2 {
  margin-bottom: 20px;
}
.item {
  margin-right: 50px;
}
.view {
  border-top: 1px solid rgb(218, 215, 221);
}
</style>