<template>
  <div>
    <phone></phone>
    <user-info></user-info>
    <!-- <faxian></faxian> -->
    <personalized></personalized>
    <qr></qr>
    <!-- <vuex-test></vuex-test> -->
    <search></search>
    <music></music>
    <getterTest></getterTest>
    <dialogT1></dialogT1>
    <!-- <qrLogin></qrLogin> -->
    <comment></comment>
    <pagination></pagination>
  </div>
</template>

<script>
// import faxian from './findMusic/faxian.vue'
import phone from './loginTest/phone.vue'
import userInfo from './userTest/userInfo.vue'
import personalized from './dujiafangsong/personalized.vue'
import qr from './loginTest/qr.vue'
// import vuexTest from './vuex/vuexTest.vue'
import getterTest from './vuex/getterTest.vue'
import search from './search/search.vue'
import music from './play/music.vue'
import dialogT1 from './dialogTest/dialogT1.vue'
// import qrLogin from '../login/qrLogin.vue'
import comment from '../common/comment/commentItem.vue'
import pagination from '../common/pagination.vue'
export default {
name:'test',
components: { 
  // faxian,
  phone,
  userInfo,
  personalized,
  qr,
  // vuexTest,
  search,
  music,
  getterTest,
  dialogT1,
  // qrLogin,
  comment,
  pagination },
}
</script>

<style>

</style>