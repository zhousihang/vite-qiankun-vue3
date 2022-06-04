# 总结 vite + qiankun + vue3 遇到的坑
---
node 版本：16.15.0
# 一、主应用（main）
1. 首先通过 npm init vite@latest 创建主应用，项目名 main，框架 vue + ts 。
2. 在 main 项目安装 qiankun 。
	```npn
	npm install qiankun -S
	```	
	```
3. 在 main/src 文件下创建 qiankun 文件夹 index.ts 文件，这里放置微应用的注册信息。
	```ts
		import { registerMicroApps, start } from 'qiankun'
		registerMicroApps([{
		    name: 'demo1',
		    entry: process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : '/demo1/',
		    container: '#container',
		    activeRule: '/demo1'
		  },
		  {
		    name: 'demo2',
		    entry: process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : '/demo2/',
		    container: '#container',
		    activeRule: '/demo2'
		  }
		])
		start()
	```
4. 在 main 项目 main.ts 引入微应用注册信息 `(上面那文件)`。
	```npm
	import './qiankun'
	```
	### 主应用这样就配置好了


# 二、子应用
1. 同样通过 npm init vite@latest 创建主应用，项目名 demo1 以及 demo2，框架 vue + ts。
	`所有子应用配法一样 demo1 跟 demo2，这里统称子应用。`
2. 子应用不需要安装 qiankun，但需要安装 vite-plugin-qiankun，在 main.ts  以及 vite.config.ts 里引入。
	> main.ts（示例）：
	```ts
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
	    history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/demo1' : '/'),
	    routes
	  })
	  root = createApp(app)
	  root.use(router)
	  const dom = container ? container.querySelector('#app') : document.getElementById('app')
	  root.mount(dom)
	}

	```
	> vite.config.ts（示例）：
	```ts
	import { defineConfig } from 'vite'
	import vue from '@vitejs/plugin-vue'
	import qiankun from 'vite-plugin-qiankun'
	
	const options = {
	  server: {
	    port: 8081,
	    cors: true
	  },
	  plugins: [
	    vue(),
	    qiankun('demo1', {
	      useDevMode: true
	    })
	  ],
	  build: {
	    target: 'es2015',
	    outDir: '../../build/demo1'
	  }
	}
	
	// 打包 - 需要
	if (process.env.NODE_ENV === 'production') {
	  // @ts-expect-error
	  options.base = '/demo1'
	}
	
	export default defineConfig(options)

	```
	### 子应用这样就配置好了


# 三、子应用如何调用主应用的东西 `（组件、方法等）`
1. 可以挂载到微应用注册信息，提供的 props 参数里。
	> 传值示例：(在主应用 main/src 文件下 qiankun 文件夹 index.ts 文件里，增加 props 对象)
	```ts
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

	```
	> 接收示例：(在子应用 main.ts 文件里，render 函数下 props 里面就有了)
	```ts
	// 渲染页面
	function render (props: any) {
	  const { container } = props
	  const router = createRouter({
	    history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/demo1' : '/'),
	    routes
	  })
	  root = createApp(app)
	  root.use(router)
	
	  // 主应用全局组件
	  Object.keys(props.components).map(key => {
	    root.component(key, props.components[key])
	    return false
	  })
	  
	  const dom = container ? container.querySelector('#app') : document.getElementById('app')
	  root.mount(dom)
	}
	```
2. 通过挂载到 window 里。
	> 传值示例：(在 main 项目 main.ts 文件里)
	```ts
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

	```
	> 接收示例：(在子应用 main.ts 文件里，render 函数下)
	```ts
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
	```
	### 最后关于子应用如何调用主应用的组件或方法，都能通过挂载的方式进行复用，以上是组件的例子，方法或传值同理。

# 四、关于子应用静态图片的加载
1. 在子应用 public 文件下，创建代理目录，例如 demo1-images、demo2-images 。
2. 在主应用 main 的 vite.config.ts 配置 server 代理
	```ts
	  server: {
	    proxy: { // 代理
	      '/demo1-images': 'http://localhost:8081',
	      '/demo2-images': 'http://localhost:8082'
	    }
	  }
	```
3. 例如子应用 demo1 应用
	```html
	<img src="/demo1-images/logo.png" alt="子应用 demo1 图片">
	```
	### 这样就能访问到静态图片了
	
# 五、推荐 npm-run-all 的使用
1. `npm-run-all 可以并行运行多个命令，在整个项目的根目录配置，这里使用 webpack。`
2.  在根路径下安装 npm-run-all。
	```npn
	npm install npm-run-all -D
	```	
3. 在 package.json 文件里，配置 scripts。
	```json
	"scripts": {
	   "install": "npm-run-all --parallel install:*",
	   "install:main": "cd ./main && npm install",
	   "install:demo1": "cd ./children/demo1 && npm install",
	   "install:demo2": "cd ./children/demo2 && npm install",
	   "serve": "npm-run-all --parallel start:*",
	   "start:main": "cd ./main && vite --open",
	   "start:demo1": "cd ./children/demo1 && vite",
	   "start:demo2": "cd ./children/demo2 && vite",
	   "build": "npm-run-all --parallel build:*",
	   "build:main": "cd ./main && npm run build",
	   "build:demo1": "cd ./children/demo1 && npm run build",
	   "build:demo2": "cd ./children/demo2 && npm run build"
	 },
	```
# 六、项目运行、打包
1. git clone https://github.com/zhousihang/vite-qiankun-vue3.git 。
2. 进入到项目，执行 npm install 。
3. 运行：npm run serve 。
4. 打包：npm run build 。
5. 通过配置好 npm-run-all，直接在跟路径下执行操作就行了。

