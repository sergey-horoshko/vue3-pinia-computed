import { createRouter, createWebHistory } from 'vue-router';
import home from './routes/home';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to) => {
    if (to.hash) {
      return {
        el: to.hash
      };
    }

    return { top: 0 };
  },
  routes: [
    // main layout
    {
      path: '/',
      name: 'main',
      component: () => import('@/layouts/Layout.vue'),
      children: [...home]
    },

    // 404
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
});

export default router;
