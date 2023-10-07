import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"; // Toast's Style
import ToastOptions from './config/ToastOptions';
// import VideoPlayerOptions from './config/VideoPlayerOptions.js';  // for VideoPlayer's custom languages
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player';
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css';
import icon from './providers/icon';

icon.init();

const app = createApp(App)

app
  .use(router)
  .use(store)
  .use(Vue3VideoPlayer, {
    //lang: VideoPlayerOptions
  })
  .use(Toast, ToastOptions)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
