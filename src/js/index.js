// Dependencies
import 'regenerator-runtime/runtime.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store.js'

// Create messaging bus
// window.bus = createApp( {} )

// Instantiate application
createApp(App)
  .use(router)
  .use(store)
  .use(VueAxios, axios)
  .mount('#app')
