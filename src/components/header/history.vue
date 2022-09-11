<template>
  <div>
    <div>
      <div>搜索历史</div>
      <div><img src="@/assets/imgs/clear.png" alt=""></div>
    </div>
    <div class="item.box">
          <div v-for="(item,index) in history">
      {{item}}
    </div>
    </div>

  </div>
</template>

<script>
export default {
  props:['history'],
data() {
  return {
    history: [],
  };
},
methods: {
  addHistory() {
    
  },
},
}
</script>

<style>

</style>