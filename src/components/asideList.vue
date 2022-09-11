<template>
  <div class="musicListBox">
    <div class="musicList">
      <div
        @click="showMusicListCreat = !showMusicListCreat"
        v-if="!showMusicListCreat"
        class="list"
      >
        创建的歌单 ▸
      </div>
      <div
        @click="showMusicListCreat = !showMusicListCreat"
        v-if="showMusicListCreat"
        class="list"
      >
        创建的歌单 ▾
      </div>
      <div v-if="showMusicListCreat" class="itemBox">
        <!-- <li v-for="(item, index) in creatList" :key="index">
        {{ item.name }}
      </li> -->

        <router-link
          :to="{ path: '/playList', query: { id: item.id } }"
          v-for="item in creatList"
          :key="item.id"
          class="item"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
    <div class="musicList">
      <div
        @click="showMusicListFollow = !showMusicListFollow"
        v-if="!showMusicListFollow"
        class="list"
      >
        收藏的歌单 ▸
      </div>
      <div
        @click="showMusicListFollow = !showMusicListFollow"
        v-if="showMusicListFollow"
        class="list"
      >
        收藏的歌单 ▾
      </div>
      <div v-if="showMusicListFollow" class="itemBox">
        <!-- <li v-for="(item, index) in followList" :key="index">
        {{ item.name }}
      </li> -->
        <router-link
          :to="{ path: '/playList', query: { id: item.id } }"
          v-for="item in followList"
          :key="item.id"
          class="item"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "@/store/helper/user";
export default {
  name: "asideList",
  data() {
    return {
      showMusicListCreat: false,
      showMusicListFollow: false,
      list: [],
    };
  },
  computed: {
    ...mapGetters(["musicList"]),
    creatList() {
      return this.musicList["resCreat"];
    },
    followList() {
      return this.musicList["resfollow"];
    },
  },
};
</script>

<style lang="less" scoped>
/* .router-link-active {
  text-decoration: none;
  background-color: rgb(246,246,247);
} */
a {
  margin-top: 10px;
}
.musicListBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .musicList {
    display: flex;
    flex-direction: column;
    width: 100%;
    .list {
      font-size: 1px;
      color: rgb(151, 144, 144);
      margin-top: 10px;
    }
    .itemBox {
      display: flex;
      flex-direction: column;
      .item {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 10px;
        font-size: 1rem;
        // margin: 5% 0 5% 0;
        padding: 2.5% 0;
        cursor: pointer;
        &:hover {
          background-color: rgb(246, 246, 247);
        }
        &:active {
          background-color: rgb(246, 246, 247);
        }
      }
    }
  }
}

.item:hover {
  background-color: rgb(246, 246, 247);
}
// .item:active{
//   background-color: rgb(246,246,247);
// }
</style>