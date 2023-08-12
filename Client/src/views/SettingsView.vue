<script>
import {useStore} from 'vuex';
import { useToast } from 'vue-toastification';
import { reactive, toRefs, watchEffect } from 'vue';
import Switcher from '../components/Switcher.vue';
import Select from '../components/Select.vue';

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
    Switcher,
    Select
  },
  methods:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data(){
    return {
      selectOptions:{
        optionName:"Language",
        optionId:"Language",
        optionName:"language",
        options:
        [
          {
            value:"vietnamese",
            label:"Tiếng Việt"
          },
          {
            value:"english",
            label:"English"
          },
          {
            value:"teyvat",
            label:"Teyvat",
            selected:true
          },
          {
            value:"0",
            label:"Choose one...",
          }
        ]
      }
    }
  },
  mounted(){
  }
}
</script>

<template>
  <main>
    <h1>Settings</h1>
    <div class="settings-wrapper">
      <div class="settings-section">
        <h2>Site preferences</h2>
        <div class="settings">
          <div class="setting-cell switcher">
            <label for="theme">Dark mode (Coming soon)</label>
            <Switcher></Switcher>
          </div>
        </div>
      </div>
      <div class="settings-section">
        <h2>Localization</h2>
        <div class="settings">
          <div class="setting-cell ">
            <label for="language">Display language (Coming soon)</label>
            <Select disabled :selectOptions="selectOptions" selectName="select" selectId="select"></Select>
          </div>
          <div class="setting-cell ">
            <label for="language">Display language (Coming soon)</label>
            <input type="text"/>
          </div>
        </div>
      </div>
      <div class="settings-section" v-if="!currentUser">
        <h2>Account</h2>
        <div class="settings">
          <div class="setting-cell">
            <RouterLink to="/signin">Signin</RouterLink>
          </div>
          <div class="setting-cell">
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
          </div>
          <div class="setting-cell">
            <input type="submit" >
          </div>
        </div>
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
  padding-inline: 20%;
  & > h1:first-child{
    margin-inline: 16px;
    margin-top: 50px;
    margin-bottom: 16px;
  }
}
.settings-wrapper{
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.settings-section{
  background-color: rgba(0, 0, 0, 0.253);
  padding: 16px;
  border-radius: 8px;

  &>h2{
    font-weight: 100;
  }

  &>.settings{
    display: flex;
    flex-direction: column;
    padding: 16px;
    margin-left: 16px;
    border-radius: 8px;
    transition: background-color .3s ease-out;
    & .setting-cell{
      display: flex;
      
      width: 100%;
      justify-content: space-between;
      align-items: center;
      & *{
        flex-basis: auto;
      }
      & label:first-child{
        flex-basis:60%;
      }
      &:has(input) > label:first-child{
        flex-basis:30%;
      }
      & input{
        width: 100%;
        padding: 10px 20px;
        border: 2px solid #ffffff92;
        border-radius: 0px;
        background-color: transparent;
        transition-property: border, border-radius;
        transition-duration: .3s;
        transition-timing-function: ease-out;
        &:hover, &:focus{
          outline: none;
          border-radius: 8px;
          border: 2px solid #fff;
        }
      }
    }
    &:hover{
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
