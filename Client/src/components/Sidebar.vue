<script>
import { ref } from 'vue';

export default {
  name:"Sidebar",
  data(){
    const routes = this.$router.options.routes;
    return{
      isExpanded:ref(false),
      routes
    }
  },  
  methods:{
    expand() {
      this.isExpanded = true;
    },
    collapse (){
      this.isExpanded = false;
    },
    toggle(){
      this.isExpanded = !this.isExpanded;
    }
  }
}
</script>
<template>
  <div class="sidebar" :isExpanded="isExpanded">
    <RouterLink v-for="route in routes" v-show="route.meta.showInSideBar" :to="route.path">
      <font-awesome-icon v-if="route.meta.sidebarIcon" :icon="route.meta.sidebarIcon"/>
      <div>{{ route.meta.title }}</div>
    </RouterLink>
  </div>
</template>
<style scoped>
.sidebar{
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-size: 16px;
  border-radius: 8px 0 0 8px;

  box-sizing: border-box;
  overflow: hidden;
  min-width: var(--sidebar-icon-width);
  width: var(--sidebar-icon-width);
  margin-right: 8px;
  background-color: #00000077;

  backdrop-filter: blur(10px);

  transition: all .5s ease-in-out;
}
.sidebar > a{
  border-radius: 8px 0 0 8px;
  background-color: #ffffff88;
  display: flex;

  width: var(--sidebar-width);
  height: var(--sidebar-icon-width);
  align-items: center;
  transition-property: background-color, height;
  transition-duration: .2s;
  transition-timing-function: ease-in-out;

  &:hover{
    z-index: 2;
  }
  &:focus{
    z-index: 1;
  }
  &:hover, &:focus, &.router-link-exact-active{
    height: calc(var(--sidebar-icon-width) + 16px);
    box-shadow: 0 0 5px var(--color-background-5);
    background-color: #fff;
  }
  & > div{
    display: inline-block;
  }
  & > svg{
    width: var(--sidebar-icon-width);
    align-items: center;
    box-sizing: border-box;
  }
}
.sidebar > a.router-link-exact-active {
  border-radius: 8px 0 0 8px;
  -webkit-border-radius: 8px 0 0 8px;
  -moz-border-radius: 8px 0 0 8px;
  -ms-border-radius: 8px 0 0 8px;
  -o-border-radius: 8px 0 0 8px;
  
  &:hover{
    cursor: default;
  }
}
.sidebar[isExpanded=true],
.sidebar:hover{
  min-width: var(--sidebar-width);
  width: var(--sidebar-width);
}
</style>