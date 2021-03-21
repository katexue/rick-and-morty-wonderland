// Dependencies
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Instantiate application
const app = createApp(App)

app.use(router).use(store).use(VueAxios, axios).mount('#app')
