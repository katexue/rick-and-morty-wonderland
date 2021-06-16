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
    },
    meta: {
      title: 'Characters page'
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
    },
    meta: {
      title: 'Characters page'
    }
  },
  {
    path: '/characters/:page(\\d+)',
    name: 'Characters',
    component: Characters,
    props: true,
    meta: {
      title: 'Characters page'
    }
  },
  {
    path: '/error',
    name: 'Error',
    component: NotFound,
    props: true,
    meta: {
      title: 'Error page'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'Not-Found',
    component: NotFound,
    props: true,
    meta: {
      title: '404 page'
    }
  }
]

// Routes
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = process.env.VUE_APP_TITLE_PREFIX
    ? `${process.env.VUE_APP_TITLE_PREFIX} ${to.meta.title}`
    : to.meta.title

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
        errorMsg: `Ooooops, looks like the world's gone banana 🍌`
      },
      replace: true
    })
  } else {
    next()
  }
})

export default router
