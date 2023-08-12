<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { reactive } from "vue";
import VideoPlayer from "../components/VideoPlayer.vue";
import VideoCardHorizontal from '../components/VideoCardHorizontal.vue';

export default {
  components : {
    VideoPlayer,
    VideoCardHorizontal
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

    // get Current Video
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

    // get Recommended Videos
    var recommendedVideos = reactive({});
    await store.dispatch("video/getRecommendedVideos", {
      currentVideo:video.props
    })
    .then(
      response=>{
        recommendedVideos = JSON.parse(JSON.stringify(response.data)) ;
        console.log(recommendedVideos);
      }
    )
    .catch(
      error=>{
        toast(error.message, {type:"error"});
        recommendedVideos = {};
      }
    );

    return { video, recommendedVideos };
  },
  methods:{
    calcDate: (d)=>{
      const now = Date.now();
      const videoDate = new Date(d);
      var diff = Math.abs(now - videoDate);
      var years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      var months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      var days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if(years) return `${years} ${(years===1)?('year'):('years')} ago`;
      if(months) return `${months} ${(months===1)?('month'):('months')} ago`;
      if(days) return `${days} ${(days===1)?('day'):('days')} ago`;
      if(hours) return `${hours} ${(hours===1)?('hour'):('hours')} ago`;
    },
  }
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
        <div class="author-wrapper">
          <div class="author-avatar-wrapper">
            <img class="author-avatar" src="http://localhost:3001/account.png">
          </div>
          <div class="author-name">
            Nguyen An Vi
          </div>
        </div>
        <div class="description-wrapper">
          <div class="video-stats">
            <div>{{ this.video.props.views }} views</div> 
            <div>{{ this.calcDate(this.video.props.uploaded_at) }}</div>
            <div>
              <span class="hashtags" v-for="i in 4" :key="i">{{ (Math.random() + 1).toString(36).substring(7) }}</span>
            </div>
          </div>
          <div class="description-content" v-html="this.video.props.description"></div>
        </div>
      </div>
      <!-- comments here -->
    </div>
    <div class="recommend-column">
      <VideoCardHorizontal
        v-for="video in recommendedVideos.default"
        :data-video-id="video._id"
        :videoId="video._id" 
        authorAvtSrc="http://localhost:3001/account.png" 
        :videoThumbnailSrc="video.thumbnail"
        :title="video.title"
        :views="video.views"
        :uploaded="calcDate(video.uploaded_at)"
        @click.prevent="goToVideo($event)"
      />
    </div>
  </div>
</template>


<style scoped>
.content-wrapper{
  display: flex;
  gap: 16px;
  padding-left: 16px;
  height: 100%;
}

.video-column{
  display: flex;
  width: 100%;
  flex-grow: 3;
  flex-direction: column;
  & .video-wrapper{
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 6px 10px var(--color-text-4);
  }
  & .video-descriptions, & .video-descriptions *{
    color: #fff;
    text-shadow: 0 2px 5px var(--color-background-5);

    & .author-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      & .author-avatar{
        width: 30px;
        padding: 4px;
      }
      & .author-name{
        font-size: small;
      }
    }
    & .description-wrapper {
      border-radius: 8px;
      background-color: #ffffff55;
      padding:12px;
      font-size: small;
      & .video-stats{
        margin-bottom:8px;
        display: flex;
        gap: 8px;
      }
    }
  }
}
.recommend-column{
  display: flex;
  flex-direction: column;
  flex-basis: 316px;
  gap: 8px;
  width: 316px;
  &>*{
    max-width: 316px;
  }
}
.hashtags{
  color: lightgray !important;
  cursor: pointer;
  &:before{ content:"#"; }
  &:after{ content: " "; }
  &:last-child:after{ content: ""; }
}
</style>