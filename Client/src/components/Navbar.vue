<script>
import { ref } from 'vue';


export default{
  name:"Navbar",
  data(){
    return{
      isExpanded: ref(false),
      currentUser: ref(this.$parent.currentUser),
      avatar:ref(""),
      origin:location.origin
    }
  },
  methods:{
    isValidImage(url) {
      return new Promise( async (resolve, reject) => {
        if (url == "") resolve(false)
        let image = new Image();
        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
        image.src = url;
      });
    },
    currentAvatar(avtSrc=""){
      console.log(avtSrc);
      this.isValidImage(avtSrc).then(isValid => {
        console.log(isValid);
        this.avatar=(isValid)?(avtSrc+"?timestamp="+Date.now()):(this.origin+"/account.png");
      });
    },
    logOut(){
      this.$parent.logOut();
    }
  },
  created(){
  }
}
</script>


<template>
  <div class="navbar">
    <div class="navbaritem left">
      <slot name="left"></slot>
    </div>
    <div class="navbaritem center">
      <slot name="center"></slot>
    </div>
    <div class="navbaritem right">
      <slot name="right">
        <div class="user-menu" v-if="!currentUser">
          <div class="menu-label">
            <img class="user-avatar" :src="avatar" alt="">
            <a href="#" class="user-text">Signin/Signup</a>
            <ul>
              <li>
                <RouterLink v-if="!currentUser" :to="{name:'signin'}">Signin</RouterLink>
              </li>
              <li>
                <RouterLink v-if="!currentUser" to="/signup">Signup</RouterLink>
              </li>
            </ul>
            </div>
        </div>
        <div class="user-menu" v-else>
          <div class="menu-label">
            <img ref="useravatar" class="user-avatar" :src="avatar" alt="">
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
      </slot>
    </div>


  </div>
</template>
<style scoped>
.navbar{
  display: flex;
  width: 100%;
  height: var(--header-height);
  align-items: center;
  justify-content: space-between;
  & > .navbaritem{
    display: flex;
    flex: 1 1 0px;
    align-items: center;
    &.left{
      justify-content: flex-start;
    }
    &.center{
      justify-content: center;
    }
    &.right{
      justify-content: flex-end;
      max-height: 100%;
      overflow: hidden;
    }
  }
}
.user-menu{
  width: 140px;
  height: 32px;
  display: block;
  overflow: hidden;
  border-radius: 16px;
 
  & > *{
    z-index: 10;
  }


  & > .menu-label{
    height: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;


    & > img{
      border-radius: 50%;
      overflow: hidden;
      height: 25px !important;
      aspect-ratio: 1;
      padding: 5px;
    }
    & > .user-text{
      text-align: center;
      overflow: hidden;
      font-size: 12px;
      font-weight: 800;
      width: calc(140px - 40px - 10px);
      padding-right: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #000;
    }
  }
  & > ul{
    height: auto;
    padding: 0;
    margin: 0;
    display: none;
    list-style: none;
    border-radius: 8px;
    border: 1px solid black;
    position: absolute;
    background-color: #080;
    transition-property: transform;
    transition-duration: .2s;
    transition-timing-function: ease-in-out;


    & > li{
      padding: 4px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: #ffffff;
      color: #000;
      &:first-child{
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      &:last-child{
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }
  &:hover{
    & > ul{
      display: flex;
      flex-direction: column;
      & > li:hover{
        color: #fff;
        background-color: #000000;
      }
    }
  }
}

</style>


