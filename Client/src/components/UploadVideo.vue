<script>
import { defineComponent, ref } from "vue";
import InputTypeFile from "./InputTypeFile.vue";

export default defineComponent({
    name: "FileUpload",
    components: { 
      InputTypeFile
    },
    data(){
      return {
        file:{
          value:ref(null)
        }
      }
    },
    methods:{
      clearedHandler() {
        this.$emit('cleared');
      },
      onFileChanged($event) {
        const target = $event.target;
        if (target && target.files) {
          this.file.value = target.files[0];
          this.$emit('selected', this.file.value);
        }
      }
    }
});
</script>

<template>
  <InputTypeFile
    @change="onFileChanged($event)"
    @cleared="clearedHandler"
    iaccept="video/*"
    icapture
  />
</template>
