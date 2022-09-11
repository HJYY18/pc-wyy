<template>
  <div>
    <button @click="findTest">点击测试首页-发现接口</button>
  </div>
</template>

<script>
import {find} from '@/http/api/findMusic'
export default {
methods: {
    async findTest() {
        console.log('findTest')
        console.log( await find() )
    },
},
}
</script>

<style>

</style>