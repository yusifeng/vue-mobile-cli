import Vue from 'vue'
import 'css/reset.styl'
import App from './App.vue'
import router from './router'






//移动端300毫秒延迟


Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    render: (h) => h(App)
})