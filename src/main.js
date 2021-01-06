import { createApp } from 'vue'
import App from './App.vue'
import IuVideo from './plugins/index.js'
import './assets/scss/normal.scss'

const app =createApp(App)
app.mount('#app')
app.use(IuVideo)