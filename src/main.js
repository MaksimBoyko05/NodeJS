import Vue from 'vue';
import App from './App.vue';
import ServicesPlugin from './plugins/services'; 

Vue.config.productionTip = false;

Vue.use(ServicesPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app');