<template>
  <div class="title">主应用</div>
  <div class="box">
    <router-link class="item" to="/demo1">前往 demo1</router-link>
    <router-link class="item" to="/demo2">前往 demo2</router-link>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {

  }
})
</script>

<style scoped>
  .box {
    display: flex;
    align-items: center;
    text-align: center;
  }
  .item {
    width: 200px;
    line-height: 200px;
    margin: 50px;
    border: 1px solid #ddd;
  }
</style>
