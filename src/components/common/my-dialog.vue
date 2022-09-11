<template>
  <div class="box">
    <!-- <button @click="close">close</button> -->
    <div class="temp1">
      <slot name="temp1">
      </slot>
    </div>
    <div class="temp2">
      <slot name="temp2">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // close() {
    //   this.$emit("close");
    // },
    // blur() {
    //   this.$emit("outBlur");
    // },
  },
};
</script>

<style lang="less" scoped>
</style>