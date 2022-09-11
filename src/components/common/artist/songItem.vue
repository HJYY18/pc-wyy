<template>
  <div id="box" @dblclick="playMusic(item.id)">
    <div class="index">
      <div>{{ ("0" + (index + 1)).slice(-2) }}</div>
      <div class="img">
        <img
          src="@/assets/imgs/like.png"
          alt=""
          v-if="likedsongIds.indexOf(item.id) == -1"
          @click="like(item.id,false)"
        />
        <img
          src="@/assets/imgs/liked.png"
          alt=""
          v-else
          @click="like(item.id,true)"
        />
      </div>
    </div>
    <div class="name">
      <span>{{ item.name }}</span>
      <span v-if="item.alia[0]">({{ item.alia[0] }})</span>
      <span v-if="item.transName">({{ item.transName }})</span>
    </div>
    <div class="time">
      {{ convertTIme(item.dt) }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "@/store/helper/music";
import { mapActions as mapActionsUser }  from "@/store/helper/user";
import { mapState } from "@/store/helper/user";
export default {
  props: ["item", "index"],
  computed: {
    ...mapState(["likedsongIds"]),
  },
  methods: {
    ...mapActions(["setMusicInfo"]),
    ...mapActionsUser(['likeMusic']),
    like(id,status){
      this.likeMusic({'id':id,'status':status})
      // console.log(id,status)
    },
    
    //处理时间为 分:秒
    convertTIme(t) {
      let time = Math.floor(t / 1000);
      let min = Math.floor(time / 60);
      let sec = time % 60;
      // console.log(min, sec);
      min = ("0" + min).slice(-2);
      sec = ("0" + sec).slice(-2);
      const res = min + ":" + sec;
      return res;
    },
    playMusic(id) {
      // this.setPlayList(this.songs);
      // console.log(id)
      this.setMusicInfo(id);
      this.$emit('play');
    },
  },
};
</script>

<style lang="less" scoped>
#box {
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  .index {
    display: flex;
    align-items: center;
    width: 6%;
    padding-left: 2%;
    // margin-left: 2%;
    // border: 1px solid black;
    .img {
      margin-left: 15%;
    }
    img {
      width: 20px;
    }
  }
  .name {
    display: flex;
    align-items: center;
    width: 80%;
    color: black;
  }
  .time {
    display: flex;
    align-items: center;
    vertical-align: middle;
    width: 10%;
    color: rgb(183, 178, 178);
  }
}
</style>