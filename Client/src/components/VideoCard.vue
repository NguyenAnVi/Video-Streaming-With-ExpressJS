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
  width: calc((100% / 6) - 14px);
  
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: transparent;

  transition-property: transform;
  transition-duration: .2s;
  transition-timing-function: ease-out;

  cursor: pointer;

  box-sizing: border-box;
  
  &:hover, &:focus {
    transform: scale(1.03);
  }
  & .video-thumbnail-wrapper{
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
  & .video-info{
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    & > *:first-child{
      & .author-avatar{
        width: 40px;
        height: 40px;
        aspect-ratio: 1/1;
        padding: 8px 8px 8px 0;
        border-radius: 50%;
        box-sizing: content-box;
      }
    }
    & .video-properties{
      width: calc(100% - 40px);
      padding-block: 8px;
      display: flex;
      flex-direction: column;

      & .video-title{
        display: -webkit-box;
        font-weight: bolder;
        text-justify: distribute;
        line-height: 1.25em;
        overflow: hidden;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        height: 2.5em;
      }
      & .author-name{
        color: var(--color-text-3);
      }
      & .video-stats{
        color: var(--color-text-3);
        display: flex;
        gap: 8px;
        justify-content: space-between;
        flex-wrap: wrap;
      }
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