// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './qiankun'

import HeaderDemo2 from './components/header-view'

// 全局组件 - 挂载到 window
window.props = {
  // 命名 - 符合 json 格式就行
  components: {
    HeaderDemo2
  }
}

const app = createApp(App)
app.use(router).mount('#main')
