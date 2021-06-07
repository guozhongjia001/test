import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    ...App
})

// 请求配置 请求拦截 响应拦截
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor,app)

// http接口api集中管理
import httpApi from '@/common/http.api.js'
Vue.use(httpApi,app)

app.$mount()
