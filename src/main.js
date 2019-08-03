import Vue from 'vue'
import App from './App.vue'

import Title from './components/title'

Vue.component('section-title', Title)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
