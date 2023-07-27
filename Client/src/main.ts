import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player';
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css'

const app = createApp(App);

app.use(router);
app.use(Vue3VideoPlayer, {
  lang: 'en-US'
});
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
