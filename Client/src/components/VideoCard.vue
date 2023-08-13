<script>
export default {
  props:{
      videoId:String,
      videoThumbnailSrc:String,
      authorAvtSrc:String,
      title: String,
      authorName: String,
      views: Number,
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
          <div class="author-name" :data-video-id=videoId>{{'Author Name'}}</div>
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
  width: calc((100% / 6) - 14px);
  
  display: flex;
  flex-direction: column;
  background-color: transparent;

  transition-property: transform;
  transition-duration: .2s;
  transition-timing-function: ease-out;

  cursor: pointer;

  box-sizing: border-box;
  
  &:hover, &:focus {
    transform: scale(1.03);
  }
  
}
.video-thumbnail-wrapper{
  overflow: hidden;
  display: flex;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px var(--color-background-5);
  &>.video-thumbnail{
    aspect-ratio: 16/9;
    width: 100%;
    object-fit: cover;
  }
}
.video-info{
  display: flex;
  width: 100%;
  & > *:first-child{
    flex-basis: 30px;
    & .author-avatar{
      width: 35px;
      padding: 8px;
    }
  }
  & .video-properties{
    width: 100%;
    padding-block: 8px;
    display: flex;
    flex-direction: column;

    & .video-title{
      font-weight: bolder;
      width: 100%;
    }
    & .author-name{
      color: var(--color-text-3);
    }
    & .video-stats{
      color: var(--color-text-3);
      display: flex;
      flex-wrap: wrap;
    }
  }
}
@media only screen and (max-width:1800px){
  .video-card{
    width: calc((100% / 4) - 12px);
  }
}
@media only screen and (max-width:1024px){
  .video-card{
    width: calc((100% / 3) - 11px);
  }
}
</style>