<template>
  <div>
    <div class="avatar" @click="toVideo(item.data.vid)">
      <img :src="item.data.coverUrl" alt="" />
    </div>
    <div class="title" @click="toVideo(item.data.vid)">
      {{ item.data.title }}
    </div>
    <div class="creator">
      <div>by</div>
      <div>{{ item.data.creator.nickname }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    toVideo(id) {
      this.$router.push({path:'/videoDetail',query:{id}})
    },
  },
};
</script>

<style lang="less" scoped>
.avatar {
  width: 100%;
  height: 100%;
  img {
    height: 100%;
    width: 100%;
  }
}
.title {
  color: black;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    font-weight: 500;
  }
}
.creator {
  display: flex;
  color: rgb(211, 203, 203);
  & :nth-child(2) {
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
}
</style>