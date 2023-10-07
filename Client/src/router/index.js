import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    meta:{
      title:"Home",
      sidebarIcon: 'house',
      showInSideBar: true,
    },
    component: ()=>import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta:{
      title:"About"
    },
    component: ()=>import('@/views/AboutView.vue')
  },
  {
    path: '/watch',
    name: 'watch',
    meta:{
      title: "Watch"
    },
    component: ()=>import('@/views/WatchView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    meta:{
      title: "Sign In"
    },
    component: ()=>import('@/views/authentication/Signin.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta:{
      title: "Sign Up"
    },
    component: ()=>import('@/views/authentication/Signup.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    meta:{
      title:"Upload Video",
      requiresAuth: true,
      sidebarIcon: 'cloud-arrow-up',
      showInSideBar: true,
    },
    component: ()=>import ('@/views/UploadView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    meta:{
      title:"Settings",
      sidebarIcon: 'gear',
      showInSideBar: true,
    },
    component: ()=>import('@/views/SettingsView.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name:"notfound",
    meta:{
      title:"404"
    },
    component: ()=>import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
