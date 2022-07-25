import { createApp } from 'vue'
import { router } from "./router";
import { Request } from './api/Request';

import './style.css'
import Antd from 'ant-design-vue';

import App from './App.vue'
import 'ant-design-vue/dist/antd.css';

Request.init()
createApp(App)
    .use(Antd)
    .use(router)
    .mount('#app')
