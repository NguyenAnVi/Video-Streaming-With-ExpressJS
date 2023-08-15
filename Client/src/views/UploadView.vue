<script>
import {useStore} from 'vuex';
import { reactive, toRefs, watchEffect } from 'vue';
import { useToast } from 'vue-toastification';

export default {
  setup(){
    const toast = useToast();
    const store = useStore();
    const state = reactive({
      scroller: null,
      scrollLeft: 0,
    });

    const onWheel = (e) => {
      state.scrollLeft = state.scroller
        ? min(
            state.scroller.scrollWidth - state.scroller.offsetWidth,
            max(0, e.deltaY + state.scrollLeft)
          )
        : state.scrollLeft;
    };
    const video = reactive({
      videos :[]
    });

    watchEffect( async function (){
      await store.dispatch("video/getVideosForHomePage")
      .then(
        response=>{
          video.videos = response.videos;
        }
      )
      .catch(
        error=>{
          toast(error.message, {type:"error"});
          video.videos = null;
        }
      );
    });
    
    return { video, ...toRefs(state), onWheel };
  },
  components:{
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
}
</script>

<template>
  <main>
    <div class="wrapper">
      <h1>Upload Video</h1>
      <div class="section-wrapper" v-show="currentUser">
        Upload video will be here
      </div>
      <div class="section-wrapper" v-show="!currentUser">
        You need to signin to perform this action
      </div>
    </div>
  </main>
</template>

<style scoped>
*{
  color: #fff;
  background-color: transparent;
}
input{
  width: fit-content;
}
select{
  background-color: transparent;
  & > option{
    padding: 8px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: transparent;
  }
}
main{
  padding-inline: 10%;
  & > h1:first-child{
    margin-inline: 8px;
    margin-top: 50px;
    margin-bottom: 16px;
  }
}
.wrapper{
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
