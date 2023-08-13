<script>
export default {
  name:"VideoWrapper",
}
</script>

<template>
  <div class="video-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.video-wrapper{
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  row-gap: 16px;
}
</style>
