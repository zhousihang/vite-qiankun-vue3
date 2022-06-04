// @ts-nocheck
import { App, createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/es/helper'
import app from './App.vue'
import routes from './router'

let root: App

// renders 生命周期函数
renderWithQiankun({
  mount (props: any) { render(props) },
  bootstrap (props: any) {},
  unmount () { root.unmount() },
  update () { }
})

// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}

// 渲染页面
function render (props: any) {
  const { container } = props
  const router = createRouter({
    history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/demo2' : '/'),
    routes
  })
  root = createApp(app)
  root.use(router)

  // 主应用全局组件
  Object.keys(window.props.components).map(key => {
    root.component(key, window.props.components[key])
    return false
  })

  const dom = container ? container.querySelector('#app') : document.getElementById('app')
  root.mount(dom)
}
