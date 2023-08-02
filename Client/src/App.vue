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
      </div>
      <div>
        <input type="text" name="search" id="search" placeholder="Search ...">
      </div>
      <nav-navbar>
        <RouterLink v-if="!currentUser" to="/signin">Signin</RouterLink>
        <RouterLink v-if="!currentUser" to="/signup">Signup</RouterLink>
        <RouterLink v-if="currentUser" to="/" class="nav-link">
          <font-awesome-icon icon="user" size="lg" />
          Profile: {{ currentUser.name }}
        </RouterLink>
        <a v-if="currentUser" class="nav-link" @click.prevent="logOut">
          <font-awesome-icon icon="arrow-right-from-bracket" /> 
          LogOut
        </a>
      </nav-navbar>
    </div>
    <div id="body">
      <div id="sidebar" class="" ref="sidebar">
        <nav-sidebar>
          <RouterLink to="/">
            <font-awesome-icon icon="house"/>
            <div>Home</div>
          </RouterLink>
          <RouterLink to="/play">
            <font-awesome-icon icon="play"/>
            <div>Player</div>
          </RouterLink>
        </nav-sidebar>
      </div>
      <div id="content">
        <RouterView />
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

<script>
import { RouterLink, RouterView } from "vue-router";
import "./App.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faUser, faArrowRightFromBracket, faHouse, faPlay } from '@fortawesome/free-solid-svg-icons'
library.add(faBars, faUser, faArrowRightFromBracket, faHouse, faPlay)

export default {
  components:{
    navNavbar: "nav-navbar",
    navSidebar: "nav-sidebar"
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
      this.$router.push('/');
    }
  }
}
</script>