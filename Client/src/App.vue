<script>
import { Suspense } from "vue";
import { routes as routerRoutes } from "./router";
import { RouterLink, RouterView } from "vue-router";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faUser, faArrowRightFromBracket, faHouse, faCloudArrowUp, faGear } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faUser, faArrowRightFromBracket, faHouse, faCloudArrowUp, faGear);

export default {
  components:{
    navNavbar: "nav-navbar",
    navSidebar: "nav-sidebar",
    Suspense
  },
  data(){
    return{
      routerRoutes
    }
  },
  mounted: ()=>{
    const sidebar = document.getElementById("sidebar");
    const openSideBar = (sb) => {
      sb.classList.add("opened");
    };
    const closeSideBar = (sb) => {
      sb.classList.remove("opened");
    };
    const toggleSideBar = (sb) => {
      if(sb.classList.contains("opened"))
        closeSideBar(sb);
      else
        openSideBar(sb);
    };
    const logo = document.getElementById("sidebar-toggler");
    logo.addEventListener('click', ()=>{
      toggleSideBar(sidebar);
    });
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$store.state.auth.user = undefined;
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <div>
   <div id="appWrapper">
     <div id="header">
      <div>
        <font-awesome-icon id="sidebar-toggler" :icon="['fas', 'bars']" size="lg" />
        <img
            id="logo"
            alt="logo"
            class="logo"
            src="@/assets/logo.svg"
        />
        <span style="color:rgb(0, 141, 96); font-size: larger; font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;">YOULUBE</span>
      </div>
      <div>
        <input type="text" name="search" id="search" placeholder="Search ...">
      </div>
      <nav-navbar>
        <RouterLink v-if="!currentUser" to="/signin">Signin</RouterLink>
        <RouterLink v-if="!currentUser" to="/signup">Signup</RouterLink>
        <a v-if="currentUser" class="nav-link" @click.prevent="logOut">
          <font-awesome-icon icon="arrow-right-from-bracket" /> 
          LogOut ({{ currentUser.fullName }})
        </a>
      </nav-navbar>
    </div>
    <div id="body">
      <div id="sidebar" class="" ref="sidebar">
        <nav-sidebar>
          <RouterLink v-for="route in routerRoutes" v-show="route.showInSideBar" :to="route.path">
            <font-awesome-icon v-if="route.icon" :icon="route.icon"/>
            <div>{{ route.name }}</div>
          </RouterLink>
        </nav-sidebar>
      </div>
      <div id="content">
        <Suspense>
          <RouterView />
        </Suspense>
      </div>
     </div>
     <div id="footer">
        <div>
          <RouterLink to="/about">About</RouterLink>
        </div>
        <div>
          Policy
        </div>
        <div>
          @nguyenanvi122333
        </div>
     </div>
   </div>
 </div>
</template>

<style>
@import url(./assets/colortheme.css);
:root{
  --icon-width:30px;
  --header-height:45px;
  --footer-height:50px;
  --sidebar-icon-width: 48px;
  --sidebar-width: 200px;
}
#appWrapper {
  margin: 8px;
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background-image: url(@public/background.jpg);
  border-radius: 8px;
}
#header, #body, #footer{
  box-sizing: border-box;
  /* box-shadow: inset 0 0 3px var(--color-background-5); */
  border-radius: 8px;
}
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px;
  height: var(--header-height);
  line-height: 1.5;

  background-color: var(--color-background-1);
}
#header > *{
  display: flex;
  align-items: center;
  flex: 1 0 0px ;
  gap: 8px;
  justify-content: center;
  &:first-child{
    justify-content: start;
  }
  &:last-child{
    justify-content: end;
  }
}
#body {
  display: flex;
  justify-items: stretch;
  overflow: hidden;

  background-color: transparent;
  min-height: calc(100vh - var(--header-height) - var(--footer-height) - 48px);
}
#sidebar{
  box-sizing: border-box;
  overflow: hidden;
  min-width: var(--sidebar-icon-width);
  width: var(--sidebar-icon-width);
  margin-right: 8px;
  background-color: #00000077;

  backdrop-filter: blur(10px);

  transition-property: width, min-width;
  transition-duration: .5s;
  transition-timing-function: ease-in-out;
}
#sidebar.opened, #sidebar:hover{
  min-width: var(--sidebar-width);
  width: var(--sidebar-width);
}
#content{
  background-color: #00000077;
  backdrop-filter: blur(10px);
  width: calc(100% - var(--sidebar-icon-width));
}
#footer {
  height: var(--footer-height);
  border-top: 1px solid var(--color-border);
  padding: 8px;
  padding-top: 16px;
  background-color: var(--color-background-1);
  display: flex;
  grid-column: 3;
  align-items: end;
}
#search{
  width: 100%;
  padding: 8px 24px;
  background-color: transparent;
  transition: (transform, padding) .5s ease-in-out;
  font-size: 12px;
  line-height: 8px;
  color: #575756;
  background-color: transparent;
  background-image:url(./assets/search.svg);
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid #575756;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  -webkit-transition: (transform, padding) .5s ease-in-out;
  -moz-transition: (transform, padding) .5s ease-in-out;
  -ms-transition: (transform, padding) .5s ease-in-out;
  -o-transition: (transform, padding) .5s ease-in-out;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  -ms-border-radius: 50px;
  -o-border-radius: 50px;
}
#search::placeholder{
  color: rgba(87, 87, 86, 0.8);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
#search:hover, #search:focus{
  padding: 12px 12px;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #575756;
  border-radius: 0;
  background-position: 100% center;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
}
nav-navbar > *{
  padding: 3px 16px;
  background-color: var(--color-background-2);
  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
  border: 1px solid var(--color-text-1);
}

.logo {
  width: var(--icon-width);
  height: var(--icon-width);
  margin: 0;
  max-height: calc(var(--header-height) - 8px);
}

nav-sidebar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: var(--sidebar-width);
  font-size: 16px;
  border-radius: 8px 0 0 8px;
  -webkit-border-radius: 8px 0 0 8px;
  -moz-border-radius: 8px 0 0 8px;
  -ms-border-radius: 8px 0 0 8px;
  -o-border-radius: 8px 0 0 8px;
}
nav-sidebar > a {
  border-radius: 8px 0 0 8px;
  background-color: #ffffff88;
  display: flexbox;
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
}
nav-sidebar > a.router-link-exact-active {
  border-radius: 8px 0 0 8px;
  -webkit-border-radius: 8px 0 0 8px;
  -moz-border-radius: 8px 0 0 8px;
  -ms-border-radius: 8px 0 0 8px;
  -o-border-radius: 8px 0 0 8px;
  
  &:hover{
    cursor: default;
  }
}

nav-sidebar > a {
  display: flex;
  }

nav-sidebar > a > div{
  display: inline-block;
}

nav-sidebar > a > svg{
  width: var(--sidebar-icon-width);
  height: 100%;
  align-items: center;
  box-sizing: border-box;
}
#footer > * {
  flex: 1 1 1px;
  text-align: center;
}
@media only screen and (max-width: 720px) {
  #appWrapper {
    margin: 0;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    -ms-border-radius: 0;
    -o-border-radius: 0;
  }
}
</style>