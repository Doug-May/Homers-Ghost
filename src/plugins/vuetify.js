import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

// Paletton.com palette: 53I0u0kllllaFw0g0qFqFg0w0aF
Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: "#d0d0d0",
    secondary: "#445777",
    accent: "#efde97",
    error: "#e06b6b",
    info: "#8aabd8",
    success: "#68c168",
    warning: "#e0d479"
  }
})
