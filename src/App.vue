<template>
<div id="app" class="fadeIn">
  <v-app>
    <Header/>
    <!-- <v-container> -->
      <transition name="router-anim" mode="out-in">
        <router-view/>
      </transition>
    <!-- </v-container> -->
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
    background-color: #fff;
    padding: 1px;
    border-radius: 3px;
    max-width: 500px;
    margin: 10px auto;
  }

  .flexWrap {
    padding: 15px;
  }

  .line {
    width: 100%;
    border-bottom: 1px solid #d0d0d0;
    opacity: 0.2;
    margin-bottom: 15px;
  }

   .darkLine {
    width: 100%;
    border-bottom: 1px solid #445777;
    opacity: 0.2;
    margin-bottom: 15px;
  }

  .centered {
    display: inline-block;
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
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
    color: #8aabd8;
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


#lastSave {
    font-size: 12px;
    margin-left: 30px;
    margin-top: 5px;
    margin-bottom: 0px;
  }

.ql-container.ql-snow {
    border: none !important;
    height: 560px;
    max-width: 1200px;
    margin: auto;
    padding: 40px 25px;
    font-family: "Quicksand", sans-serif !important;
}

.ql-container.ql-snow h1{
    font-size: 23px !important;
    font-weight: 400 !important;
}

.ql-container.ql-snow h2{
    font-size: 19px !important;
    font-weight: 400 !important;
}

.ql-container.ql-snow p{
    font-size: 15px !important;
}

.ql-container.ql-snow li{
    font-size: 15px !important;
}

.ql-toolbar.ql-snow {
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    font-family: "Quicksand", sans-serif !important;
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
@font-face {
    font-family: Greek;
    src: url('./assets/fonts/capitalis_goreanis.ttf');
}
</style>
