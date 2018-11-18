<template>
  <v-container>
    <div id="profile">
      <h1 class="lightFont">Profile</h1>
      <v-icon color="accent" @click="$router.push('/profile/edit')">edit</v-icon>
      <div class="line"></div>
      <p class="lightFont"><span class="profileTitle info--text">User Name: </span>{{ this.$store.state.userName}}</p>
      <p class="lightFont"><span class="profileTitle info--text">Reading Speed: </span>{{ this.$store.state.wpm}}
        wpm</p>
      <p class="lightFont"><span class="profileTitle info--text">Speaking Speed: </span>{{
        this.$store.state.wpmv}} wpm</p>
      <div class="mt-5 mb-5"></div>
      <h1 class="lightFont">Stories ({{ this.$store.state.stories.length}})</h1>
      <div class="line"></div>
      <div id="stories">
        <div v-for="(story, i) in this.$store.state.stories" :key="i">
          <h1 class="storyTitle info--text" @click="readStory(story.id)">{{ story.storyTitle }}</h1>
          <v-icon color="error" class="storyItem storyIcon" @click="deleteStory(story)">delete</v-icon>
          <v-icon color="accent" class="storyItem storyIcon" @click="writeStory(story.id)">edit</v-icon>
          <div class="line"></div>
        </div>
        <v-btn v-if="this.$store.state.stories.length < 10" block round id="createButton" color="secondary" @click="$router.push('/createstory')">
          Create New Story
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  methods: {
    readStory(id) {
      this.$router.push({name: 'read', params: { id: id }});
    },
    deleteStory(story) {
      let payload = {};
      payload.storyID = story.id;
      payload.storyTitle = story.storyTitle;
      payload.currentStoryID = this.$store.state.currentStory.id;
      this.$store.dispatch("deleteStory", payload);
    },
    writeStory(id) {
      this.$store.dispatch("setCurrentStory", id);
      this.$router.push('/write');
    }
  }
}
</script>

<style scoped>
#profile {
  max-width: 800px;
  margin: auto;
}
#stories {
  padding-left: 30px;
  max-width: 350px;
}
h1 {
  margin-bottom: 3px;
  margin-right: 10px;
  display: inline-block;
}
p {
  margin-left: 30px;
  margin-bottom: 3px;
}
.profileTitle {
  margin-right: 15px;
  font-size: 18px;
}
.storyTitle {
  font-size: 20px;
  cursor: pointer;
}
.storyItem {
  display: inline-block;
  cursor: pointer;
}
.storyIcon {
  float: right;
  margin-right: 15px;
}
#createButton {
  max-width: 250px;
  margin: auto;
  margin-top: 40px;
}
</style>
