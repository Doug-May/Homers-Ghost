import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ResetPassword from './views/ResetPassword.vue'
import About from './views/About.vue'
import Write from './views/Write.vue'
import Profile from './views/Profile.vue'
import CreateStory from './views/CreateStory.vue'
import store from '@/store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/write',
      name: 'write',
      component: Write,
      beforeEnter: (to, from, next) => {
        if(from.name == "createstory") {
          next();
        } else if(store.state.stories.length == 0) {
          next("/createstory");
        } else {
          next();
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/createstory',
      name: 'createstory',
      component: CreateStory
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  }
})

router.beforeEach((to, from, next) => {
  //clear the errors object in the state
  store.commit("CLEAR_ERRORS");
  //check if route requires auth and then redundancy
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (store.state.uid) {
      next();
    } else {
      next('/login');
    }
  } else if (to.matched.some(rec => rec.meta.redundantRoute)) {
    if(store.state.uid) {
      next('/')
    } else {
      next()
    }
  } else {
    next();
  }
})

export default router