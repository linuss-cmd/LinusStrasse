import { createRouter, createWebHistory } from 'vue-router'
import StreetView from '../components/StreetView.vue'

// Lazy-load internal views — only fetched when user navigates there
const ContactView = () => import('../views/ContactView.vue')
const AboutView = () => import('../views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: StreetView },
    { path: '/contact', component: ContactView },
    { path: '/about', component: AboutView },
  ],
})

export default router
