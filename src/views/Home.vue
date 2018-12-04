<template>
<div>
  
  <div class="header">
    <div class="header-content text-center">
      <img id="mainLogo" src="../assets/logo.png">
      <h1 id="title" class="text-xs-center">HOMER'S GHOST</h1>
    </div>    
  </div>

  <div v-if="this.$store.state.uid && this.$store.state.stories.length > 0" class="section-light">
    <v-container>
      <h1 class="text-xs-center">My Stories</h1>
      <div id="stories">
        <div v-for="(story, i) in this.$store.state.stories" :key="i">
          <h2 class="storyTitle" @click="readStory(story.id)">{{ story.storyTitle }}</h2>
          <div class="darkLine"></div>
        </div>
      </div>
    </v-container>
  </div>
  
 
    <v-container>
      <div id="about">
        <h1 v-if="this.$store.state.uid" class="text-xs-center lightFont">About</h1>
      <p class="lightFont">Stories and metaphor are fundamental to the communication of ideas. They are perhaps the closest we can get to unadulterated thought. The great teachers of the past have often used them to explain deep and layered concepts. This sphere is the arena where ideas do battle. It is a medium for the deepest of thinking. Through a story, we can capture the most down-reaching and enigmatic elements of the human psyche and condition in a way that its constituent words, letters, and characters alone cannot. Thoughtful writing is a step into the unknown. It can help us reveal things about ourselves that aren't often articulated. It makes us better, more aware, and more complete humans.</p>
      <p class="lightFont">Many of us are intimidated by creative writing. We might not be formally trained or practiced. But writing and sharing stories is for everyone. Short stories are a great place to start. Homer's Ghost is a call, for beginners and masters alike, to revivify and participate in this ancient practice.</p>
      <v-btn v-if="!this.$store.state.uid || this.$store.state.stories.length == 0" block round id="submitButton" color="secondary" @click="$router.push('/login')">
      Start Writing
    </v-btn>
      </div>
    </v-container>
  
    

</div>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
    };
  },
  methods: {
    readStory(id) {
      this.$router.push({name: 'read', params: { id: id }});
    }
  }
};
</script>

<style scoped>
#submitButton{
  max-width: 300px;
  margin: auto;
  margin-bottom: 90px;
  margin-top: 40px;

}
.header {
  height: 420px;
  align-items: center;
  color: white;
  position: relative;
}

.header-content {
  max-width: 960px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#mainLogo {
  width: 300px;
  animation: fadeDown 1200ms 1 forwards;
  animation-delay: 300ms;
  opacity: 0;
}
#title {
  margin-top: 0px;
  font-family: 'Greek';
  font-size: 35px;
  animation: fadeUp 1400ms 1 forwards;
  animation-delay: 400ms;
  opacity: 0;
  /* color: #445777; */
}
#stories {
  max-width: 500px;
  margin: auto;
}
.storyTitle {
  transition: 200ms;
  cursor: pointer;
  color: #445777;
  margin-bottom: 4px;
}
.storyTitle:hover {
  color: #efe49b;
}
#about {
  max-width: 800px;
  margin: auto;
  margin-bottom: 80px;
}
.section-light {
  background-color: #fff;
  min-height: 250px;
}
@media screen and (max-width: 600px) {
    #title {
      font-size: 27px;
    }
}

@keyframes fadeDown {
  0% {
    transform: translate(0px, 10px);
    opacity: 0;
  }
  100% {
    opacity: 0.6;
    transform: translate(0px, 0px);
  }
}
@keyframes fadeUp {
  0% {
    transform: translate(0px, -4px) scale(0.95);
    opacity: 0;
  }
  100% {
    opacity: 0.6;
    transform: translate(0px, 0px) scale(1);
  }
}
</style>
