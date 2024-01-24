import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/stores';

const app = createApp(App);

app.use(store).use(router).mount('#app');
