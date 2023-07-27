import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player';
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css'

const myLang = {
  dashboard: {
    btn: {
      play: 'Play',
      pause: 'Pause',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit fullscreen mode',
      mute: 'Mute',
      unmute: 'Unmute',
      back: 'Back',
      pip: 'pip',
    },
    settings: {
      autoplay: 'Autoplay',
      loop: 'Loop',
      speed: 'Speed',
      resolution: 'Resolution',
    },
  },
  layers: {
    error: {
      title: 'Error!',
      2404: 'Video Source Undefined',
      2502: 'Media Network Error',
      2503: 'Video Cannot DECODE',
      2504: 'Video Cannot Play!',
      601: 'Live video Cannot Play!',
    },
    loading: {
      msg: 'Loading ...',
    },
  },
};

const app = createApp(App)


app
  .use(router)
  .use(Vue3VideoPlayer, {
    lang: myLang
  })
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
