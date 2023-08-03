<script>
import { computed, toRaw } from "vue";
import VideoPlayer from "../components/VideoPlayer.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  components : {
    VideoPlayer
  },
  data(){
    return {
      source:this.getVideoSource
    }
  },
  methods:{
    getId(){
      return this.$router.currentRoute._value.params.id;
    },
    getVideo() {
      const videoId = this.getId();
      // get video from server
      this.$store.dispatch("video/getVideoProperties", videoId).then(
        (response)=>{
          return (response.video);
        },
        (response)=>{
          toast(response.response.data.message || response.message, {type:"error"});
        }
      )
    }
  },
  computed:{
    getVideoSource(){
      const result = toRaw(this.$store.state.video.currentvideo);
      if (result)
      return result.path;
      else return null;
    },
    getVideoTitle(){
      const result = toRaw(this.$store.state.video.currentvideo);
      if (result)
      return result.title;
      else return null;
    },
    getVideoCover(){
      const result = toRaw(this.$store.state.video.currentvideo);
      if (result)
      return result.thumbnail;
      else return null;
    },
  },
  created(){
    this.getVideo();
  }
}
</script>

<template>
  {{ source }}
  <VideoPlayer  videoId="videoId" :src.sync="this.getVideoSource" :title.sync="this.getVideoTitle" :cover.sync="this.getVideoCover"/>
</template>
