<script>
import Cropper from "cropperjs";

export default {
  name: "ImageCropper",
  props:{
    src:String
  },
  data() {
    return {
      cropper: {},
      destination: {},
      destinationV: {},
      image: {}
    }
  },
  methods:{
    initCropper(){
      this.cropper = new Cropper(this.$refs.image, {
        viewMode:3,
        aspectRatio: 1,
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
      this.$emit('change', newVal);
    }
  },
  mounted() {
    this.$refs.image.src = "";
    this.initCropper();
  }
}
</script>

<template>
    <div class="cropper-wrapper">
        <div class="img-container">
            <img ref="image" :src="src" crossorigin>
        </div>
        <img ref="imageDestination" :src="destination" class="img-preview">
    </div>
</template>

<style scoped>
@import url("http://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.1/cropper.min.css");
@import url("http://localhost:3001/cropper.min.css");
.cropper-wrapper{
  display: flex;
}
.img-container {
  width: 200px;
  height: 200px;
  float: left;
}
.img-preview {
  width: 200px;
  height: 200px;
  float: right;
}
</style>