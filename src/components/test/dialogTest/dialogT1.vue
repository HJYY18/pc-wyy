<template>
  <div class="box" @click.stop>
    <button @click="show">show</button>
    <myDialog @close="Onclose" @outBlur="outblur" v-if="isShow" class="dialog">
      <template v-slot:temp1>
        <temp1></temp1>
      </template>
      <template v-slot:temp2>
        <h2>替换temp2内容</h2>
      </template>
    </myDialog>
  </div>
</template>

<script>
import myDialog from "@/components/common/my-dialog";
import temp1 from "./temp1.vue";
export default {
  components: { myDialog, temp1 },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    Onclose() {
      this.isShow = false;
      console.log("close自定义事件触发了");
    },
    show() {
      console.log("show");
      this.isShow = true;
    },
  },
  mounted() {
    document.body.addEventListener(
      "click",
      () => {
        this.isShow = false;
      },
      false
    );
  },
};
</script>

<style lang="less" scoped>
// .box{
//     width: auto;
//     height: auto;
// }
.dialog {
  background-color: red;
  //   width: 200px;
  // height: 400px;
}
</style>