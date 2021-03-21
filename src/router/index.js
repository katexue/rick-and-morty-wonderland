// Dependencies
import { createWebHistory, createRouter } from 'vue-router'

// Pages
import Characters from '../views/Characters.vue'
import NotFound from '../views/NotFound.vue'

// Configuration
const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    redirect: () => {
      return {
        path: '/characters/1'
      }
    }
  },
  {
    path: '/characters',
    name: 'CharactersDefault',
    props: true,
    redirect: () => {
      return {
        path: '/characters/1'
      }
    }
  },
  {
    path: '/characters/:page(\\d+)',
    name: 'Characters',
    component: Characters,
    props: true
  },
  {
    path: '/error',
    name: 'Error',
    component: NotFound,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'Not-Found',
    component: NotFound,
    props: true
  }
]

// Routes
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.params.catchAll && to.name === 'CharactersDefault') {
    next('/characters/1')
  } else if (to.params.catchAll && to.name === 'Characters') {
    next({
      name: 'Error',
      params: {
        errorMsg: 'Please make sure your url is correct.'
      },
      replace: true
    })
  } else if (to.params.catchAll) {
    next({
      name: 'Error',
      params: {
        errorMsg: '"Ooooops, looks like the world\'s gone banana 🍌"'
      },
      replace: true
    })
  } else {
    next()
  }
})

export default router
