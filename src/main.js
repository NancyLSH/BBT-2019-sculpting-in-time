import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from 'vue-router'
import 'swiper/dist/css/swiper.css'
import index from "./pages/index.vue"
import result from "./pages/result.vue"

//路由
const routes = [{
    path: '/index',
    name:"index",
    component: index
  },
  {
    path: '/result',
    name:"result",
    component: result
  }
]
const router = new VueRouter({
  routes
})
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')