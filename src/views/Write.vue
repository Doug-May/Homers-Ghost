<template>
  <v-container>
    <div v-if="this.$store.state.stories.length == 0">
      <h2 class="lightFont text-xs-center">Create Your First Story <span class="redirect" @click="$router.push('/createstory')">Here</span></h2>
    </div>
    <div v-else>
      <div>
        <v-menu bottom>
          <h1 slot="activator" class="lightFont text-xs-center">{{this.$store.state.currentStory.storyTitle}}</h1>
          <v-icon id="dropdown" slot="activator" color="secondary" dark>
            arrow_drop_down
          </v-icon>
          <v-list>
            <v-list-tile v-for="(story, i) in this.$store.state.stories" :key="i" @click="changeStory(story.id)">
              <v-list-tile-title>{{ story.storyTitle }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="this.$store.state.stories.length < 10" @click="$router.push('/createstory')">
              <!-- <v-list-tile-title>Create New Story</v-list-tile-title> -->
              <v-list-tile-title id="newStoryText" class="secondary--text">New Story</v-list-tile-title>
              <v-list-tile-avatar>
                <v-icon id="newStoryIcon" size="30" color="accent">add_circle_outline</v-icon>
              </v-list-tile-avatar>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
      <v-layout row wrap>
        <v-flex xs11>
          <v-bottom-nav id="nav" :active.sync="selectedComponent" :value="true" color="secondary">
            <v-btn color="accent" flat value="editor">
              <span>Story</span>
              <v-icon>format_align_left</v-icon>
            </v-btn>
            <v-btn color="accent" flat value="notes">
              <span>Notes</span>
              <v-icon>dashboard</v-icon>
            </v-btn>
            <v-btn color="accent" flat value="read">
              <span>Read</span>
              <v-icon>remove_red_eye</v-icon>
            </v-btn>

          </v-bottom-nav>
        </v-flex>
        <v-flex xs1>
          <v-tooltip left>
            <v-icon slot="activator" id="save" size="30" color="accent" @click="saveStory">save</v-icon>
            <span>SAVE<br>(ctrl+s in editor)</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
      <transition name="component-anim" mode="out-in">
        <keep-alive>
          <component :is="selectedComponent"></component>
        </keep-alive>
      </transition>
    </div>
  </v-container>
</template>

<script>
import editor from "@/components/user/Editor.vue"
import read from "@/components/user/Read.vue"
import notes from "@/components/user/Notes.vue"
import firebase from "@/firebase/init.js"
import moment from "moment"
export default {
  data() {
    return {
      selectedComponent: 'editor'
    }
  },
  components: {
    editor,
    read,
    notes
  },
  methods: {
    changeStory(id) {
      this.$store.commit("SAVE_STATUS", false);
      this.$store.dispatch("autoSaveStory", this.$store.state.currentStory);
      this.$store.dispatch("setCurrentStory", id);
    },
    saveStory() {
      this.$store.commit("SAVE_STATUS", true);
      this.$store.dispatch("saveStory", this.$store.state.currentStory);
    }
  },
  destroyed() {
      this.$store.commit("SAVE_STATUS", false);
      this.$store.dispatch("autoSaveStory", this.$store.state.currentStory);
    }
}
</script>

<style scoped>
  #nav {
    border-radius: 10px;
    width: 95%;
    max-width: 800px;
    margin: auto;
    margin-bottom: 10px;
  }
  #save {
    margin-top: 14px;
    cursor: pointer;
  }
  #dropdown {
    margin-top: -10px;
  }

  #newStoryText {
    font-size: 13px;
  }
  #newStoryIcon {
    margin-right: -20px;
  }
</style>

