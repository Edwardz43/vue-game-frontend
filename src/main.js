import { createApp } from 'vue';
import store from './store';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';

let app = createApp(App).use(router).use(store);
app.mount('#app');

