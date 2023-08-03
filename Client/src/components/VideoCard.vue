<template>
    <div class="video-card" @click=goToVideo :data-video-id=videoId>
      <div class="video-thumbnail-wrapper">
        <img class="video-thumbnail" :src=videoThumbnailSrc alt="">
      </div>
      <div class="video-info">
        <div>
          <img class="author-avatar" :src=authorAvtSrc alt="">
        </div>
        <div class="video-properties">
          <div class="video-title">{{title}}</div>
          <div class="author-name">{{authorName}}</div>
          <div class="video-stats">
            <div class="views">{{ views }} views</div>
            <div class="uploaded">{{ uploaded }}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:{
      videoId:String,
      videoThumbnailSrc:String,
      authorAvtSrc:String,
      title: String,
      authorName: String,
      views: String,
      uploaded: String
  },
  methods:{
    goToVideo (){
      this.$router.push('/watch/'+this.videoId)
    }
  }
}
</script>

<style scoped>
.video-card{
  width: calc((100% / 3) - 24px);
  padding: 8px;
  border-radius: 8px;
  
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-1);

  box-shadow: 0 0 0px var(--color-background-5);
  
  &:hover, &:focus {
    box-shadow: 0 2px 5px var(--color-background-5);
  }
  transition: box-shadow .2s ease-in-out;
  @media (max-width:512px) {
    width: 100%;
  }
}
.video-thumbnail{
  width: 100%;
}
.video-info{
  display: flex;
  & .author-avatar{
    width: 30px;
    padding: 8px;
  }
  & .video-properties{
    padding-block: 8px;
    display: flex;
    flex-direction: column;
    & .video-stats{
      color: var(--color-text-4);
      display: flex;
      justify-content: space-between;
    }
  }
}

</style>