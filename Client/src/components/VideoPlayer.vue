<template>
  <vue3-video-player
    autoplay
    :src="source"
    :title="title"
    @ended="playEnded"
    :cover="cover"
  >
  </vue3-video-player>
</template>

<script>
import PictureInPicture from '@/components/PictureInPicture.vue';
export default {
  name: 'App',
  components: {
    PictureInPicture,
  },
  data() {
    return {
      players: {},
      volume: 60,
      source:"",
      title:"",
      cover:""
    };
  },
  methods: {
    viewCore(id, player) {
      console.log(id, player);
      this.players[id] = player;
    },
    play(id) {
      console.log('custom play: id =', id);
      this.players && this.players[id] && this.players[id].play();
    },
    destroy(id) {
      this.players && this.players[id] && this.players[id].destroy();
    },
    playEnded(e) {
      console.log(e);
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
      console.log(this.players[id].$video);
      this.players &&
        this.players[id] &&
        this.players[id].requestPictureInPicture();
    },
  },
};
</script>

<style scoped>
*{
  max-width: 1080px;
  max-height: 720px;
  margin: 0;
}
</style>