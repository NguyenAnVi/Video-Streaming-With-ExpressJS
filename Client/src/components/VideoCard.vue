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
  }
}
</script>

<template>
    <div class="video-card" :data-video-id=videoId>
      <div class="video-thumbnail-wrapper" :data-video-id=videoId>
        <img class="video-thumbnail" :src=videoThumbnailSrc alt="" :data-video-id=videoId>
      </div>
      <div class="video-info" :data-video-id=videoId>
        <div :data-video-id=videoId>
          <img class="author-avatar" :src=authorAvtSrc alt="" :data-video-id=videoId>
        </div>
        <div class="video-properties" :data-video-id=videoId>
          <div class="video-title" :data-video-id=videoId>{{title}}</div>
          <div class="author-name" :data-video-id=videoId>{{authorName}}</div>
          <div class="video-stats" :data-video-id=videoId>
            <div class="views" :data-video-id=videoId>{{ views }} views</div>
            <div class="uploaded" :data-video-id=videoId>{{ uploaded }}</div>
          </div>
        </div>
      </div>
    </div>
</template>

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
.video-thumbnail-wrapper{
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &>.video-thumbnail{
    aspect-ratio: 16/9;
    width: 100%;
    object-fit: cover;
  }
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