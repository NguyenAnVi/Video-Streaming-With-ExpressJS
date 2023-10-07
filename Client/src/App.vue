<script>
import { routes as routerRoutes } from "./router";
import { useToast } from "vue-toastification";
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
import Searchbar from "./components/Searchbar.vue";
import VideoPlayer from "./components/VideoPlayer.vue";

const toast = useToast();

export default {
  components:{
    Searchbar,
    Navbar,
    Sidebar,
    VideoPlayer
},
  data(){
    return{
      routerRoutes,
      avtSrc: "http://localhost:3001/account.png",
      origin: location.origin
    }
  },
  methods: {
    notification(payload){
      toast(payload.message,{
        type: payload.type
      });
    },
    isValidImage(url) {
      return new Promise((resolve, reject) => {
          let image = new Image();
          image.onload = () => resolve(true);
          image.onerror = () => resolve(false);
          image.src = url;
      });
    },
    async logOut() {
      if (this.$route.name !== 'home')
        this.$router.push({ name: 'home' });
      else
        this.$router.push({ name: 'signin' });
      await this.$store.dispatch('auth/logout');
      this.$store.state.auth.user = undefined;
      this.updateAvatar();
    },
    updateAvatar() {
      const defaultAvtSrc = this.origin + "/account.png";
      const newUserAvatar = JSON.parse(localStorage.getItem('user'))?.avatar || defaultAvtSrc;
      this.isValidImage(newUserAvatar).then(isValid => {
        if (isValid) {
          // The image is valid
          this.avtSrc = newUserAvatar+"?timestamp="+Date.now();
        }
      });
    },
    checkAuth(to) {
      document.title = to?.meta.title;
      if (to.meta.requiresAuth) {
        if ( !this.$store.state.auth.status.loggedIn ) {
          this.$router.push({
            name: 'signin',
            query: { redirect: to.fullPath } // Add the current path as a query parameter
          })
        }
      }
    },
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
  watch: {
    '$route'(to, from) {
      this.checkAuth(to);
    }
  },
  mounted () {
    this.checkAuth(this.$route);
    this.updateAvatar();
  },
}
</script>

<template>
  <div>
   <div id="appWrapper">
     <div id="header">
       <Navbar ref="navbar">
         <template #left>
           <font-awesome-icon @click="$refs.sidebar.toggle()" style="width: var(--sidebar-icon-width);" :icon="['fas', 'bars']" size="lg" />
           <img
               id="logo"
               alt="logo"
               class="logo"
               src="@/assets/logo.svg"
           />
           <span style="color:rgb(0, 141, 96); font-size: larger; font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;">YOULUBE</span>
        </template>
        <template #center>
          <Searchbar ref="search"/>
        </template>
        <template #right>
          <div class="user-menu" v-if="!currentUser">
          <div class="menu-label">
            <img class="user-avatar" src="http://localhost:3001/account.png" alt="">
            <a href="#" class="user-text">Signin/Signup</a>
          </div>
          <ul>
            <li>
              <RouterLink v-if="!currentUser" to="/signin">Signin</RouterLink>
            </li>
            <li>
              <RouterLink v-if="!currentUser" to="/signup">Signup</RouterLink>
            </li>
          </ul>
        </div>
        <div class="user-menu" v-if="currentUser">
          <div class="menu-label">
            <img ref="useravatar" class="user-avatar" :src="avtSrc" alt="">
            <a href="#" class="user-text">{{ currentUser.fullName }}</a>

          </div>
          <ul>
            <li>
              <RouterLink to="/settings">
                <div>Settings</div>
              </RouterLink>
            </li>
            <li @click="logOut">
              Sign Out
            </li>
          </ul>
        </div>
        </template>
      </Navbar>
    </div>
    <div id="body">
      <Sidebar ref="sidebar"/>
      <div id="content">
        <VideoPlayer v-if="$route.meta.title == 'Watch'"></VideoPlayer>
        <Suspense>
          <RouterView @updateAvatar="updateAvatar" @notification="notification" v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component">
              </component>
            </Transition>
          </RouterView>
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
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity .5s ease-out;
}
#appWrapper {
  margin: 8px;
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;

   /* Set a specified height, or the minimum height for the background image */
  
  /* Set background image to fixed (don't scroll along with the page) */
  background-attachment: fixed;
  
  /* Center the background image */
  background-position: center;
  
  /* Set the background image to no repeat */
  background-repeat: no-repeat;
  
  /* Scale the background image to be as large as possible */
  background-size: cover;
  background-image: url(@public/background.jpg);
  border-radius: 8px;
}
#header, #body, #footer{
  box-sizing: border-box;
  /* box-shadow: inset 0 0 3px var(--color-background-5); */
  border-radius: 8px;
}

#header {
  height: var(--header-height) !important;
  box-sizing: border-box;
  background-color: var(--color-background-1);
}
#body {
  display: flex;
  justify-items: stretch;
  overflow: hidden;

  background-color: transparent;
  min-height: calc(100vh - var(--header-height) - var(--footer-height) - 48px);
}

#content{
  flex-shrink:0;
  background-color: #ffffff77;
  backdrop-filter: blur(10px);
  width:  calc(100% - var(--sidebar-icon-width) - 8px)
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

#footer > * {
  flex: 1 1 1px;
  text-align: center;
}
.logo {
  width: var(--icon-width);
  height: var(--icon-width);
  margin: 0;
  max-height: calc(var(--header-height) - 8px);
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