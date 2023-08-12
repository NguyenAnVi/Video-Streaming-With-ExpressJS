<script>
import VideoWrapper from '../components/VideoWrapper.vue';
import VideoCard from '../components/VideoCard.vue';
import {useStore} from 'vuex';
import { reactive, toRefs, watchEffect } from 'vue';
const { min, max } = Math;
import { useToast } from 'vue-toastification';

export default {
  setup(){
    const toast = useToast();
    const store = useStore();
    const state = reactive({
      scroller: null,
      scrollLeft: 0,
    });

    const onWheel = (e) => {
      state.scrollLeft = state.scroller
        ? min(
            state.scroller.scrollWidth - state.scroller.offsetWidth,
            max(0, e.deltaY + state.scrollLeft)
          )
        : state.scrollLeft;
    };
    const video = reactive({
      videos :[]
    });

    watchEffect( async function (){
      await store.dispatch("video/getVideosForHomePage")
      .then(
        response=>{
          video.videos = response.videos;
        }
      )
      .catch(
        error=>{
          toast(error.message, {type:"error"});
          video.videos = null;
        }
      );
    });
    
    return { video, ...toRefs(state), onWheel };
  },
  components:{
    VideoCard,
    VideoWrapper,
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
    goToVideo(event) {
      const id = event.target.getAttribute('data-video-id');
      this.$router.push(`/watch${(id)?('?v='+id):''}`);
    }
  },
  data(){
    return {
    }
  },
  mounted(){
  }
}
</script>

<template>
  <main>
    <h2>This is homepage</h2>
    <div class="tags-wrapper" ref="scroller" :scroll-left.camel="scrollLeft" @wheel.prevent="onWheel">
        <div v-for="i in 100" class="tag-pill"><a href="#">Tag pill {{ i }}</a></div>
    </div>
    <VideoWrapper>
      <VideoCard
        v-for="video in video.videos"
        :data-video-id="video._id"
        :videoId="video._id" 
        authorAvtSrc="http://localhost:3001/account.png" 
        :videoThumbnailSrc="video.thumbnail"
        :title="video.title"
        :views="video.views"
        :uploaded="calcDate(video.uploaded_at)"
        @click.prevent="goToVideo($event)"
      />
    </VideoWrapper>
  </main>
</template>

<style scoped>
main{
  padding-inline: 16px;
}
.tags-wrapper{
  height: 50px;
  padding: 8px;
  margin: 4px;
  display: flex;
  overflow-X: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 0;
  }
  
  &>*{
    min-width: fit-content;
    align-items: center;
    justify-content: center;
    margin: 6px;
    padding-inline: 12px;
    padding-block: 6px;
    background-color: var(--color-background-1);
    border-radius: 25px;
  }
}
</style>
