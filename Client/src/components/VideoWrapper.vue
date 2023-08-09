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
  padding: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  row-gap: 12px;
}
</style>
