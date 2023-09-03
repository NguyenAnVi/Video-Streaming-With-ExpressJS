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
        async response=>{
          video.videos = response.videos;
          video.videos.forEach( async (value)=>{

            await store.dispatch('account/getAccountInfo', {
              id:value.owner
            })
            .then(
              response=>{
                value.ownerInfo = response.data.user;
              }
            )
            .catch(
              error=>{
                value.ownerInfo ={
                  fullName:"Unknown User"
                };
              }
            );
          })
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
  async created(){
    const toast = useToast();
    if( this.$store.getters['notification/hasNotification']){
      toast(this.$store.state.notification.message, {type:this.$store.state.notification.type});
    }
  }
}
</script>

<template>
  <main>
    <div class="tags-wrapper" ref="scroller" :scroll-left.camel="scrollLeft" @wheel.prevent="onWheel">
        <div v-for="i in 100" class="tag-pill"><a href="#">Tag pill {{ i }}</a></div>
    </div>
    <VideoWrapper>
      <VideoCard
        v-for="vid in video.videos"
        :data-video-id="vid._id"
        :videoId="vid._id" 
        :authorAvtSrc="vid.ownerInfo?.avatar"
        :videoThumbnailSrc="vid.thumbnail"
        :title="vid.title"
        :views="vid.views"
        :uploaded="calcDate(vid.createdAt)"
        :authorName="vid.ownerInfo?.fullName"
        @click.prevent="goToVideo($event)"
      />
    </VideoWrapper>
  </main>
</template>

<style scoped>
main{
  padding: 8px 16px;
  gap: 8px;
  display: flex;
  flex-direction: column;
}
.tags-wrapper{
  height: 36px;
  display: flex;
  gap: 12px;
  overflow-X: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 0;
  }
  
  &>*{
    display: flex;
    min-width: fit-content;
    align-items: center;
    justify-content: center;
    padding-inline: 16px;
    padding-block: 4px;
    background-color: var(--color-background-1);
    border-radius: 25px;
  }
}

</style>
