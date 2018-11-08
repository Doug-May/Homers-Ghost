<template>
<div id="app" class="fadeIn">
  <v-app>
    <Header/>
    <v-container>
      <transition name="router-anim" mode="out-in">
        <router-view/>
      </transition>
    </v-container>
  </v-app>
</div>
  
</template>

<script>

import Header from '@/components/layout/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      //
    }
  },
  created() {
    this.$store.dispatch("refreshUser");
  }
}
</script>

<style>
  * {
    text-transform: none !important;
  }

  body {
    background-color: #353535;
  }

  #app {
    font-family: "Quicksand", sans-serif;
    /* background-color: #353535; */
    background-image: url("./assets/background.jpg");
    background-size: 150% auto;
    background-attachment: fixed;
  }

  .myCard {
    background-color: #ffffff;
    padding: 1px;
    border-radius: 3px;
    max-width: 500px;
    margin: 10px auto;
  }

  .backButton {
        position: absolute;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 300;
  }

  h1 {
    margin-bottom: 15px;
  }

  p {
    font-weight: 400;
    font-size: 15px;
  }

  .lightFont {
    color: #d0d0d0;
  }

  .userBox {
    margin: 20px;
    max-width: 450px;
  }

  .redirect {
    cursor: pointer;
    color: #4d648d;
  }

  .alert {
    font-family: "Quicksand", sans-serif !important;
    box-shadow: none !important;
  }

  .alert h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 300 !important;
  }

  .router-anim-enter-active {
    animation: coming 550ms;
    opacity: 0;
  }

  .router-anim-leave-active {
    animation: going 550ms;
  }

  .component-anim-enter-active {
    animation: compComing 300ms;
    opacity: 0;
  }

  .component-anim-leave-active {
    animation: compGoing 300ms;
  }

  .fadeIn {
    opacity: 0;
    animation: fadeIn 1000ms forwards 1;
    animation-delay: 500ms;
  }

  @keyframes going {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(7px);
      opacity: 0;
    }
  }

  @keyframes coming {
    from {
      transform: translateX(-7px);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes compGoing {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(4px);
      opacity: 0;
    }
  }

  @keyframes compComing {
    from {
      transform: translateY(4px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      /* transform: translate(0px, 30px); */
      opacity: 0;
    }

    to {
      /* transform: translate(0px, 0px); */
      opacity: 1;
    }
  }
*::-webkit-scrollbar {
    width: 7px;
}
*::-webkit-scrollbar-track {
    background: #ddd;
    border-radius: 3px;
}
*::-webkit-scrollbar-thumb {
    background: #445777;
    border-radius: 4px;
}
</style>
