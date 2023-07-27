<template>
  <div>
   <div id="appWrapper">
     <div id="header">
      <font-awesome-icon id="sidebar-toggler" :icon="['fas', 'bars']" size="lg" />
      <img
          id="logo"
          alt="logo"
          class="logo"
          src="@/assets/logo.svg"
          width="30"
          height="30"
      />
    </div>
    <div id="body">
      <div id="sidebar" class="opened" ref="sidebar">
        <nav>
         <RouterLink to="/">Home</RouterLink>
         <RouterLink to="/play">Player</RouterLink>
         <RouterLink to="/about">About</RouterLink>
       </nav>
      </div>
      <div id="content">
        <RouterView />
      </div>
     </div>
     <div id="footer">
       @nguyenanvi122333
     </div>
   </div>
 </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import "./App.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons'
library.add(faBars)

import { onMounted } from "vue";
onMounted(()=>{
  const sidebar = document.getElementById("sidebar");
  console.log(sidebar);
  const openSideBar = (sb) => {
    sb.classList.add("opened");
  };
  const closeSideBar = (sb) => {
    sb.classList.remove("opened");
  };
  const toggleSideBar = (sb) => {
    console.log(sb.classList);
    if(sb.classList.contains("opened"))
      closeSideBar(sb);
    else
      openSideBar(sb);
  };
  const logo = document.getElementById("sidebar-toggler")
  logo.addEventListener('click', ()=>{
    console.log(logo);
    toggleSideBar(sidebar);
  });
})
</script>