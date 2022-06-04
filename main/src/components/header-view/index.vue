<template>
  <div class="header">
    <div>主菜单组件</div>
    <button @click="jumpMenu">返回主菜单</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    const jumpMenu = () => {
      location.href = '/'
    }
    return {
      jumpMenu
    }
  }
})
</script>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid #eee;
  }
</style>
