<script>
import PictureInPicture from '@/components/PictureInPicture.vue';
import { toRaw } from 'vue';
export default {
  name: 'App',
  components: {
    PictureInPicture,
  },
  props:['properties'],
  data() {
    return {
      videoProps:this.$props.properties,
      players: {},
      volume: 60
    };
  },
  methods: {
    viewCore(id, player) {
      this.players[id] = player;
    },
    play(id) {
      this.players && this.players[id] && this.players[id].play();
    },
    destroy(id) {
      this.players && this.players[id] && this.players[id].destroy();
    },
    playEnded(e) {
      if (e.target === document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    },
    volumeUp(id) {
      this.volume += 5;
      if (this.volume > 100) {
        this.volume = 100;
      }
      this.players &&
        this.players[id] &&
        this.players[id].setVolume(this.volume / 100, true);
    },
    volumeDown(id) {
      this.volume -= 5;
      if (this.volume < 0) {
        this.volume = 0;
      }
      this.players &&
        this.players[id] &&
        this.players[id].setVolume(this.volume / 100, true);
    },
    pip(id) {
      // you can also use this.players[id].$video to do what u want just like playEnded
      this.players &&
        this.players[id] &&
        this.players[id].requestPictureInPicture();
    },
    video(){
      return JSON.parse(JSON.stringify(this.$data.videoProps))
    }
  },
};
</script>

<template>
  <div class="video-player-wrapper">
    <vue3-video-player
      autoplay
      :src="this.video().path"
      :title="this.video().title"
      @ended="playEnded"
      :cover="this.video().thumbnail"
    >
    </vue3-video-player>
  </div>
</template>



<style scoped>
video{
  width: 1080px;
  height: 720px;
  margin: 0;
}
</style>