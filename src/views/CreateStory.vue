<template>
    <div>
        <h2 class="text-xs-center lightFont" v-if="this.$store.state.stories.length == 0">You Don't Have Any Stories Yet!</h2>
    <div id="login" class="myCard">
        <div @keyup.prevent.enter="createStory" ref="form" lazy-validation class="userBox">
            <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon>
            <h2 class="darkText text-xs-center">Create Story</h2>
            <v-text-field v-if="$store.state.errors.storyTitle" v-model="storyTitle" label="Story Name" color="#a04b4b" required :rules="[() => $store.state.errors.storyTitle]"
                error></v-text-field>
            <v-text-field v-else v-model="storyTitle" color="secondary" label="Story Name" required></v-text-field>
            <v-btn block round id="submitButton" color="secondary" @click="createStory">
                Submit
            </v-btn>
        </div>
    </div>
</div>
</template>

<script>
import Validate from "@/validation/createStory.js"
export default {
    data() {
        return {
            storyTitle: ''
        }
    },
    methods: {
        createStory() {
            //First clear the state errors
            this.$store.commit("CLEAR_ERRORS");
            
            
            //Check if the user has a story with that name already
            let nameExists = false;
            this.$store.state.stories.forEach(story => {
                if (story.storyTitle == this.storyTitle.trim()) {
                    nameExists = true;
                }
            })

            //if the name is unique then create the new story
            if(nameExists) {
                this.$store.commit("SET_ERRORS", {storyTitle: "You already have a story with that name"});
            } else {
                //build the object for the current component state
                let data = {};
                data.storyTitle = this.storyTitle.trim();
                //Check input validation and dispatch createStory if it is
                const { errors, isValid } = Validate(data);
                if (!isValid) {
                    this.$store.commit("SET_ERRORS", errors);
                } else {
                    this.$store.dispatch("createStory", {storyTitle: this.storyTitle.trim()});
                }
            }

            
        }
    }
}
</script>

<style scoped>
    
</style>


