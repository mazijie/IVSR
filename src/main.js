import { createApp } from 'vue'
import App from './App.vue'
import Router from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import naive from 'naive-ui'

const app = createApp(App);
app.use(Router);
app.use(ElementPlus);
app.use(naive);
app.mount('#app');
