<script>
import ImageCropper from './ImageCropper.vue';
import InputTypeFile from './InputTypeFile.vue';

export default {
  components:{
    ImageCropper,
    InputTypeFile
  },
  props:{
    cooldown:{
      type:Number
    },
    src:{
      type:String,
    },
    aspectRatio:{
      type:Number
    },
    hidden:{
      type:Boolean
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
    croppingChangedHandler(value){
      this.$emit('croppingChanged', value);
    },
    clearedHandler() {
      this.$emit('cleared');
    }
  },
  watch:{
    src: function (){
      this.url = this.src;
    }
  }
}
</script>

<template>
  <div id="upload-wrapper">
    <InputTypeFile
      @change="onFileChange"
      @cleared="clearedHandler"
      iaccept=".jpg, .png"
      icapture
    />
    <ImageCropper 
      @change="croppingChangedHandler" 
      v-show="url" ref="cropper" 
      :aspectRatio="aspectRatio"
      :cooldown="cooldown"
      :src="url"
      :hidden="hidden"
    ></ImageCropper>
  </div>
</template>

<style scoped>
body {
  background-color: #e2e2e2;
}

#upload-wrapper {
  width: inherit;
  & > *{
    display: block;
  }
}
</style>