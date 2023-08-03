<script>
import VideoWrapper from '../components/VideoWrapper.vue';
import VideoCard from '../components/VideoCard.vue';

export default {
  components:{
    VideoCard,
    VideoWrapper
  },
  methods:{
    calcDate: ()=>{
      return "3h ago";
    }
  }
}
</script>

<template>
  <main>
    <h2>This is homepage</h2>
    <div class="tags-wrapper">
      <div class="tag-pill">Tag pill</div>
      <div class="tag-pill">Tag pill</div>
      <div class="tag-pill">Tag pill</div>
      <div class="tag-pill">Tag pill</div>
      <div class="tag-pill">Tag pill</div>
    </div>
    <VideoWrapper>
      <VideoCard
        videoId="64cb74adfe821d676a668313" 
        authorAvtSrc="http://localhost:3001/account.png" 
        videoThumbnailSrc="http://localhost:3001/example.jpg"
        title="This is title"
        views="3000"
        :uploaded=calcDate()
      />
      <VideoCard
        videoId="64cb74adfe821d676a668313" 
        authorAvtSrc="http://localhost:3001/account.png" 
        videoThumbnailSrc="http://localhost:3001/example.jpg"
        title="This is title"
        views="3000"
        :uploaded=calcDate()
      />
      <VideoCard
        videoId="64cb74adfe821d676a668313" 
        authorAvtSrc="http://localhost:3001/account.png" 
        videoThumbnailSrc="http://localhost:3001/example.jpg"
        title="This is title"
        views="3000"
        :uploaded=calcDate()
      />
      <VideoCard
        videoId="64cb74adfe821d676a668313" 
        authorAvtSrc="http://localhost:3001/account.png" 
        videoThumbnailSrc="http://localhost:3001/example.jpg"
        title="This is title"
        views="3000"
        :uploaded=calcDate()
      />
      <VideoCard
        videoId="64cb74adfe821d676a668313" 
        authorAvtSrc="http://localhost:3001/account.png" 
        videoThumbnailSrc="http://localhost:3001/example.jpg"
        title="This is title"
        views="3000"
        :uploaded=calcDate()
      />
      <VideoCard
        videoId="64cb74adfe821d676a668313" 
        authorAvtSrc="http://localhost:3001/account.png" 
        videoThumbnailSrc="http://localhost:3001/example.jpg"
        title="This is title"
        views="3000"
        :uploaded=calcDate()
      />
      <VideoCard
        videoId="64cb74adfe821d676a668313" 
        authorAvtSrc="http://localhost:3001/account.png" 
        videoThumbnailSrc="http://localhost:3001/example.jpg"
        title="This is title"
        views="3000"
        :uploaded=calcDate()
      />

    </VideoWrapper>
  </main>
</template>

<style scoped>
main{
  padding-inline: 16px;
}
</style>
