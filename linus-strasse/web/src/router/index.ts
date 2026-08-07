import { createRouter, createWebHistory } from 'vue-router'
import StreetView from '../components/StreetView.vue'

// Lazy-load ContactView — only fetched when the user navigates to /contact
const ContactView = () => import('../views/ContactView.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: StreetView },
    { path: '/contact', component: ContactView },
  ],
})

export default router
