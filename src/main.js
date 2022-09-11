import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(less)
Vue.use(VueLazyload,{
  loading: require("@/assets/imgs/loading.gif"),
	error: require("@/assets/imgs/error.png"),
	attempt: 6,
	// observer: true,
})

//全局使用自定义的loacaStorage的方法
import { setItem, getItem, removeItem } from "@/utils/utils.js";
Vue.prototype.setItem = setItem;
Vue.prototype.getItem = getItem;
Vue.prototype.removeItem = removeItem;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
