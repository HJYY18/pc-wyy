<template>
  <div id="box">
    <div @click="close" class="close">✕</div>
    <div>评论</div>
    <!-- <input class="input" type="textarea" v-model="input" placeholder="回复"> -->
    <textarea class="input" name="" id="" cols="55" rows="6" v-model="input" placeholder="回复"></textarea>
    <div class="commit">
      <div :class="{over: input.length >140}">{{140 - input.length}}</div>
      <div v-if="input == ''" class="commit1">评论</div>
      <div v-else @click="comment" class="commit2">评论</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    close() {
      this.$emit('close')
    },
    comment(){
      this.$emit('comment',this.input)
    }
  },
};
</script>

<style lang="less" scoped>
.over{
  color: red !important;
}
#box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .close{
    align-self: flex-end;
  }
  .commit{
    align-self: flex-end;
    text-align: center;
    width: 15%;
    & :nth-child(1){
      font-size: 1px;
      color: rgb(202, 196, 196);
    }
    .commit1{
      background-color: rgb(254,170,167);
      margin-right: 2%;
      border-radius: 100vh;
      margin: 15% 10% 0 0 ;
      // padding: 1% 10%;
    }
    .commit2{
      background-color: rgb(253,84,78);
      border-radius: 100vh;
      cursor: pointer;
      margin: 15% 10% 0 0 ;
      &:hover{
        background-color: rgb(232,72,66);
      }
    }
  }
}
</style>