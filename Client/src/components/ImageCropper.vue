<script>
import Cropper from "cropperjs";

export default {
  name: "ImageCropper",
  props:{
    src:String,
    aspectRatio:Number,
    hidden:Boolean,
    cooldown:Number
  },
  data() {
    return {
      cropper: {},
      destination: {},
      destinationV: {},
      image: {},
      cooldownCropping: this.$props.cooldown || 2000
    }
  },
  methods:{
    initCropper(){
      this.cropper = new Cropper(this.$refs.image, {
        viewMode:1,
        aspectRatio: this.$props.aspectRatio,
        crop: () => {
          this.destination = this.cropper.getCroppedCanvas().toDataURL("image/png");
        }
      });
    }
  },
  watch: { 
    src: function(newVal, oldVal) { // watch it
      this.$refs.image.src = newVal;
      this.cropper.replace(this.$refs.image.src);
    },
    destination: function(newVal){
      var id = window.setTimeout(function() {}, 0);

      while (id--) {
          window.clearTimeout(id); // will do nothing if no timeout with id is present
      }
      
      var to = setTimeout(() => {
        this.$emit('change', newVal);
      }, this.cooldownCropping);
    }
  },
  mounted() {
    this.$refs.image.src = "";
    this.initCropper();
    this.$refs.imageDestination.style.aspectRatio = this.$props.aspectRatio;
  }
}
</script>

<template>
    <div class="cropper-wrapper">
        <div class="img-container">
            <img ref="image" :src="src" crossorigin>
        </div>
        <img :hidden="hidden" ref="imageDestination" :src="destination" class="img-preview">
    </div>
</template>

<style scoped>
@import url("http://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.1/cropper.min.css");
@import url("http://localhost:3001/cropper.min.css");
.cropper-wrapper{
  display: block;
  border-radius: 4px;
  overflow: hidden;
}
.img-container {
  width: 100%;
  height: 300px;
}
.img-preview {
  width: 100%;
  object-fit: contain;
}
</style>