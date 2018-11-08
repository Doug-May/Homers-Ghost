<template>
    <div id="reader">
        <v-switch label="Dark Mode" v-model="darkMode" dark></v-switch>
        <p class="lightFont">Word Count: {{ wordCount() }}</p>
        <div v-show="wordCount() > 100">
            <v-icon color="secondary" class="readingInfo">remove_red_eye</v-icon><p class="lightFont readingInfo"> {{ readTime() }} minutes</p>
            <v-icon color="secondary" class="infoIcon readingInfo">record_voice_over</v-icon><p class="lightFont readingInfo">  {{ readAloudTime() }} minutes</p>
        </div>
        
        <div id="content" v-html="content" :class="{lightMode: !darkMode}" v-show="wordCount() > 0"></div>
    </div>
</template>

<script>
const parser = new DOMParser();
export default {
    data() {
        return{
            
            darkMode: true
          
        }
    },
    methods: {
        wordCount() {
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
                return  0;
            } else {
                return  number;
            }
        },
        readTime() {
            return Math.round((this.wordCount()/240)*2)/2;
        },
        readAloudTime() {
            return Math.round((this.wordCount()/125)*2)/2;
        }
    },
    computed: {
        content() {
            return this.$store.state.currentStory.story
        }
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
        padding: 20px 20px;
        border-radius: 20px;
        color: #d0d0d0;
    }
    
    #content >>> h1,h2,p {
        margin: 2px;
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
