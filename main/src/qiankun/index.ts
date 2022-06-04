import { registerMicroApps, start } from 'qiankun'
import HeaderView from '../components/header-view'

// 向子应用传值（方法，组件等，只要是对象，key 名无要求）
const props = {
  components: {
    HeaderView
  }
}

registerMicroApps([{
    name: 'demo1',
    entry: process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : '/demo1/',
    container: '#container',
    activeRule: '/demo1',
    props
  },
  {
    name: 'demo2',
    entry: process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : '/demo2/',
    container: '#container',
    activeRule: '/demo2',
    props
  }
])
start()
