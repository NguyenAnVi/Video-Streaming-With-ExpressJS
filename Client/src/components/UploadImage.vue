<script>
import ImageCropper from './ImageCropper.vue';

export default {
  components:{
    ImageCropper
  },
  props:{
    src:{
      type:String
    }
  },
  data() {
    return {
      url: null,
      cropper: {},
      destination: {},
      image: {}
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    onSrcChange(value){
      this.$emit('onSrcChange', value);      
    }
  },
}
</script>

<template>
  <div id="upload-wrapper">
    <input name="originalimage" type="file" @change="onFileChange" />
    <ImageCropper @change="onSrcChange" v-show="url" ref="cropper" :src="url"></ImageCropper>
  </div>
</template>

<style scoped>
body {
  background-color: #e2e2e2;
}

#upload-wrapper {
  width: inherit;
  padding: 20px;
  width: inherit;
  & > *{
  display: block;

  }
}
</style>