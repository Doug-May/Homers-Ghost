import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ResetPassword from './views/ResetPassword.vue'
import Write from './views/Write.vue'
import Profile from './views/Profile.vue'
import CreateStory from './views/CreateStory.vue'
import Read from './views/Read.vue'
import EditProfile from './views/EditProfile.vue'
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
      component: Login,
      meta: {
        redundantRoute: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        redundantRoute: true
      }
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword,
      meta: {
        redundantRoute: true
      }
    },
    {
      path: '/write',
      name: 'write',
      component: Write,
      meta: {
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => {
        if(store.state.stories.length == 0) {
          next("/createstory");
        } else {
          next();
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/edit',
      name: 'editprofile',
      component: EditProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createstory',
      name: 'createstory',
      component: CreateStory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/read/:id',
      name: 'read',
      component: Read,
      meta: {
        requiresAuth: true
      }
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
      next('/');
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