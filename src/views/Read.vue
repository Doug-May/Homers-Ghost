<template>
    <v-container>
        <div id="reader">
            <v-icon class="backButton" color="#d0d0d0" @click="$router.go(-1)">keyboard_backspace</v-icon>
            <v-switch label="Dark Mode" v-model="darkMode" dark></v-switch>
            <p class="lightFont">Word Count: {{ wordCount }}</p>
            <div v-show="wordCount > 100">
                <v-icon color="info" class="readingInfo">remove_red_eye</v-icon>
                <p class="lightFont readingInfo"> {{ readTime }} min</p>
                <v-icon color="info" class="infoIcon readingInfo">record_voice_over</v-icon>
                <p class="lightFont readingInfo"> {{ readAloudTime }} min</p>
            </div>
            <h1 class="lightFont text-xs-center mt-5">{{ storyTitle }}</h1>
            <div id="content" v-html="content" :class="{lightMode: !darkMode}" v-show="wordCount > 0"></div>
        </div>
    </v-container>
</template>

<script>
import firebase from "@/firebase/init.js"
export default {
    data() {
        return{
            darkMode: true,
            content: null,
            storyTitle: null,
            wordCount: null,
            readTime: null,
            readAloudTime: null
        }
    },
    created() {
        firebase.firestore().collection("stories").doc(this.$route.params.id).get()
        .then(doc => {
            //remove unwanted <p><br></p> and set content to the html story string
            this.content = doc.data().story.replace(/<p><br><\/p>/g, "");
            this.storyTitle = doc.data().storyTitle;
            //Count Words Here. First remove HTML tags
            let HTML = /<[^>]*>/ig;
            let storyString = this.content.replace(HTML, " ");
            //Delete spaces at beginning and end if any
            storyString = storyString.trim();
            //Delete double spaces
            storyString = storyString.replace(/ +(?= )/g,'');
            //remove line breaks and replace with space
            storyString = storyString.replace(/\n\s*\n/g, '\n');
            storyString = storyString.replace(/\n/g, " ");
            
            //count the words and display
            let number = storyString.split(" ").length;
            if (storyString === "") {
                this.wordCount =  0;
            } else {
                this.wordCount =  number;
            }
            this.readTime = Math.round((this.wordCount/this.$store.state.wpm)*2)/2;
            this.readAloudTime = Math.round((this.wordCount/this.$store.state.wpmv)*2)/2;
        })
    }
}
</script>

<style scoped>
    .readingInfo{
        display: inline;
    }

    .infoIcon {
        margin-left: 20px;
    }
    #content {
        margin-top: 10px;
        transition: 400ms;
        padding: 20px 30px;
        border-radius: 20px;
        color: #d0d0d0;
    }
    
    #content >>> h1,h2,p {
        margin: 2px;
        color: #d0d0d0;
    }

     #content >>> br {
        margin: 100px;
    }

    .lightMode {
        transition: 400ms;
        color: #343638 !important;
        background-color: #eff0f2;
    }

    #content>>>.ql-align-center {
        text-align: center;
    }

    #content>>>.ql-align-justify {
        text-align: justify;
    }

    #content>>>.ql-align-right {
        text-align: right;
    }
</style>