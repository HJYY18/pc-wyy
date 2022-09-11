<template>
  <div class="box">
    <div v-for="(item, index) in artistList" :key="item.id" class="item">
      <span v-if="index != 0" class="s1">/</span>
      <!-- <span>{{item.name}}</span> -->
      <div class="name" @click="toArtist(item.id)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["artistList"],
  methods: {
    toArtist(id) {
      this.$router.push({ path: "/artist", query: { id } })
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .item {
    display: flex;
    .s1 {
      margin:0 5px 0 5px;
    }
    .name{
      cursor: pointer;
      color: rgba(110, 101, 101, 0.662);
      &:hover{
        color: black;
      }
    }
  }
}
</style>