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
        <div class="video-properties" :data-video-id=videoId>
          <p class="video-title" :data-video-id=videoId>{{title}}</p>
          <p class="author-name" :data-video-id=videoId>{{'Author Name'}}</p>
          <div class="video-stats" :data-video-id=videoId>
            <span class="views" :data-video-id=videoId>{{ views }} views</span>
            <span class="uploaded" :data-video-id=videoId>{{ uploaded }}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.video-card{
  padding: 0px;
  border-radius: 8px;

  max-height: 100px;
  
  display: flex;
  gap: 16px;
  background-color: var(--color-background-1);
  cursor: pointer;
}
.video-thumbnail-wrapper{
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  overflow: hidden;

  border-radius: 4px;
  box-shadow: 0 0 5px var(--color-background-4);
  &>.video-thumbnail{
    height: 100px;
    width: 300px;
    object-fit: cover;
  }
}
.video-info{
  display: flex;
  width: 100%;
  & .video-properties{
    width: 100%;
    padding-block: 8px;
    display: flex;
    flex-direction: column;

    & .video-title{
      font-weight: bolder;

      max-height: 2em;
      line-height: 1em;

      margin: 0;

      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }
    & .author-name{
      margin: 0;
      margin-top: 4pxq;
      font-size: small;
      color: var(--color-text-4);
    }
    & .video-stats{
      font-size: smaller;
      color: var(--color-text-4);
      display: flex;
      gap: 8px;
    }
  }
}

</style>