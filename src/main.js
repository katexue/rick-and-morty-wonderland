// Dependencies
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Create messaging bus
// window.bus = createApp( {} )

// Instantiate application
createApp(App).use(router).use(store).use(VueAxios, axios).mount('#app')
