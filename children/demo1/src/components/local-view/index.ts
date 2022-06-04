import LocalView from './index.vue'

LocalView.install = function (Vue: any) {
  Vue.component('LocalView', LocalView)
}

export default LocalView
