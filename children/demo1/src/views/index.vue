<template>
  <header-view></header-view>
  demo1 - 首页
  <local-view></local-view>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import LocalView from '../components/local-view'
export default defineComponent({
  components: {
    LocalView
  }
})
</script>

<style scoped>
</style>
