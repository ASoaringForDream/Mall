import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store/index.js"
import eventBus from 'vue3-eventbus'
import toast from "components/common/toast"
import  FastClick  from  'fastclick'
import lazyPlugin from 'vue3-lazy'
FastClick.attach(document.body);
const app=createApp(App)
app.config.productionTip=false
app.config.globalProperties.$toast = toast;
app.use(router).use(store).use(eventBus).use(lazyPlugin,{
  loading: require('./assets/img/common/loading.png'),
}).mount('#app')

