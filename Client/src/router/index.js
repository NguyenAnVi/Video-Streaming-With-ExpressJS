import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import WatchView from '@/views/WatchView.vue';
import NotFound from '@/views/NotFound.vue';
import Signin from '@/views/authentication/Signin.vue';
import Signup from '@/views/authentication/Signup.vue';


export const routes = [
  {
    path: '/',
    name: 'Home',
    icon: 'house',
    showInSideBar: true,
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/watch',
    name: 'Watch',
    component: WatchView
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: "/:pathMatch(.*)*",
    name:"Page not found",
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
