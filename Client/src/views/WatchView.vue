<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { reactive, watchEffect, ref } from "vue";
import VideoPlayer from "../components/VideoPlayer.vue";

const toast = useToast();
const allowRender = ref(false);


export default {
  components : {
    VideoPlayer
  },
  data(){
    return {
      videoProps: this.video
    }
  },
  async setup(){
    const toast = useToast();
    const route = useRoute();
    const store = useStore();
    var video = reactive({
      id:"",
      props:{}
    });
    video.id = route.query.v;
    await store.dispatch("video/getVideoProperties", {
      id:video.id
    })
    .then(
      response=>{
        video.props = response.data.video;
      }
    )
    .catch(
      error=>{
        toast(error.message, {type:"error"});
        video.props = {};
      }
    );
    return { video };
  },
}
</script>
<template>
  <div class="content-wrapper">
    <div class="video-column">
      <div class="video-wrapper">
          <!-- <VideoPlayer ref="videoplayer" :key="this.allowRender" v-if="allowRender" videoId="videoId" :src.sync="this.getVideoSource" :title.sync="this.getVideoTitle" :cover.sync="this.getVideoCover"/> -->
          <VideoPlayer :properties="this.video.props"/>
      </div>

      <!-- descriptions here -->
      <div class="video-descriptions">
        <h2>{{ this.video.props.title }}</h2>
      </div>
      <!-- comments here -->
    </div>
    <div class="recommend-column">
      <div>Recommended Videos</div>
    </div>
  </div>
</template>


<style scoped>
.content-wrapper{
  display: flex;
  min-height: 100%;
}
.video-column{
  display: flex;
  width: 480px;
  flex-grow: 3;
  flex-direction: column;
  margin-inline: 16px;
  & .video-wrapper{
    margin-block: 16px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 6px 10px var(--color-text-4);
  }
}
.recommend-column{
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  background-color: aqua;
}
</style>