<template>
    <div>
        <div id="editor" @keydown.ctrl.s="saveStory">
            <vue-editor id="editor1" v-model="content" :editorToolbar="customToolbar" ></vue-editor>
        </div>
        <v-slide-y-transition>
            <p id="lastSave" class="lightFont" v-if="this.$store.state.lastSave"><span class="accent--text">Last Save: </span>{{ this.$store.state.lastSave }}</p>
        </v-slide-y-transition>
    </div>
</template>

<script>
import {
    VueEditor
} from "vue2-editor"
export default {
    components: {
        VueEditor
    },
    data() {
        return {
            customToolbar: [
                [{
                    'header': [1, 2, false]
                }],
                [{
                    align: ''
                }, {
                    align: 'center'
                }],
                ['bold', 'italic', 'underline'],
                [{
                    'list': 'ordered'
                }, {
                    'list': 'bullet'
                }],
                [{ 'color': [] }, { 'background': [] }]
            ]
        }
    },
    methods: {
        saveStory() {
            this.$store.commit("SAVE_STATUS", true);
            this.$store.dispatch("saveStory", this.$store.state.currentStory);
        }
    },
    computed: {
        content: {
            get() {
                return this.$store.state.currentStory.story
            },
            set(value) {
                this.$store.commit("UPDATE_CURRENT_STORY_CONTENT", value)
            }
        }
    }
}
</script>

<style>
#editor {
    background-color: #fff;
    border-radius: 20px;
    height: 650px;
    padding: 10px;
}

#lastSave {
    font-size: 12px;
    margin-left: 30px;
    margin-top: 5px;
  }

.ql-container.ql-snow {
    border: none !important;
    height: 560px;
    padding: 15px;
    font-family: "Quicksand", sans-serif !important;
}

.ql-toolbar.ql-snow {
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    font-family: "Quicksand", sans-serif !important;
}
</style>


