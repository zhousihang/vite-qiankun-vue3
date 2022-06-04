<template>
  <div class="local-view">
    <img src="/demo2-images/logo.png" alt="子应用 demo2 图片">
    <div>demo2 - 组件</div>
    <div>demo2 的主应用组件，是通过挂在到 window 传递过来</div>
    <div>demo1 的主应用组件，是挂载到微应用注册信息，提供的 props 传递过来</div>
  </div>
  
</template>

<style scoped>
  .local-view {
    text-align: center;
    line-height: 40px;
    margin-top: 40px;
  }
</style>

